variable "location" {
  description = "Azure region"
  default     = "Sweden Central"
}

variable "resource_group_name" {
  description = "Resource Group Name"
  default     = "hotelResourceGroup"
}

variable "aks_cluster_name" {
  description = "Kubernetes Cluster Name"
  default     = "hotelAKSCluster"
}

variable "acr_name" {
  description = "Azure Container Registry Name"
  default     = "hotelacr12345"
}

<<<<<<< HEAD

variable "node_count" {
  description = "Number of nodes in the user node pool"
  type        = number
  default     = 1  
}

=======
variable "node_count" {
  description = "Number of nodes in the AKS cluster"
  default     = 1
}
>>>>>>> 729d5d3081c593a5efd77b68f391abb942d05361
variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
}