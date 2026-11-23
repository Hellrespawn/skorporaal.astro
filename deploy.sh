#!/bin/sh

set -o errexit
set -o nounset
if [ "${TRACE-0}" = "1" ]; then set -o xtrace; fi

if [ -f "./.env" ]; then
  . ./.env
fi

LOCAL_DIR=${LOCAL_DIR:-./dist}
DEPLOY_OWNER=${DEPLOY_OWNER:-root:docker}

skip_build=
skip_install=

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
  while getopts :sd opt; do
    case $opt in
    s)
      skip_build="true"
      ;;
    d)
      skip_install="true"
      ;;

    '?')
      error "invalid option -$OPTARG"
      ;;

    esac
  done

  shift $((OPTIND - 1))
}

install_deps() {
  npm ci --no-audit
}

build_project() {
  npm run build
}

copy_new_files() {
  echo "Syncing build files..."
  target="${REMOTE_DIR%/}/"
  if [ -n "${DESTINATION:-}" ]; then
    target="$DESTINATION:$target"
  else
    # An absolute path also prevents colons in local names being read as hosts.
    case "$target" in
      /*) ;;
      *) target="$PWD/$target" ;;
    esac
  fi
  rsync -az --delete --protect-args --super --chown="$DEPLOY_OWNER" -- \
    "${LOCAL_DIR%/}/" "$target"
  echo "Synced build files."
}

check_environment_variables "LOCAL_DIR REMOTE_DIR"

NODE_MODULES_DIR=./node_modules

handle_args "$@"

if [ -z "$skip_install" ]; then
  install_deps
elif [ -d "$NODE_MODULES_DIR" ]; then
  echo "Using existing deps..."
else
  error "Attempted to use existing deps, but $NODE_MODULES_DIR doesn't exist."
fi

if [ -z "$skip_build" ]; then
  build_project
elif [ -d "$LOCAL_DIR" ]; then
  echo "Using existing build..."
else
  error "Attempted to use existing build, but $LOCAL_DIR doesn't exist."
fi

copy_new_files
