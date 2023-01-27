build-image:
  docker image build .t aahirwar20/creativenotebook:latest


  docker compose --env-file .env config 
  docker-compose up --build
