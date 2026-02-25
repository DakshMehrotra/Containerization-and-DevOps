## Docker Compose – Nginx & WordPress with MySQL
## Objcetive
- To understand and implement multi-container applications using Docker Compose by:
- Running an Nginx container
- Deploying a WordPress + MySQL setup
- Managing volumes and networks
- Understanding container lifecycle using docker-compose commands

## Part 1: Running Nginx using Docker Compose
### docker-compose.yml (Nginx)
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    container_name: my-nginx
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
    environment:
      - NGINX_HOST=localhost
    restart: unless-stopped

## Commands Used
Start Container
- docker compose up -d
  
Check Running Containers
- docker ps
  
View Logs
- docker compose logs
  
Stop & Remove Containers
- docker compose down

## Observation
- Container my-nginx started successfully.
- Port 8080 mapped to container port 80.
- Logs showed worker processes starting.
- Container stopped gracefully using CTRL + C.
- Network was auto-created and removed by Docker Compose.

## Part 2: WordPress + MySQL using Docker Compose
### docker-compose.yml (WordPress Setup)
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wpuser
      MYSQL_PASSWORD: wppass
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - wordpress-network

  wordpress:
    image: wordpress:latest
    container_name: wordpress
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: mysql
      WORDPRESS_DB_USER: wpuser
      WORDPRESS_DB_PASSWORD: wppass
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wp_content:/var/www/html/wp-content
    depends_on:
      - mysql
    networks:
      - wordpress-network

volumes:
  mysql_data:
  wp_content:

networks:
  wordpress-network:

## Commands Used
Start Services
- docker compose up -d

Check Containers
- docker compose ps

Check Volumes
- docker volume ls

Check Networks
- docker network ls

Stop Everything
- docker compose down

## Issue Faced
Initially, MySQL 5.7 gave this error on Apple Silicon (ARM64):
- no matching manifest for linux/arm64/v8

## Solution
Changed image version to:
- mysql:8.0
After updating, containers were created successfully.

## Screenshots

<img width="1439" height="557" alt="Screenshot 2026-02-25 at 11 31 30 AM" src="https://github.com/user-attachments/assets/1b7f238c-402e-4a68-a217-639806da9a2f" />
<img width="1440" height="158" alt="Screenshot 2026-02-25 at 11 31 48 AM" src="https://github.com/user-attachments/assets/734a3370-b63f-4b18-8a35-55f687e99fad" />
<img width="1440" height="196" alt="Screenshot 2026-02-25 at 11 33 23 AM" src="https://github.com/user-attachments/assets/ba3a6488-73d0-4677-a887-7d395ef5bf51" />
<img width="1440" height="504" alt="Screenshot 2026-02-25 at 11 34 15 AM" src="https://github.com/user-attachments/assets/e512d17a-d2b7-47fb-9330-d737ca185c96" />
<img width="1440" height="900" alt="Screenshot 2026-02-25 at 11 34 22 AM" src="https://github.com/user-attachments/assets/b4673cee-1ffb-4319-a73d-914e35f8f928" />
<img width="1440" height="132" alt="Screenshot 2026-02-25 at 11 34 35 AM" src="https://github.com/user-attachments/assets/c93516b0-b442-439b-9648-5c1ebb053163" />
<img width="1440" height="900" alt="Screenshot 2026-02-25 at 11 37 13 AM" src="https://github.com/user-attachments/assets/161c1fe0-c046-4281-9485-2db5d543bff2" />
<img width="1440" height="96" alt="Screenshot 2026-02-25 at 11 43 05 AM" src="https://github.com/user-attachments/assets/9d7e9a8a-c108-4af0-867a-ba57a52a359b" />
<img width="1440" height="177" alt="Screenshot 2026-02-25 at 11 44 36 AM" src="https://github.com/user-attachments/assets/265a1877-95a2-41b5-90e3-62634420e36c" />
<img width="1440" height="661" alt="Screenshot 2026-02-25 at 11 56 58 AM" src="https://github.com/user-attachments/assets/f8a718ad-594a-49aa-be8a-00ea93cde88f" />
<img width="1440" height="900" alt="Screenshot 2026-02-25 at 11 59 48 AM" src="https://github.com/user-attachments/assets/9020437c-e939-4372-9c85-5cab96601d69" />
<img width="1440" height="114" alt="Screenshot 2026-02-25 at 11 59 59 AM" src="https://github.com/user-attachments/assets/9198ee5a-a0bc-4cb7-b628-ca5806c434a1" />
<img width="1440" height="175" alt="Screenshot 2026-02-25 at 12 00 21 PM" src="https://github.com/user-attachments/assets/cb3d5530-54a6-41e8-8ad4-971d483e732a" />
<img width="1440" height="163" alt="Screenshot 2026-02-25 at 12 00 36 PM" src="https://github.com/user-attachments/assets/bf982c18-8db0-4a11-8fc6-dfc378d616fc" />
<img width="1440" height="138" alt="Screenshot 2026-02-25 at 12 01 13 PM" src="https://github.com/user-attachments/assets/3444a066-cc83-4dc4-b29d-5ed44da17ca7" />
<img width="1440" height="900" alt="Screenshot 2026-02-25 at 12 06 23 PM" src="https://github.com/user-attachments/assets/de749164-d090-4d75-81e7-b6b90da6a177" />
<img width="1440" height="900" alt="Screenshot 2026-02-25 at 12 06 27 PM" src="https://github.com/user-attachments/assets/f15e3c37-6400-42cc-a656-a0ac6a628338" />
<img width="1440" height="900" alt="Screenshot 2026-02-25 at 12 06 38 PM" src="https://github.com/user-attachments/assets/7027eef9-f969-4eb0-8ef5-73cafcafc748" />


## Result
- WordPress and MySQL containers were successfully created.
- Volumes were created for persistent storage:
- mysql_data
- wp_content
- Custom bridge network was automatically created.
- WordPress was accessible on:
 -http://localhost:8080
- Containers were properly removed using docker compose down.

## Concepts Learned
- Docker Compose simplifies multi-container management.
- Automatic network creation between services.
- Use of volumes for persistent data.
- depends_on for service dependency.
- ARM64 compatibility issues with certain images.
- Difference between:
- docker run
- docker compose up

## Conclusion
This experiment successfully demonstrated the working of Docker Compose for both single-container and multi-container applications.
Using Docker Compose:
- Multiple services can be managed using a single YAML file.
- Networking between containers is automatically handled.
- Persistent storage can be managed easily using volumes.
- Full application stack (WordPress + MySQL) can be deployed with a single command.
- Docker Compose makes container orchestration simple, structured, and efficient for real-world application deployment.
