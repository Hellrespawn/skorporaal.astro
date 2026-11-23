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

### Bunny Storage and CDN

The complete static build is uploaded to Bunny Storage and served through
Bunny CDN. Cache misses fetch from Bunny Storage, independently of the
existing server. `bunny.jsonc` selects the `stefkorporaal` site and `dist/`
output, with static routing rather than an SPA fallback.

Install the Bunny CLI (`npm install -g @bunny.net/cli`), authenticate with
`bunny login`, and install project dependencies with `npm ci`. The site
only needs to be provisioned once:

```sh
bunny sites create stefkorporaal --region DE --output json
```

Build, upload, and publish a release with:

```sh
npm run deploy:bunny
```

Each deployment publishes immediately to the site's Bunny hostname and any
attached custom domains. Publishing also purges the CDN cache. After a successful
deployment, older releases are pruned, keeping the two newest releases. Bunny
always protects the current and previous releases, even if they fall outside
that limit. A failed deployment skips pruning. The public
domain remains `stefkorporaal.is` in generated links (`SITE_URL`); do not
change it to the Bunny testing hostname.

To attach the production domain after verifying the Bunny hostname:

```sh
bunny sites domains add stefkorporaal.is --wait
```

This command configures the hostname and TLS and offers to update Bunny
DNS. The production apex uses a Bunny `PullZone` DNS record linked to pull
zone `7067512`, preserving the existing mail records and wildcard subdomains.
The existing Caddy server can continue serving
the site independently, but updating its copy requires `./deploy.sh`.

If a previous container build left `dist/` or `node_modules/.astro/` owned
by another user, restore those generated directories' ownership before
building locally:

```sh
sudo chown -R "$(id -un):$(id -gn)" dist node_modules/.astro
```

List releases or roll back without rebuilding:

```sh
bunny sites deployments list stefkorporaal
bunny sites deployments publish --previous --site stefkorporaal --force
```

### Existing server

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
