# prints the name of the resource group.
output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

# Displays the URL of the ACR registry
output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

# Displays the name of the Kubernetes cluster.
output "aks_cluster_name" {
  value = azurerm_kubernetes_cluster.aks.name
}
