#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/../"

export DOCKER_BUILDKIT=1

docker build -t "stephaneklein/poc-postgraphile-react-upload-to-s3" ./ -f docker-image/Dockerfile