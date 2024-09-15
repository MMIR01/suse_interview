# SUSE Quality Assurance Engineer – Technical Challenge
## Level 3: Deploy a VM on GCP

Create a script using Terraform, Google API or Ansible to deploy a VM on GCP

## Table of Contents
- [Features](#features)
- [Software Requirements](#software-requirements)
- [Prerequisites](#prerequisites)
- [Install GCloud and Terraform with Docker](#install-gcloud-and-terraform-with-docker)
- [Configue GCloud](#configure-gcloud)
- [Deploy the VM in GCP](#deployt-the-vm-in-gcp)


## Features
- Run a docker container with GCloud CLI and Terraform
- Deploy a VM in GCP using a Terraform script

## Software requirements
For this task I have used the following stack:
- Windows 10 (it hasn't been tested on different OS versions)
- Docker version 27.1.1, build 6312585
- Powershell
- Windows Subsystem for Linux (WSL) installed

Although most of the time I am going to use docker-cli, Docker Desktop is useful to handle the images and container. 
For more info about how to install Docker Desktop, please click [here](https://docs.docker.com/desktop/install/windows-install/).

## Prerequisites
Using this [resource](https://ranchermanager.docs.rancher.com/getting-started/quick-start-guides/deploy-rancher-manager/gcp) as a reference, follow these steps:
1. Create a Google GCP Account
2. Create a Google GCP Project
3. Create a Google GCP Service Account

For the step 3, in the Google Cloud console, go to Menu menu > IAM & Admin > Service Accounts.
Create a new service account with:
- Name > Terra
- Rol > Owner

After that, select your service account.
- Click Keys > Add key > Create new key.	
- Select JSON, then click Create
- Click Close
 
Copy those credentials in the `terraform_files` folder under the name `terra_credentials.json`

In the same folder, open the file `deployVM.tf` and update the project field with the ID of your project

## Install GCloud and Terraform with Docker
Follow the steps from this [link](https://cloud.google.com/sdk/docs/downloads-docker?hl=es-419) to install Google Cloud CLI image

I have used the latest tag:
```bash
docker pull gcr.io/google.com/cloudsdktool/google-cloud-cli:latest
```

Open a Powershell terminal, go to the `level3` folder  and execute the script called `updateDocker.ps1`. The script will create a new container called `googlecloud` by using the DockerFile provided

If you can't execute the script, please try the following with Powershell:
```bash
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser .\updateDocker.ps1
```

## Configure GCloud
Once the interactive console is opened, we can check gcloud and terraform are installed by executing:
```sh
gcloud version
terraform --version
```

If everything is ok, execute:
```sh
gcloud auth login
```
Follow the link provided and copy the key

Continue executing:
```sh
gcloud config set project PROJECT_ID
```

Initializa Terraform:
```sh
cd /code/terraform_files
terraform init
```

## Deploy the VM in GCP
Now everything is ready to execute the terraform script in order to deploy a VM in the Google Cloud.

First of all, let's create a plan to see what Terraform will do before applying it:
```sh
cd /code/terraform_files
terraform plan
```

After that, it is time to deploy the VM:
```sh
terraform apply
```
Type `yes`

First time you might get the following error:
```sh
│ Error: Error loading zone 'us-central1-a': googleapi: Error 403: Compute Engine API has not been used in project sacred-drive-435709-e3 before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/compute.googleapis.com/overview?project=sacred-drive-435709-e3 then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.
```

Visit the indicated URL to enable the Compute Engine API, and then reexecute the command above.

The expected output is something like this:
```sh
google_compute_instance.vm_instance: Creating...
google_compute_instance.vm_instance: Still creating... [10s elapsed]
google_compute_instance.vm_instance: Creation complete after 18s [id=projects/sacred-drive-435709-e3/zones/us-central1-a/instances/terraform-vm]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

> Note 1: it is possible to deploy a VM with a different OS. Check the list of the OS available executing the command:
gcloud compute images list

And then, modify the image field from the terraform script accordingly


> Note 2:  In order to deploy a rancher VM, please follow these steps:
 git clone https://github.com/rancher/quickstart
 cd quickstart/rancher/gcp
 mv terraform.tfvars.example terraform.tfvars
 apt-get install vim
 vim <terraform file> (update the fields)
 terraform init
 terraform apply 

More info [here](https://github.com/rancher/quickstart/tree/master)


## License
MIT
