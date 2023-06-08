#!/bin/sh

set -o errexit
set -o nounset
if [ "${TRACE-0}" = "1" ]; then set -o xtrace; fi

if [ -f "./.env" ]; then
  . ./.env
fi

skip_build=

error() {
  echo "$0: $1" 1>&2
  exit 1
}

check_environment_variables() {
  error=
  # shellcheck disable=SC2068
  # We want explicit re-splitting here.
  for var in $@; do
    # POSIX shell doesn't support variable indirection, we use eval. $var is
    # always set by the for-loop, but value might not be, so we escape the
    # $, { and } characters
    eval value=\"\$\{"$var"-\}\"

    if [ -z "$value" ]; then
      echo "\$$var is not set."
      error=1
    fi
  done

  if [ -n "$error" ]; then
    error "Not all environment variables are set."
  fi
}

handle_args() {
  while getopts :s opt; do
    case $opt in
    s)
      skip_build="true"
      ;;

    '?')
      error "invalid option -$OPTARG"
      ;;

    esac
  done

  shift $((OPTIND - 1))
}

build_project() {
  npm run build
}

remove_old_files() {
  ssh "$DESTINATION" rm -rf "$REMOTE_DIR/*"

  echo "Removed old files..."
}

copy_new_files() {
  scp -qr "$LOCAL_DIR"/* "$DESTINATION:$REMOTE_DIR/"
  echo "Copied new files..."
}

check_environment_variables "DESTINATION LOCAL_DIR REMOTE_DIR"

handle_args "$@"

if [ -z "$skip_build" ]; then
  build_project
elif [ -d "$LOCAL_DIR" ]; then
  echo "Using existing build..."
else
  error "Attempted to use existing build, but $LOCAL_DIR doesn't exist."
fi

remove_old_files

copy_new_files

echo "Done."
