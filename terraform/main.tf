provider "azurerm" {
  features {}
}

# Create a myResourceGroup
resource "azurerm_resource_group" "rg" {
  name     = "hotelResourceGroup"
  location = "East US"
}

# create an Azure Container Registryy (ACR)
resource "azurerm_container_registry" "acr" {
  name                = "hotelacr12345"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

#Create a AKS_Cluster
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "hotelAKSCluster"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "myaksdns"

  default_node_pool {
    name       = "agentpool"
    node_count = 2
    vm_size    = "Standard_DS2_v2"
  }

    identity {
    type = "SystemAssigned"
  }
}