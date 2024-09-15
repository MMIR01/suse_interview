# SUSE Quality Assurance Engineer – Technical Challenge
## Level 1: UI Automation using Cypress framework

Implement an automated e2e test for single node install of Rancher UI
- Rancher single node Install: https://ranchermanager.docs.rancher.com/pages-for-subheaders/installation-and-upgrade#single-node-kubernetes-install
- Docker install: https://ranchermanager.docs.rancher.com/pages-for-subheaders/installation-and-upgrade#docker-install
- If you don’t want to use Docker Desktop, you can install Rancher Desktop and select moby as container engine to use docker client (https://docs.rancherdesktop.io/tutorials/working-with-containers#running-containers).

Cover these 3 cases in your automation script.
- Login into Rancher web page
- Check if the main web page opens up.
- Check if the main web page title is correct

## Table of Contents
- [Features](#features)
- [Software Requirements](#software-requirements)
- [Prerequisites](#prerequisites)
- [Rancher in Docker](#rancher-in-docker)
- [Cypress in Docker](#rancher-in-docker)
- [Run tests](#deployt-the-vm-in-gcp)


## Features
- Run a docker container with a Rancher node
- Execute E2E test with ginkgo

## Software requirements
For this task I have used the following stack:
- Windows 10 (it hasn't been tested on different OS versions)
- Powershell

## Prerequisites
In order to use Docker Desktop, WSL is needed. To install it:
```
wsl --install
```

If you find this error `WslRegisterDistribution failed with error: 0x80370102` try to disable and then enable `Windows Virtual Platform` from `Programs and Features`

Install Docker Desktop for Windows from the  [official webpage](https://docs.docker.com/desktop/install/windows-install/). In my case, it has installed Docker version 27.1.1, build 6312585

## Rancher in Docker
Open a Powershell terminal and type:
```
docker pull rancher/rancher
```

Run Rancher container:
```
docker run -d --restart=unless-stopped -p 80:80 -p 443:443 --privileged rancher/rancher:v2.9-head
```

Open a browser and type `localhost:80`, it will open Rancher UI. In order to create a new password for the admin user, search for the password created during the installation of Rancher inside the docker log. Set a new password (I have used `openSUSE2024`)

## Cypress in Docker
In the powershell terminal, type:
```sh
docker pull cypress/included:13.14.2
```

## Run tests
Go to this folder: `level1/automation`. Execute:

```sh
docker run --rm -it -v .:/exec -w /exec cypress/included:13.14.2
```

As an alternative, we can use the DockerFile provided in order to create an interactive container, so we can run the tests from there. For that, in the Powershell terminal, execute:
```sh
.\updateDocker.ps1
```

Because the entry point is now bash, we can execute manually the tests via the command line, for that, from `level1/automation` folder, execute:
```sh 
cypress run
```

## License
MIT
