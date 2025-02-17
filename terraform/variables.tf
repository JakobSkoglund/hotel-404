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

variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
}