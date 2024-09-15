# SUSE Quality Assurance Engineer – Technical Challenge
## Level 2: API Automation using Go lang (standard test framework or ginkgo)

Implement e2e API test for single node install of Rancher UI
Test to cover.
- Login into Rancher

## Table of Contents
- [Features](#features)
- [Software Requirements](#software-requirements)
- [Prerequisites](#prerequisites)
- [Install GoLang and GinkGo](#install-golang-and-ginkgo)
- [Create a new test](#create-a-new-test)
- [Execute the tests](#deployt-the-vm-in-gcp)


## Features
- Run a docker container with a Rancher node
- Execute E2E test with ginkgo

## Software requirements
For this task I have used the following stack:
- Windows 10 (it hasn't been tested on different OS versions)
- Docker version 27.1.1, build 6312585
- Powershell
- Windows Subsystem for Linux (WSL) installed

Although most of the time I am going to use docker-cli, Docker Desktop is useful to handle the images and container. 
For more info about how to install Docker Desktop, please click [here](https://docs.docker.com/desktop/install/windows-install/).

## Prerequisites
For this exercise it is necessary to follow the steps in the `level 1` folder that indicates how to run rancher in Docker. So, please make sure you have a container with rancher running at this step.

## Install GoLang and GinkGo
For this occassion, I am going to install GoLang on my Windows instead of using docker. For that, please follow these steps:
- Download GoLang windows installer from here: https://go.dev/dl/

Once go is installed, open a Powershell terminal and execute:
```
go install github.com/onsi/ginkgo/v2/ginkgo@latest
```

## Create a new test
These steps are not necessary as the files needed for this example are already in the `level 2` folder, but it is a good reference in case more tests are needed.

In the powershell terminal, type:
```sh
go install github.com/onsi/ginkgo/v2
go install github.com/onsi/gomega
```

Run the following command to initialize a Go module (in the `level 2` folder):
```sh
go mod init rancher-api-automation
```

Install the required dependencies:
```sh
go get github.com/onsi/ginkgo/v2
go get github.com/onsi/gomega
```

Generate the test file:
```sh
ginkgo generate <test_name>
```

## Execute the tests
Inside `level 2` folder, execute:
```sh
ginkgo
```

## License
MIT
