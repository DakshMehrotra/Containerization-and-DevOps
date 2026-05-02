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
