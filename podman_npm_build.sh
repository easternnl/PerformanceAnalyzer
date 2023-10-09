#!/bin/bash

podman kill performanceanalyzer
podman rm performanceanalyzer
podman run --name performanceanalyzer --entrypoint '/bin/sh' -w /usr/src/app -v "$PWD":/usr/src/app docker.io/library/node -c 'npm install && npm run build '

