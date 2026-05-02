# Lab 10 — SonarQube: Continuous Code Quality Inspection

> **Subject:** Container Technology & DevOps
> **Semester:** 6th | **Experiment No.:** 10
> **Student:** Daksh Mehrotra — 500125960
> **Tool:** SonarQube LTS Community + PostgreSQL (Docker)
> **Platform:** Mac M1 Pro (Apple Silicon)

---

## Objective

To set up SonarQube for continuous code quality inspection, analyze a Java application for bugs, vulnerabilities, and code smells, integrate it into a CI/CD pipeline using Jenkins, and understand how Quality Gates enforce code standards before deployment.

---

## Theory

### What is SonarQube?

SonarQube is an open-source platform for **continuous inspection of code quality**. It performs automatic **static analysis** — meaning it detects issues without executing the code — across multiple dimensions:

| Issue Type | Description | Example |
|---|---|---|
| **Bugs** | Code that will break or behave unexpectedly | Division by zero, NullPointerException |
| **Vulnerabilities** | Security-related issues | SQL Injection, hardcoded credentials |
| **Code Smells** | Maintainability issues that slow development | Empty catch blocks, unused variables |
| **Duplications** | Repeated code blocks | Copy-pasted methods |
| **Coverage** | % of code covered by unit tests | 0% = no tests |
| **Technical Debt** | Estimated time to fix all issues | e.g. 2h 30min |

### Architecture

```
[ Your Code ]
      ↓
[ Sonar Scanner (Maven Plugin) ]  →  Analyzes code locally
      ↓
[ SonarQube Server :9000 ]  →  Stores results + displays dashboard
      ↓
[ PostgreSQL DB ]  →  Persists all analysis data
```

### Key Components

| Component | Role | Analogy |
|---|---|---|
| SonarQube Server | Stores & displays results | Teacher / Examiner |
| Sonar Scanner | Analyzes and sends results | Student writing the exam |
| Source Code | What gets analyzed | Answer sheet |
| PostgreSQL | Persistent storage | Filing cabinet |

### Quality Gate

A **Quality Gate** is a set of conditions that code must satisfy before it can be deployed. If the gate fails, the CI/CD pipeline is blocked — ensuring bad code never reaches production.

**Sonar Way** (default gate) fails when:
- Reliability Rating on New Code is worse than A
- Security Rating on New Code is worse than A
- Coverage on New Code is less than 80%
- Security Hotspots Reviewed is less than 100%

---

## Lab Architecture

```
┌─────────────────┐     HTTP      ┌──────────────────┐
│  Developer      │──────────────▶│  SonarQube       │
│  Machine        │               │  Server          │
│  (Maven/Java)   │               │  (Port 9000)     │
└─────────────────┘               └──────────────────┘
        │                                │
        │ source code                    │ JDBC
        ▼                                ▼
┌─────────────────┐               ┌──────────────────┐
│  Calculator.java│               │  PostgreSQL      │
│  (with issues)  │               │  Database        │
└─────────────────┘               └──────────────────┘
```

---

## Project Structure

```
Lab-10/
├── docker-compose.yml                          # SonarQube + PostgreSQL setup
└── sample-java-app/
    ├── pom.xml                                 # Maven build + Sonar plugin
    ├── Jenkinsfile                             # CI/CD pipeline definition
    └── src/
        └── main/
            └── java/
                └── com/
                    └── example/
                        └── Calculator.java    # Sample app with intentional issues
```

---

## Setup & Execution

### Step 1 — Start SonarQube Environment

```bash
docker compose up -d
docker compose ps          # verify both containers are Up
docker compose logs -f sonarqube   # wait for "SonarQube is operational"
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  sonar-db:
    image: postgres:13
    container_name: sonar-db
    environment:
      POSTGRES_USER: sonar
      POSTGRES_PASSWORD: sonar
      POSTGRES_DB: sonarqube
    volumes:
      - sonar-db-data:/var/lib/postgresql/data
    networks:
      - sonarqube-lab

  sonarqube:
    image: sonarqube:lts-community
    container_name: sonarqube
    ports:
      - "9000:9000"
    environment:
      SONAR_JDBC_URL: jdbc:postgresql://sonar-db:5432/sonarqube
      SONAR_JDBC_USERNAME: sonar
      SONAR_JDBC_PASSWORD: sonar
    volumes:
      - sonar-data:/opt/sonarqube/data
      - sonar-extensions:/opt/sonarqube/extensions
    depends_on:
      - sonar-db
    networks:
      - sonarqube-lab

volumes:
  sonar-db-data:
  sonar-data:
  sonar-extensions:

networks:
  sonarqube-lab:
    driver: bridge
```

> Access SonarQube at: **http://localhost:9000** | Default login: `admin / admin`

---

### Step 2 — Sample Java Application (with Intentional Issues)

```java
// Calculator.java — contains bugs, vulnerabilities, and code smells
package com.example;

import java.sql.*;

public class Calculator {

    // Bug 1: Division by zero not handled
    public int divide(int a, int b) {
        return a / b;
    }

    // Code Smell: Unused variable
    public int add(int a, int b) {
        int result = a + b;
        int unused = 100;
        return result;
    }

    // Vulnerability: SQL Injection — user input directly in query
    public ResultSet getUser(String userId) throws Exception {
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/test", "root", "");
        Statement stmt = conn.createStatement();
        return stmt.executeQuery("SELECT * FROM users WHERE id = " + userId);
    }

    // Code Smell: Duplicate code block
    public int multiply(int a, int b) {
        int result = 0;
        for (int i = 0; i < b; i++) { result = result + a; }
        return result;
    }

    public int multiplyAlt(int a, int b) {
        int result = 0;
        for (int i = 0; i < b; i++) { result = result + a; }
        return result;
    }

    // Code Smell: Too many parameters
    public void processUser(String name, String email, String phone,
                            String address, String city, String state,
                            String zip, String country) {
        System.out.println("Processing: " + name);
    }

    // Bug 2: NullPointerException risk
    public String getName(String name) {
        if (name.equals("")) { return null; }
        return name.toUpperCase();
    }

    // Code Smell: Empty catch block (swallowing exception)
    public void riskyOperation() {
        try {
            int x = 10 / 0;
        } catch (Exception e) {
            // swallowed — bad practice
        }
    }

    // Bug 3: Resource leak — connection never closed
    public void readData() throws Exception {
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/test", "root", "");
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery("SELECT * FROM data");
    }
}
```

---

### Step 3 — Maven Configuration

```xml
<!-- pom.xml -->
<properties>
    <maven.compiler.source>11</maven.compiler.source>
    <maven.compiler.target>11</maven.compiler.target>
    <sonar.projectKey>sample-java-app</sonar.projectKey>
    <sonar.projectName>Sample Java Application</sonar.projectName>
    <sonar.host.url>http://localhost:9000</sonar.host.url>
</properties>

<dependencies>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
    </dependency>
</dependencies>

<build>
  <plugins>
    <plugin>
      <groupId>org.sonarsource.scanner.maven</groupId>
      <artifactId>sonar-maven-plugin</artifactId>
      <version>3.9.1.2184</version>
    </plugin>
  </plugins>
</build>
```

---

### Step 4 — Run SonarQube Analysis

```bash
# Step 1: Compile
mvn clean compile

# Step 2: Scan (use Global Analysis Token)
mvn sonar:sonar \
  -Dsonar.login=YOUR_TOKEN \
  -Dsonar.projectKey=sample-java-app \
  -Dsonar.host.url=http://localhost:9000
```

> Generate token: **SonarQube → My Account → Security → Generate Token (Global Analysis Token)**

---

### Step 5 — Jenkins CI/CD Integration

```groovy
// Jenkinsfile
pipeline {
    agent any

    environment {
        SONAR_HOST_URL = 'http://sonarqube:9000'
        SONAR_TOKEN = credentials('sonar-token')
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'mvn clean verify sonar:sonar'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build') {
            steps { sh 'mvn package' }
        }

        stage('Deploy') {
            steps {
                sh 'docker build -t sample-app .'
                sh 'docker run -d -p 8080:8080 sample-app'
            }
        }
    }
}
```

> The `waitForQualityGate abortPipeline: true` is the critical line — if the Quality Gate fails, the entire pipeline stops and nothing is deployed.

---

### Step 6 — API Verification

```bash
# Fetch all bugs
curl -u admin:admin \
  "http://localhost:9000/api/issues/search?projectKeys=sample-java-app&types=BUG" \
  | python3 -m json.tool

# Fetch vulnerabilities
curl -u admin:admin \
  "http://localhost:9000/api/issues/search?projectKeys=sample-java-app&types=VULNERABILITY" \
  | python3 -m json.tool

# Full metrics summary
curl -u admin:admin \
  "http://localhost:9000/api/measures/component?component=sample-java-app&metricKeys=bugs,vulnerabilities,code_smells,coverage,duplicated_lines_density,sqale_debt_ratio,reliability_rating,security_rating" \
  | python3 -m json.tool

# Quality Gate status
curl -u admin:admin \
  "http://localhost:9000/api/qualitygates/project_status?projectKey=sample-java-app" \
  | python3 -m json.tool
```

---

## Analysis Results

### Before Fix

| Metric | Count | Rating |
|---|---|---|
| Bugs | 5 | E |
| Vulnerabilities | 2 | E |
| Code Smells | 12 | B |
| Technical Debt | 2h 30min | — |
| Test Coverage | 0% | — |
| Quality Gate | **FAILED** | 4 conditions failed |

### After Fixing Divide-by-Zero Bug

```java
// Fixed: Division by zero now handled
public int divide(int a, int b) {
    if (b == 0) {
        throw new IllegalArgumentException("Cannot divide by zero");
    }
    return a / b;
}
```

```bash
# Re-run scan to verify fix
mvn clean compile
mvn sonar:sonar \
  -Dsonar.login=YOUR_TOKEN \
  -Dsonar.projectKey=sample-java-app \
  -Dsonar.host.url=http://localhost:9000
```

| Metric | Before | After Fix |
|---|---|---|
| Bugs | 5 | 4 |
| Vulnerabilities | 2 | 2 |
| Code Smells | 12 | 12 |

> The dashboard reflects the reduced bug count after re-scan — demonstrating SonarQube's **continuous feedback loop**.

---

## CI/CD Flow with Quality Gate

```
Developer commits code
        ↓
Jenkins triggers pipeline
        ↓
mvn clean verify sonar:sonar
        ↓
SonarQube analyzes code
        ↓
Quality Gate evaluated
    ↙           ↘
PASS              FAIL
  ↓                 ↓
Build continues   Pipeline blocked
Deploy to server  Fix issues first
```

---

## Key Concepts Covered

| Concept | What Was Demonstrated |
|---|---|
| **Quality Gate** | "Sonar way" gate failed — 4 conditions not met |
| **Technical Debt** | 2h 30min estimated fix time shown in dashboard |
| **Static Analysis** | Maven plugin scanned code without running it |
| **CI/CD Integration** | Jenkinsfile blocks deployment on gate failure |
| **Multi-issue Detection** | Bugs, vulnerabilities, code smells all detected |
| **Feedback Loop** | Fixed bug → re-scanned → dashboard updated |
| **Reliability Rating** | E (bugs present) → improves as bugs are fixed |
| **Security Rating** | E (vulnerabilities present) → improves as vulns fixed |

---

## Ratings Scale

| Rating | Meaning |
|---|---|
| **A** | 0 issues — best |
| **B** | At least 1 minor issue |
| **C** | At least 1 major issue |
| **D** | At least 1 critical issue |
| **E** | At least 1 blocker issue — worst |

---

## Tool Comparison

| Feature | Jenkins | Ansible | Chef | SonarQube |
|---|---|---|---|---|
| Primary Purpose | CI/CD Automation | Config Management | Config Management | Code Quality |
| Architecture | Master-Agent | Agentless | Client-Server | Client-Server |
| Language | Groovy | YAML | Ruby | Java |
| Learning Curve | Moderate | Low | High | Low |
| Idempotency | No | Yes | Yes | N/A |

---
## Screenshots
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 14 59 AM" src="https://github.com/user-attachments/assets/3dfdca99-1ab2-4b07-8f37-8ef7d187aa53" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 15 04 AM" src="https://github.com/user-attachments/assets/3fcac733-3308-468c-94f0-1171156ba2ac" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 15 08 AM" src="https://github.com/user-attachments/assets/7298ae7f-43fc-49ed-948b-3b6ef13c38ad" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 15 13 AM" src="https://github.com/user-attachments/assets/69de9821-e306-4420-af08-30eaf8a7b3f9" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 15 17 AM" src="https://github.com/user-attachments/assets/bd64521a-3561-42f7-a347-237de87be66e" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 15 22 AM" src="https://github.com/user-attachments/assets/85cbd6a2-cfc6-4dba-b3da-57a91ddf18ae" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 15 26 AM" src="https://github.com/user-attachments/assets/2f2a608a-c165-4a46-8d14-2f24505abac4" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 15 31 AM" src="https://github.com/user-attachments/assets/c525dd29-45ad-42f4-a28b-5bb609e885dd" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 16 24 AM" src="https://github.com/user-attachments/assets/d1d64afa-3fcc-476f-8c44-92de60fb0833" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 16 54 AM" src="https://github.com/user-attachments/assets/f7c9a289-5b4c-4c2c-b101-fff425342e1e" />
<img width="1440" height="175" alt="Screenshot 2026-05-02 at 8 17 36 AM" src="https://github.com/user-attachments/assets/be36fb53-3ba9-4831-9b86-55b12ecab8ad" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 18 47 AM" src="https://github.com/user-attachments/assets/6d362d4d-1306-4796-bdd1-b2525e747343" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 18 56 AM" src="https://github.com/user-attachments/assets/6c3fec2c-aae2-444e-9c0f-bdcdcf6203c9" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 19 32 AM" src="https://github.com/user-attachments/assets/af0b1017-dec6-421c-830c-8a1aa8bb2a8d" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 21 22 AM" src="https://github.com/user-attachments/assets/6ab790d3-5de8-4680-aad4-ab6e85b57189" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 21 30 AM" src="https://github.com/user-attachments/assets/eca6f68c-36b6-4ba1-a764-d51e4ab03088" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 22 05 AM" src="https://github.com/user-attachments/assets/f963c454-b1a4-4c48-a653-a6441bb32a92" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 22 09 AM" src="https://github.com/user-attachments/assets/16df4bf9-a86b-4cb9-8c3c-58d5d0f11c05" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 22 48 AM" src="https://github.com/user-attachments/assets/3267256b-552c-4467-bf43-cd29eb6557b7" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 23 59 AM" src="https://github.com/user-attachments/assets/d1e77826-e5d5-4906-97e2-d1669ce86af6" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 24 06 AM" src="https://github.com/user-attachments/assets/98d69664-b177-4928-9dae-a8a1084ca88d" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 24 10 AM" src="https://github.com/user-attachments/assets/34ba4b94-48a6-4c49-8d02-78c44ab7367d" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 25 11 AM" src="https://github.com/user-attachments/assets/38a64099-61b3-4910-bad5-5842d1de676c" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 25 19 AM" src="https://github.com/user-attachments/assets/e3a1502a-c14b-463e-b4f4-dd2d579e4a1c" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 25 25 AM" src="https://github.com/user-attachments/assets/123563aa-4982-4aa6-ad7b-9607453c730e" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 27 03 AM" src="https://github.com/user-attachments/assets/34f629e7-5364-4868-9e77-c6c84f5ef6a7" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 27 38 AM" src="https://github.com/user-attachments/assets/db303516-85ff-40c1-9906-3301dc1c5b13" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 28 39 AM" src="https://github.com/user-attachments/assets/2a5e95d1-ee78-4d72-825e-19cc263926a9" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 29 11 AM" src="https://github.com/user-attachments/assets/6c65b173-364a-481a-9ead-538a20160841" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 29 27 AM" src="https://github.com/user-attachments/assets/15de2a6f-86ec-4195-9dac-8b4a59ea9caa" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 29 33 AM" src="https://github.com/user-attachments/assets/0a296bb4-6c3b-4f83-b000-27d8c750b30d" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 32 12 AM" src="https://github.com/user-attachments/assets/dc20cbc1-9eb4-497e-be04-b0a5ead3c132" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 36 00 AM" src="https://github.com/user-attachments/assets/6be6cc10-5b38-4d27-9df3-8afc8477a6d3" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 39 07 AM" src="https://github.com/user-attachments/assets/9b547033-1ca3-4e5c-a206-5bb4d32fc456" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 39 10 AM" src="https://github.com/user-attachments/assets/92d103a4-1002-4e01-bff5-d28715dca1e7" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 41 40 AM" src="https://github.com/user-attachments/assets/bf1c51ef-3686-467c-9a85-b84f2c4a6519" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 42 10 AM" src="https://github.com/user-attachments/assets/d9bf4298-957a-417e-83a5-b08b2515faac" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 42 14 AM" src="https://github.com/user-attachments/assets/42812e3f-dae7-42c7-8737-f6bba41b2908" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 42 18 AM" src="https://github.com/user-attachments/assets/b8db213b-efc5-409d-9550-c86ccc626d4c" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 42 20 AM" src="https://github.com/user-attachments/assets/b6958a1f-725e-4bb0-a0a0-2d7cfcbb6a3f" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 42 23 AM" src="https://github.com/user-attachments/assets/db6bdda3-30bc-417d-a532-3f1a1a086fbf" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 43 44 AM" src="https://github.com/user-attachments/assets/313f42c2-d5cd-4142-99dc-28b0bb4f1c56" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 43 50 AM" src="https://github.com/user-attachments/assets/bf257e7f-3899-4741-86fc-5c93936cc23b" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 45 49 AM" src="https://github.com/user-attachments/assets/01a21c00-a742-4112-ba72-9f3f622e5550" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 45 58 AM" src="https://github.com/user-attachments/assets/9adad9be-e79f-431c-8f7d-5d90b949ed8a" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 47 30 AM" src="https://github.com/user-attachments/assets/a5ff197b-8855-48aa-8b2c-9f6d87d96557" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 47 41 AM" src="https://github.com/user-attachments/assets/9eb2d410-7e09-4400-9265-3af62d01bdd6" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 47 53 AM" src="https://github.com/user-attachments/assets/32a98e84-cf99-422f-a6b6-33b00c93b36d" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 52 20 AM" src="https://github.com/user-attachments/assets/d3811d68-4613-4c4a-b608-acf6a61a5537" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 52 59 AM" src="https://github.com/user-attachments/assets/73bfebab-8293-4193-b91a-aae62d532801" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 53 12 AM" src="https://github.com/user-attachments/assets/6877db88-5bd0-468f-9f18-bdabc4519b51" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 53 21 AM" src="https://github.com/user-attachments/assets/684fd4d2-94ec-4c46-a5be-ec3ccb9f6b2d" />
<img width="1440" height="900" alt="Screenshot 2026-05-02 at 8 53 29 AM" src="https://github.com/user-attachments/assets/19708276-180f-4686-81b5-c79a1d01d224" />

---

## Cleanup

```bash
docker compose down -v
```

This removes all containers and volumes.

---

## References

- [SonarQube Official Documentation](https://docs.sonarqube.org/)
- [SonarQube Docker Hub](https://hub.docker.com/_/sonarqube)
- [Maven Sonar Plugin](https://docs.sonarqube.org/latest/analyzing-source-code/scanners/sonarscanner-for-maven/)
- [SonarQube Quality Gates](https://docs.sonarqube.org/latest/user-guide/quality-gates/)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
