# Kubernetes Container Practical — Apache Web App

> A **hands-on Kubernetes practical** where I deployed, managed, scaled, debugged, and modified a containerized Apache web server.  
> Pure CLI. Real understanding. No shortcuts. 

---

## Objective

- Deploy a simple Apache (`httpd`) web server
- Verify it is running and accessible via browser
- Convert Pod → Deployment
- Expose it using a Service
- Scale it horizontally
- Break it intentionally and fix it
- Modify live content inside the container

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Kubernetes (k3d cluster) | Container orchestration |
| Docker | Container runtime |
| `kubectl` CLI | Cluster management |
| Apache `httpd` image | Web server |

---

## Step-by-Step Execution

### 1. Create a Pod

```bash
kubectl run apache-pod --image=httpd
```

Check status:

```bash
kubectl get pods
```

---

### 2. Verify Pod Details

```bash
kubectl describe pod apache-pod
```

---

### 3. Access the Application (Port Forward)

```bash
kubectl port-forward pod/apache-pod 8081:80
```

Open in browser → `http://localhost:8081`

**Output:** `It works!`

---

### 4. Delete the Pod

```bash
kubectl delete pod apache-pod
```

---

### 5. Create a Deployment

```bash
kubectl create deployment apache --image=httpd
```

Verify:

```bash
kubectl get deployments
kubectl get pods
```

---

### 6. Expose the Deployment

```bash
kubectl expose deployment apache --port=80 --type=NodePort
```

---

### 7. Access via Service

```bash
kubectl port-forward service/apache 8082:80
```

Open → `http://localhost:8082`

---

### 8. Scale the Application

```bash
kubectl scale deployment apache --replicas=2
```

Check:

```bash
kubectl get pods
```

Now running multiple pods!

---

### 9. Break the Deployment (Debugging Practice)

```bash
kubectl set image deployment/apache httpd=wrongimage
```

Check:

```bash
kubectl get pods
```

**Error:** `ErrImagePull`

---

### 10. Fix the Issue

```bash
kubectl set image deployment/apache httpd=httpd
```

---

### 11. Modify Website Content

Enter the container:

```bash
kubectl exec -it <pod-name> -- /bin/bash
```

Edit the file:

```bash
echo "Hello from Kubernetes" > /usr/local/apache2/htdocs/index.html
```

Exit the container:

```bash
exit
```

Refresh browser → **Updated output visible!**

---

### 12. Test Self-Healing

Delete a pod:

```bash
kubectl delete pod <pod-name>
```

Check:

```bash
kubectl get pods
```

💡 **Kubernetes automatically creates a new pod!**

---

### 13. Cleanup

```bash
kubectl delete deployment apache
kubectl delete service apache
```

---

## Screenshots
<img width="1440" height="405" alt="Screenshot 2026-03-25 at 11 20 35 AM" src="https://github.com/user-attachments/assets/638cab7d-efeb-423a-93ab-4585ae534c77" />
<img width="1440" height="900" alt="Screenshot 2026-03-25 at 11 21 26 AM" src="https://github.com/user-attachments/assets/10a8c031-81e2-4c5b-bc7e-24b07cab6308" />
<img width="1440" height="84" alt="Screenshot 2026-03-25 at 11 23 00 AM" src="https://github.com/user-attachments/assets/07bee9ac-6466-4eb7-b187-08558f0e9134" />
<img width="1431" height="744" alt="Screenshot 2026-03-25 at 11 23 23 AM" src="https://github.com/user-attachments/assets/06cb797f-bfc2-44d1-8531-cd48629016ca" />
<img width="1440" height="199" alt="Screenshot 2026-03-25 at 11 28 12 AM" src="https://github.com/user-attachments/assets/774ca3d2-bc3c-45a4-9a9b-e7254d13d000" />
<img width="1435" height="83" alt="Screenshot 2026-03-25 at 11 29 22 AM" src="https://github.com/user-attachments/assets/b59a63ac-dd32-45f1-b6ed-f3c6771547ae" />
<img width="1440" height="191" alt="Screenshot 2026-03-25 at 11 29 44 AM" src="https://github.com/user-attachments/assets/1cd51bce-906d-48ba-96e2-ef0f8d110e41" />
<img width="1440" height="264" alt="Screenshot 2026-03-25 at 11 30 49 AM" src="https://github.com/user-attachments/assets/54680771-66b3-4754-a834-48896a00e041" />
<img width="1430" height="783" alt="Screenshot 2026-03-25 at 11 30 57 AM" src="https://github.com/user-attachments/assets/667c9664-c563-4f55-abc3-7daf956ccbad" />
<img width="1440" height="111" alt="Screenshot 2026-03-25 at 11 31 19 AM" src="https://github.com/user-attachments/assets/e525ebc0-394c-47e5-af94-c35b320d35d0" />
<img width="1440" height="280" alt="Screenshot 2026-03-25 at 11 33 16 AM" src="https://github.com/user-attachments/assets/8a581eeb-aa39-45c5-8e72-b603c0330fdc" />
<img width="1440" height="900" alt="Screenshot 2026-03-25 at 11 34 08 AM" src="https://github.com/user-attachments/assets/2b055ec7-dd43-4bb8-9c23-8891771e3ab1" />
<img width="1440" height="140" alt="Screenshot 2026-03-25 at 11 35 16 AM" src="https://github.com/user-attachments/assets/3be6d56a-a47e-43e6-8828-e39146b9ab96" />
<img width="1413" height="764" alt="Screenshot 2026-03-25 at 11 36 34 AM" src="https://github.com/user-attachments/assets/0b85e80a-042c-45e7-a918-2c70bc62dafc" />
<img width="1440" height="138" alt="Screenshot 2026-03-25 at 11 37 42 AM" src="https://github.com/user-attachments/assets/b63730f8-9f9f-4ac1-85f9-c339068f5ce9" />
<img width="1440" height="144" alt="Screenshot 2026-03-25 at 11 38 54 AM" src="https://github.com/user-attachments/assets/fecdf2f1-c773-4bce-a7c7-f76c2db97e0d" />
<img width="1440" height="900" alt="Screenshot 2026-03-25 at 11 43 35 AM" src="https://github.com/user-attachments/assets/1d9770f7-6d99-495b-9435-7edfd2574c3a" />
<img width="1440" height="900" alt="Screenshot 2026-03-25 at 11 44 58 AM" src="https://github.com/user-attachments/assets/7ea38e30-e0d1-4b94-be90-8473cf419eff" />
<img width="1440" height="105" alt="Screenshot 2026-03-25 at 11 45 24 AM" src="https://github.com/user-attachments/assets/61ba3b27-002c-4160-ac3b-b6becd611071" />
<img width="1440" height="282" alt="Screenshot 2026-03-25 at 11 47 18 AM" src="https://github.com/user-attachments/assets/959ed1c3-599a-46ce-a2cd-20b66a9b8251" />


## Key Learnings

- **Pods are temporary** — Deployments are managed and self-healing
- **Kubernetes provides self-healing** — deleted pods are automatically replaced
- **Scaling is 1 command away** — `kubectl scale` makes it trivial
- **Debugging is a core skill** — `describe`, `logs`, and `get` are your best friends
- **Services expose internal apps** — NodePort, ClusterIP, LoadBalancer
- **Port-forward is useful for local testing** — no need to expose publicly during dev

---

## Final Result

| Task | Status |
|------|--------|
| Apache app deployed | Done |
| Accessed via browser | Done |
| Scaled to multiple replicas | Done |
| Debugged broken deployment | Done |
| Modified live container content | Done |
| Self-healing verified | Done |

---


---

## Conclusion

This practical gave me a **real-world understanding of Kubernetes beyond theory**.  
I didn’t just deploy a container — I **controlled the entire lifecycle** of an application.

From creating a simple Pod to managing a full Deployment, exposing it, scaling it, breaking it intentionally, and fixing it — every step reinforced how powerful Kubernetes actually is.

The biggest takeaways:

- Kubernetes is **self-healing and resilient by design**
- Deployments are the **real way to manage production workloads**
- Debugging (like `ErrImagePull`) is not scary when you understand the flow
- Scaling and updates are **fast, controlled, and efficient**
- Direct container interaction helps understand **what’s happening under the hood**

Overall, this was not just a lab — it felt like **operating a real production system in a simplified environment**.

This is the kind of hands-on experience that actually builds confidence.
