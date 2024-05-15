#!/bin/sh

# remove image
docker rmi namse/lvc-chat

# build dockerfile
docker build -f Dockerfile -t namse/lvc-chat --platform=linux/amd64 .

# push docker hub
docker push namse/lvc-chat