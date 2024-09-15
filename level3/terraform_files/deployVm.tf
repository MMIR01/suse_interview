provider "google" {
  credentials = file("/code/terraform_files/terra_credentials.json")
  project     = "sacred-drive-435709-e3"
  region      = "us-central1"
}

resource "google_compute_instance" "vm_instance" {
  name         = "terraform-vm"
  machine_type = "e2-medium"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "suse-cloud/sles-12"
    }
  }

  network_interface {
    network = "default"

    access_config {
    }
  }
}