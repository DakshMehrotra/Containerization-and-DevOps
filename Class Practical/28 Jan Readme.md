## Docker Experiment: Containerizing a Java Application

## Aim
To create a Docker image for a simple Java application using a Dockerfile, build the image, and verify that it runs successfully inside a container.

## Requirements
Before starting, ensure you have the following installed:
Docker Desktop (Mac/Windows/Linux)
Basic knowledge of terminal commands
Java source file (Hello.java)

## Project Structure
Container Codes/
│── Dockerfile
│── Hello.java

## Source Code
Hello.java ->

public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Docker!");
    }
}

Dockerfile Used ->


FROM ubuntu:22.04

RUN apt update && apt install -y openjdk-17-jdk

WORKDIR /home/app

COPY Hello.java .

RUN javac Hello.java

CMD ["java", "Hello"]

## Steps Performed

1. Start Docker Desktop:
   open -a Docker
   Check Docker status::
   docker info
   
2. Navigate to Project Directory
   cd ~/Desktop/College/"6th Semester"/"Container and deveops"/"Container Codes"

List files:
ls

Output:
Dockerfile  Hello.java

3. Build Docker Image
   docker build -t java-app:1.0 .

   This creates a Docker image named:
   java-app:1.0

4. Verify Image Creation
   docker images

5. Run the Container
   docker run java-app:1.0
Output:
Hello, Docker!

## Screenshots : 
<img width="1440" height="900" alt="Screenshot 2026-01-28 at 11 49 08 AM" src="https://github.com/user-attachments/assets/2db9c52f-7d30-49b7-af31-e52b7e61b287" />
<img width="1440" height="900" alt="Screenshot 2026-01-28 at 11 49 12 AM" src="https://github.com/user-attachments/assets/77178b67-9377-4ef2-a186-23bb007c74c5" />
<img width="1440" height="900" alt="Screenshot 2026-01-28 at 11 50 10 AM" src="https://github.com/user-attachments/assets/730f37a9-da9c-4a1a-a7ff-ffae7e1a0c57" />
<img width="1440" height="432" alt="Screenshot 2026-01-28 at 11 51 10 AM" src="https://github.com/user-attachments/assets/d1dc9bb1-9db5-4e0e-919e-713295d360f2" />
<img width="1440" height="900" alt="Screenshot 2026-01-28 at 12 05 29 PM" src="https://github.com/user-attachments/assets/7a90085d-1f2b-45bd-be34-251f84b7bb7e" />
<img width="1440" height="900" alt="Screenshot 2026-01-28 at 12 07 28 PM" src="https://github.com/user-attachments/assets/ec315eeb-3dfc-4339-92bc-8e8f17d090d4" />



Result
Successfully created a Docker image containing a Java program and executed it inside a container.

Conclusion
This experiment demonstrates how Docker can package a Java application along with its runtime environment, ensuring portability and consistency across systems.



