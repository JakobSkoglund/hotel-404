
#!/bin/bash

SUBSCRIPTION_ID="5ef9d2e6-c887-461a-a76c-b739a7ccf6bd"  

if [ "$1" == "start" ]; then
    echo " Starting AKS with 1 node..."
    terraform apply -var "node_count=1" -var "subscription_id=$SUBSCRIPTION_ID" -auto-approve
    echo " AKS is now running!"
elif [ "$1" == "stop" ]; then
    echo " Stopping AKS by setting node_count=0..."
    terraform apply -var "node_count=0" -var "subscription_id=$SUBSCRIPTION_ID" -auto-approve
    echo " AKS is now stopped and saving costs!"
else
    echo " Usage: ./manage-aks-terraform.sh start | stop"
fi
