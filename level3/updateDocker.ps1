Write-Host "Removing docker container"
docker stop googlecloud
$dockerid = docker ps -aqf "name=googlecloud"
docker rm $dockerid

Write-Host "Remove dangling images"
ECHO y | docker image prune

Write-Host "Updating docker image"
docker build -t gcr.io/google.com/cloudsdktool/google-cloud-cli:latest . -f Dockerfile

# Run container in interactive mode so we can use googleCloud and Terraform CLI
Write-Host "Run container"
docker run -it --name googlecloud gcr.io/google.com/cloudsdktool/google-cloud-cli:latest