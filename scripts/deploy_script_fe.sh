#!/bin/bash

set -e

CONTAINER_NAME="nc_news_c_fe"
IMAGE_NAME="krahristov/news-frontend:latest"
APP_DIR="$HOME/nc-news-frontend"

echo "Starting deployment..."


echo "Pulling the Docker image..."
sudo docker pull $IMAGE_NAME

echo "Stopping the existing Docker container..."
sudo docker stop $CONTAINER_NAME || true
sudo docker rm $CONTAINER_NAME || true

echo "Running the new Docker container..."
sudo docker run -p 3000:3000 -d --name $CONTAINER_NAME $IMAGE_NAME

echo "Removing unused Docker images..."
sudo docker image prune -af

echo "Deployment successful!"