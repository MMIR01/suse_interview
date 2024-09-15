#This is the name of the image downloaded
FROM gcr.io/google.com/cloudsdktool/google-cloud-cli:latest

# Set here the terraform version to download
ENV TERRAFORM_VERSION=1.5.7

WORKDIR /code

COPY ./terraform_files /code/terraform_files

RUN apt-get update -y
# Install some tools we need
RUN apt-get install -y unzip
RUN apt-get install -y vim
RUN apt-get install -y unzip curl \
  && curl -fsSL https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip -o terraform.zip \
  && unzip terraform.zip \
  && mv terraform /usr/local/bin/ \
  && rm terraform.zip