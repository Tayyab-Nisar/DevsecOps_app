DevSecOps AKS Project – Documentation

Please find the repo link as the repo is pulic

" https://github.com/Tayyab-Nisar/DevsecOps_app.git "

I have attached the screenshot of project in form that is submited

1 Run Project Locally
Backend
cd backend
npm install
npm start

Runs on:

localhost:5000

2.Frontend
cd frontend
npm install
npm start

Runs on:

localhost:3000
API Connection

Frontend connects to backend via:

localhost:5000/api/hello

2 Docker Run (Optional) if you want to run through dokcer compose
Backend
docker build -t backend .
docker run -p 5000:5000 backend
Frontend
docker build -t frontend .
docker run -p 3000:3000 frontend

3 Kubernetes Access (AKS)
i have used azure kubernated and it is provision through terraform
i ahve use helm to deploy backend and front end and ingress 

to insatll the helm charts of backend, frontend and  ingress you can use the below command

helm install frontend .\devopsapp -f .\frontend-values.yml
helm install backend .\devopsapp -f .\backend-values.yml
helm install ingress .\devopsapp -f .\ingress-values.yml

Ports Used is kubernates are below:
Service	Port
Frontend	80
Backend	5000
Access Application frontend by using
http://IngressIP

you can use below commad

"kubectl get ingress -n devopsapp"

Backend API
http://IngressIP/api/hello

4 Secrets Management
This project uses Azure Service Principal for authentication and secure CI/CD integration.
I am using azure secret for the service principle that is created for Github to access ACR
i have added the details  of service principle in github varibale ACR credentials like:

client ID
client secret
Tenant ID
Endpoint URI etc

Secrets are stored in:

GitHub Secrets (CI/CD)

ACR_LOGIN_SERVER
AZURE_CREDENTIAL for service principle
ACR_NAME
GITHUB_TOKEN

5 Argo CD Access
you can deply argo cd from K8s/argocd.yml you can run it with below commad

" kubectl apply -f argocd.yml "

" kubectl get applications -n argocd "

UI Access
you can access the argo cd by using below command
"kubectl port-forward svc/argocd-server -n argocd 8080:443"

Login details
username: admin

to get password:

"kubectl get secret argocd-initial-admin-secret -n argocd | base64 --decode "


the backend and frontend and ingress are deployed through helm chart in namesapce devopsapp
we can also use helmfile to make more efficient the process of delpyment with just one single commad


6 CI/CD Pipeline Flow
Git Push → GitHub Actions → Build → Scan → Push Image → Update Helm → Argo CD → AKS Deployment
Pipeline Stages
CI uses below Stage
Build Docker images of front and backend
Trivy Dependency Check 
Trivy does Security Scan the build image
CD uses below Stage
Update Helm values in by newly tag image
Commit changes to gitops repo
Argo CD auto-syncs to AKS look for newely updates 
7 Terraform (Infrastructure)

Terraform is used to provision:

Azure Kubernetes Service (AKS)
Azure Container Registry (ACR)
Resource Group
Backend State Config
to use terraform 
terraform init
terraform plan
terraform apply
8 Connect to AKS (kubectl)
install azure cli to you machice
Login to Azure
az login
use below commad to get the kubeconfig file
az aks get-credentials \
  --resource-group resource name \
  --name aksname
Verify cluster and starting using the cluster like
kubectl get nodes
kubectl get all -n devopsapp
9 Architecture Flow
Developer → GitHub → CI/CD Pipeline → ACR → Argo CD → AKS Cluster → Users

I have aslo suer promestheus and grafana to aceess the metric it can be access at
localhost:3000

i have used helm to deploy prometheus and grafana to monitor the pod, node etc within cluster

to access the grafana dashboard use below command

"kubectl port-forward -n monitoring svc/monitoring-grafana 3000:80"

to get the admin passowrd of grafana use the below command

kubectl get secret -n monitoring monitoring-grafana -o jsonpath="{.data.admin-password}" | base64 --decode


Summary
Local development supported
Docker containerized apps
Kubernetes deployed on AKS
GitOps via Argo CD
Infrastructure via Terraform
Security scans included (Trivy)
Monitoring with prometheus and grafana
