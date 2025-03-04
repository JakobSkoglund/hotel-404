#!/bin/bash

RESOURCE_GROUP="hotelResourceGroup"
CLUSTER_NAME="hotelAKSCluster"

if [ "$1" == "start" ]; then
    echo "Starting AKS..."
    az aks start --resource-group $RESOURCE_GROUP --name $CLUSTER_NAME
    echo "AKS is now running!"
elif [ "$1" == "stop" ]; then
    echo "Stopping AKS..."
    az aks stop --resource-group $RESOURCE_GROUP --name $CLUSTER_NAME
    echo "AKS is now stopped and saving costs!"
else
    echo "Usage: ./manage-aks-terraform.sh start | stop"
fi
