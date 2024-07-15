
### Installation:

To run this applications, follow next instructions:

* Clone repository
* Go to folder `cd symfony-react-app/docker`
* Bring docker containers up `docker-compose up -d`
* Run `docker exec -it php-app bash -c "composer install"` to install php dependencies
* Run `docker exec -it php-app bash -c "npm install"` to install js dependencies
* Run `docker exec -it php-app bash -c "npm run dev"`  to build js files


You should be able to see application in your browser: http://localhost:8000/

You can find phpmyadmin on url http://localhost:8001/
