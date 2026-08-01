## Publishing to npm

### Option A — Interactive (2FA OTP)

1. `npm login`
2. Enable 2FA for **publishing** on [npm account settings](https://www.npmjs.com/settings/~)
3. `npm run publish:cli` — enter **authenticator OTP** when prompted

### Option B — `NPM_TOKEN` (automation / no OTP prompt)

`NPM_TOKEN` alone is **not** enough. npm must read it from config **and** the token must allow publish without OTP.

1. Create a **Granular Access Token** at [npm tokens](https://www.npmjs.com/settings/~/tokens):
   - Type: **Granular Access Token**
   - Packages: `@daniels-agent-framework/*` (or this package)
   - Permissions: **Read and write**
   - Enable **Bypass two-factor authentication** (required — without this you still get E403)

2. Publish:

```bash
export NPM_TOKEN=npm_xxxxxxxx   # paste token once; do not commit
npm whoami --userconfig packages/cli/.npmrc.publish   # should print your username
npm run publish:cli
```

`publish:cli` uses `packages/cli/.npmrc.publish`, which maps `NPM_TOKEN` → registry auth.

3. If it still fails with E403:
   - Token missing **Bypass 2FA** → create a new token with that box checked
   - Old session overriding token → `npm logout` then retry with only `NPM_TOKEN`
   - Wrong org → you must be owner/admin of `@daniels-agent-framework`

### Verify token before publish

```bash
export NPM_TOKEN=npm_...
npm whoami --userconfig packages/cli/.npmrc.publish
```

If `whoami` fails, the token is wrong or not passed to npm.

### Common errors

| Error | Fix |
|-------|-----|
| **E404** on PUT | Create org `daniels-agent-framework` or rename package scope |
| **E403** “2FA … required” | Use Option A (OTP) or Option B token **with Bypass 2FA** |
| **E403** forbidden (other) | `npm whoami` — no publish rights on the org |

Dry-run:

```bash
cd packages/cli && npm pack --dry-run
```
