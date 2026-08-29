#!/usr/bin/env bash
set -euo pipefail
for attempt in {1..12}; do
  if curl --fail --silent http://127.0.0.1:3000/health | grep -q '"status":"ok"'; then
    exit 0
  fi
  sleep 5
done
journalctl -u pipeline-demo.service --no-pager -n 50
exit 1
