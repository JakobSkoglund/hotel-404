provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

# Create a myResourceGroup
resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}


# create an Azure Container Registryy (ACR)
resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
}


#Create a AKS_Cluster
resource "azurerm_kubernetes_cluster" "aks" {
  name                = var.aks_cluster_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "myaksdns"

  node_resource_group = "hotelAKSResources" 
  
  default_node_pool {
    name       = "agentpool"
    node_count = var.node_count
    vm_size    = "Standard_DS2_v2"
  }

  identity {
    type = "SystemAssigned"
  }
}