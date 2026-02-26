#!/usr/bin/env bash
# ssh-askpass-hack.sh  — may work on some systems. Insecure: password in plain text.
USER='surodoy'
HOST='10.10.85.32'
PASSWORD='Asset@123'

# create tiny askpass helper
ASKPASS="$(mktemp "${TMPDIR:-/tmp}/askpass.XXXXXX")"
chmod 700 "$ASKPASS"
cat > "$ASKPASS" <<'ASK'
#!/bin/sh
# simple SSH_ASKPASS helper that prints the password
printf '%s' 'WORLD_PLACEHOLDER'
ASK

# inject the real password safely (replace placeholder)
# NOTE: we replace the placeholder to avoid shell quoting issues in the heredoc above.
awk -v pw="$PASSWORD" '{ gsub("WORLD_PLACEHOLDER", pw); print }' "$ASKPASS" > "${ASKPASS}.2" && mv "${ASKPASS}.2" "$ASKPASS"
chmod 700 "$ASKPASS"

# Ensure the helper is removed on exit
cleanup() { rm -f "$ASKPASS"; }
trap cleanup EXIT

# Run ssh in a new session with DISPLAY and SSH_ASKPASS set.
# We redirect stdin from /dev/null so ssh cannot read a tty; ssh will call SSH_ASKPASS.
# setsid creates a new session; this is what triggers askpass in many environments.
# WARNING: StrictHostKeyChecking=no disables host-key checks (insecure).
DISPLAY=:0 SSH_ASKPASS="$ASKPASS" setsid ssh -o StrictHostKeyChecking=no "$USER@$HOST" < /dev/null

