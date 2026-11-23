# skorporaal.astro

This repo holds my personal site.

This repository is public for the purposes of demonstration and education. Much of it is geared specifically to my personal use case and it should not be considered a template or a project starter.

## Attribution

- Sun, moon and home icons from [Hero Icons](https://heroicons.com/)

- GitHub, LinkedIn, and skill icons from [Devicon](https://devicon.dev/)

- Favicon from [Twemoji](https://twemoji.twitter.com/) via [favicon.io](https://favicon.io)

- [Nunito](https://github.com/googlefonts/nunito) by Vernon Adams

- Fancy links inspired by older version of [chrissy.dev](https://www.chrissy.dev/)

## License & Copyright

© 2026 Stef Korporaal

Made available under the [The 3-Clause BSD License](https://opensource.org/licenses/BSD-3-Clause).

## Deployment

Configure `REMOTE_DIR` (destination folder) in `.env`, then run `./deploy.sh`.
For a local deployment, leave `DESTINATION` unset or empty. For a remote
deployment, set `DESTINATION` to an SSH host (for example, `user@server`
or an SSH config alias). It installs dependencies, builds the site,
and syncs the contents of `dist/` using rsync, including hidden files.
Files in the destination that are absent from the build are deleted.
Use `-d` to skip dependency installation and `-s` to reuse an existing build.
`LOCAL_DIR` can override the default `./dist` source folder.

`DEPLOY_OWNER` sets destination ownership as `user:group` and defaults to
`root:docker` when unset or empty. The receiving user (the local user for
local deployments, or the SSH user for remote deployments) must have
permission to set that ownership, normally root for the default. rsync
must be installed locally and, for remote deployments, on the remote host.
