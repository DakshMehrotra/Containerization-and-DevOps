## Lab Title
**Installing Java (OpenJDK) and Executing a Java Program inside Docker Ubuntu Container**

---
## Objective of the Experiment


Verify Docker environment and version details  
Run Ubuntu container with a custom name  
Update Ubuntu repositories inside Docker  
Install Java Development Kit (OpenJDK 17)  
Install Nano editor for writing code  
Create and execute a Java program inside Docker container  
Demonstrate Docker as a lightweight development environment  

---

## Tools & Technologies Used

| Component | Purpose |
|----------|---------|
| Docker Desktop | Container runtime platform |
| Ubuntu Container | Linux environment for development |
| OpenJDK 17 | Java compiler and runtime |
| Nano Editor | File editing inside container |
| Terminal (zsh) | Command execution interface |

---

---

# Step-by-Step Execution

---

### Step 1: Checking Docker Version**

Docker installation and client/server status were verified using:
docker version

### Step 2: Running Ubuntu Container with Custom Name
A new Ubuntu container was launched with a custom name:
docker run -it --name Java ubuntu

### Step 3: Updating Ubuntu Packages
Inside the container, the package repository was refreshed using:
apt update

### Step 4: Installing Java Development Kit (OpenJDK 17)
Java was installed inside the container with:
apt install -y openjdk-17-jdk

### Step 5: Installing Nano Text Editor
To edit source code files inside Ubuntu container:
apt install -y nano

### Step 6: Writing a Java Program
A simple Java file was created using:
nano HelloWorld.java

Example program:
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World from Java in Docker!");
    }
}

### Step 7: Running Java Program Inside Docker Container
The program was compiled/executed using:
java HelloWorld.java
Output:
Hello World from Java in Docker!

<img width="1440" height="900" alt="Screenshot 2026-01-23 at 12 38 49 PM" src="https://github.com/user-attachments/assets/dbaa2f75-8569-425f-9067-92a801b31836" />
<img width="1440" height="900" alt="Screenshot 2026-01-23 at 12 38 38 PM" src="https://github.com/user-attachments/assets/104772cb-0ef0-4033-b631-c1953352aa24" />
<img width="1440" height="900" alt="Screenshot 2026-01-23 at 12 34 54 PM" src="https://github.com/user-attachments/assets/b82864a1-fc47-41b5-bbc6-fba809642a7a" />
<img width="1440" height="900" alt="Screenshot 2026-01-23 at 12 34 20 PM" src="https://github.com/user-attachments/assets/c009299b-8ad6-4c28-acb9-bbb26e2f17ec" />
<img width="1440" height="900" alt="Screenshot 2026-01-23 at 12 34 03 PM" src="https://github.com/user-attachments/assets/5e8dfcb4-0516-4adf-8690-da2a30f7bf36" />
<img width="1440" height="900" alt="Screenshot 2026-01-23 at 12 33 18 PM" src="https://github.com/user-attachments/assets/d1fb989e-8616-4e40-bb74-9c8768808350" />
<img width="1440" height="900" alt="Screenshot 2026-01-23 at 12 32 36 PM" src="https://github.com/user-attachments/assets/2fa76296-c01f-4155-aab7-efbec0104371" />
<img width="1440" height="900" alt="Screenshot 2026-01-23 at 12 32 10 PM" src="https://github.com/user-attachments/assets/0c48ad9b-8fb0-4bd9-a368-bd81856edf78" />

## Results
Docker environment verified successfully.
Ubuntu container launched with custom name.
OpenJDK 17 installed correctly inside container.
Java program created and executed successfully.
Output displayed properly from inside Docker container.

## Conclusion
This experiment demonstrated that Docker is not only useful for running containers, but also for setting up complete development environments.
By installing Java inside an Ubuntu container, we successfully built and executed a Java program without needing a full virtual machine.
Docker provides a lightweight, portable and efficient platform for software development and testing.
