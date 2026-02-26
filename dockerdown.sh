echo Removing containers
docker-compose -f docker-compose.yml down
echo Containers removed
echo Removing related images
docker rmi admin_console_backend admin_console_frontend
echo Images removed
echo Clearing docker system cache
docker system prune --force
echo Docker system cache cleaned
echo Removing dangling images
docker image prune --force
echo All dangling images removed
