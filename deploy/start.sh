#!/usr/bin/env bash
set -euo pipefail
systemctl daemon-reload
systemctl enable pipeline-demo.service
systemctl restart pipeline-demo.service
