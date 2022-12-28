# build-image:
#   docker image build -t creativenotebook .
# run-image:
#   docker run --env-file .env -p 8080 --name notebook2 creativenotebook

build-image:
 docker image build . -t aahirwar20/creativenotebook

run-image:
  docker run -p 8080 creativenotebook

up-dev:
  docker-compose up --build

down: 
  docker-compose down
     