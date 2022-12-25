build-image:
  docker image build -t creativenotebook .
run-image:
  docker run --env-file .env -p 8080 --name notebook2 creativenotebook

 