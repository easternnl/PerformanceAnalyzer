#!/bin/bash

podman kill performanceanalyzer
podman rm performanceanalyzer
podman run -dt --name performanceanalyzer -p 5173:5173 --entrypoint '/bin/sh' -w /usr/src/app -v "$PWD":/usr/src/app docker.io/library/node -c 'npm install && npm run dev -- --host '


# use podman logs to view the output, however it does not show anything
podman logs -f performanceanalyzer
