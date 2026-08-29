#!/usr/bin/env bash
set -euo pipefail
install -d -m 0755 -o pipeline-demo -g pipeline-demo /opt/pipeline-demo/current
find /opt/pipeline-demo/current -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +
