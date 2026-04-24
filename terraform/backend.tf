terraform {
  backend "azurerm" {
    resource_group_name  = "tfstate-rg"
    storage_account_name = "tfstatebackend12345"
    container_name       = "tfstate"
    key                  = "devopsapp.terraform.tfstate"
  }
}