## Kubernetes Deployment & Service Exposure (k3d)
## Objective
To deploy an application on a Kubernetes cluster, manage pods, scale deployments, expose services, and verify outputs using various kubectl commands.
## Tools Used
- Docker Desktop
- kubectl
- k3d
- Kubernetes (k3s)

### Cluster Verification
- k3d cluster list
- kubectl get nodes
Cluster mycluster was already created and node status was Ready

## Deployment Steps
1. Create Deployment
- kubectl create deployment web --image=nginx

2. Verify Pods
- kubectl get pods
Multiple pods were running successfully

3. Scale Deployment
- kubectl scale deployment web --replicas=3
= kubectl get pods
Deployment scaled to 3 replicas

## Service Exposure
4. Expose Deployment
- kubectl expose deployment web --port=80 --type=NodePort
= kubectl get svc
Service web created successfully

5. Port Forwarding (Access Application)
- kubectl port-forward service/web 8080:80

Access in browser:
- http://localhost:8080
Output: Nginx Welcome Page displayed successfully

## Debugging & Verification
1. Check Pod Details
- kubectl describe pod nginx

2. Check Logs
- kubectl logs nginx

3. Check All Resources
- kubectl get all

## Errors Faced & Fixes
1. Deployment already exists
- Error: deployment "web" already exists
Reason: Deployment was already created earlier

2. Service already exists
- Error: service "web" already exists
Solution: kubectl delete svc web

3. Wrong command used
kubectl nodes   -> NO
kubectl get nodes   -> Yes

4. Incorrect scaling command
kubectl scale deployment web --image=nginx -> No
kubectl scale deployment web --replicas=3 -> Yes

## Observations
- Pods were automatically managed by Kubernetes
- Scaling increased number of running pods
- Services enabled communication to pods
- Port forwarding allowed local browser access
- Logs confirmed container execution

## Screenshots

<img width="1440" height="634" alt="Screenshot 2026-03-19 at 10 22 48 AM" src="https://github.com/user-attachments/assets/94075875-b8df-466c-9757-8aaa7c04df41" />
<img width="1440" height="900" alt="Screenshot 2026-03-19 at 10 26 57 AM" src="https://github.com/user-attachments/assets/b5afca0a-5653-4c0f-a3a7-39c51a19e0dd" />
<img width="1440" height="345" alt="Screenshot 2026-03-19 at 10 29 40 AM" src="https://github.com/user-attachments/assets/30e9d263-611c-4adc-8e88-d399b5f835e7" />
<img width="1437" height="233" alt="Screenshot 2026-03-19 at 10 41 51 AM" src="https://github.com/user-attachments/assets/4331ece8-d762-4b05-983f-493d680f736c" />
<img width="1440" height="409" alt="Screenshot 2026-03-19 at 10 43 49 AM" src="https://github.com/user-attachments/assets/febe1f4f-49c0-4e10-81ea-2963f18cefd5" />
<img width="1440" height="428" alt="Screenshot 2026-03-19 at 10 48 55 AM" src="https://github.com/user-attachments/assets/896cf977-2ccd-46e2-a483-37a3a46bbff7" />
<img width="1281" height="63" alt="Screenshot 2026-03-19 at 10 49 38 AM" src="https://github.com/user-attachments/assets/bbeb9d98-9f68-41fc-980c-29110d727ba0" />
<img width="1440" height="900" alt="Screenshot 2026-03-19 at 10 49 43 AM" src="https://github.com/user-attachments/assets/a2cfd1eb-474e-4355-8c74-52a881301e94" />
<img width="1440" height="113" alt="Screenshot 2026-03-19 at 10 54 39 AM" src="https://github.com/user-attachments/assets/856acaa4-bc7f-46a0-abdc-425497084f31" />


## Result
- The Kubernetes deployment was successfully performed using k3d.
- The application (Nginx) was deployed, scaled, and exposed via a service.
- The application was accessed successfully on:
- http://localhost:8080
All commands executed correctly, and the cluster behaved as expected.

## Conclusion
This practical demonstrated:
- Deployment creation
- Pod management
- Scaling of applications
- Service exposure
- Debugging using logs
- Kubernetes successfully handled container orchestration and service management.

