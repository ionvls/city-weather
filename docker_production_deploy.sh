#!/usr/bin/env bash

# Forces running containers to stop.
docker-compose -f docker-compose.yml kill

# Forcefully removes any stopped service containers.
docker-compose -f docker-compose.yml rm -f

docker volume create cities-dbdata

docker-compose -f docker-compose.yml build

# Runs the app with port(s) enabled and mapped to the host. Removes the container after run.
docker-compose -f docker-compose.yml up -d db

sleep 20

docker-compose -f docker-compose.yml up -d server

sleep 20

docker-compose -f docker-compose.yml up -d client
