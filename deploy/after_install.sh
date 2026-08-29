#!/usr/bin/env bash
set -euo pipefail
chown -R pipeline-demo:pipeline-demo /opt/pipeline-demo/current
chmod +x /opt/pipeline-demo/current/deploy/*.sh
