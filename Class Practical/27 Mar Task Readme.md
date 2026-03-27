#  Kubernetes Experiment: Imperative vs Declarative Deployment

##  Objective

To understand and implement **Imperative and Declarative approaches** in Kubernetes by deploying an NGINX application.

---

##  Theory

Kubernetes follows a **declarative model**, where the user defines the desired state of the system, and Kubernetes ensures that the actual state matches it using a **reconciliation loop**.

###  Imperative Approach

* Command-based
* Example:

  ```bash
  kubectl create deployment web --image=nginx
  ```
* Limitations:

  * No version control
  * Not reusable
  * Hard to scale/manage

---

###  Declarative Approach

* YAML-based configuration
* Example:

  ```bash
  kubectl apply -f deployment.yaml
  ```
* Advantages:

  * Reproducible
  * Version controlled
  * Industry standard

---

##  Steps Performed

### 1. Create Deployment (Imperative)

```bash
kubectl create deployment web --image=nginx
```

---

### 2. Verify Deployment

```bash
kubectl get deployments
kubectl get pods
```

---

### 3. Generate YAML File

```bash
kubectl create deployment web --image=nginx --dry-run=client -o yaml > deployment.yaml
```

---

### 4. Modify YAML (Declarative Configuration)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  labels:
    app: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: nginx
```

---

### 5. Delete Old Deployment

```bash
kubectl delete deployment web
```

---

### 6. Apply YAML File

```bash
kubectl apply -f deployment.yaml
```

---

### 7. Verify Pods

```bash
kubectl get pods
kubectl describe deployment web
```

---

### 8. Access Application

```bash
kubectl port-forward deployment/web 8080:80
```

Open in browser:

```
http://localhost:8080
```

👉 Output: Default NGINX Welcome Page

---

### 9. Scaling Deployment (Bonus)

```bash
kubectl scale deployment web --replicas=5
kubectl get pods
```

---

### 10. Cleanup

```bash
kubectl delete deployment web
```

---

## Screenshot
<img width="1440" height="900" alt="Screenshot 2026-03-27 at 10 30 19 PM" src="https://github.com/user-attachments/assets/bc9ca8c8-9809-4a16-b115-2f40cb09e3f4" />
<img width="1439" height="288" alt="Screenshot 2026-03-27 at 10 30 27 PM" src="https://github.com/user-attachments/assets/5dbd9487-8328-48af-a15b-cfa946288e06" />
<img width="1440" height="694" alt="Screenshot 2026-03-27 at 10 30 57 PM" src="https://github.com/user-attachments/assets/6a73b3f3-deb1-4ad1-bd0e-9dab8e6bc032" />
<img width="1082" height="818" alt="Screenshot 2026-03-27 at 10 31 27 PM" src="https://github.com/user-attachments/assets/de9a684f-f699-4877-b6d6-1b2a7bbe30dc" />
<img width="1440" height="137" alt="Screenshot 2026-03-27 at 10 32 52 PM" src="https://github.com/user-attachments/assets/7c3c064c-740c-4abf-9247-b4ab341aeb46" />
<img width="1440" height="900" alt="Screenshot 2026-03-27 at 10 34 28 PM" src="https://github.com/user-attachments/assets/79ff20cf-bd03-41f8-bf20-6a72262903b9" />
<img width="1440" height="900" alt="Screenshot 2026-03-27 at 10 34 32 PM" src="https://github.com/user-attachments/assets/cfdea2a1-0363-4920-83fa-98d2512824c6" />
<img width="1440" height="153" alt="Screenshot 2026-03-27 at 10 34 45 PM" src="https://github.com/user-attachments/assets/a0ffdf2e-cd31-492b-a6f5-ecd03a2d6fab" />
<img width="1440" height="195" alt="Screenshot 2026-03-27 at 10 34 59 PM" src="https://github.com/user-attachments/assets/0959df9b-64ad-4e52-b7d2-af61991bbaba" />


##  Results

* Deployment created successfully
* Pods were running correctly
* Application accessible via browser
* Scaling operation verified

---

##  Conclusion

The **Declarative approach using YAML** is preferred in Kubernetes as it provides:

* Better scalability
* Version control
* Reproducibility

Kubernetes maintains the system state using a **reconciliation loop**, ensuring the desired number of pods are always running.

---

##  Key Learnings

* Difference between imperative and declarative models
* Importance of YAML configuration
* Kubernetes architecture (Deployment → ReplicaSet → Pods)
* Scaling and managing applications in Kubernetes

---

##  Author

Daksh Mehrotra
500125960

---
