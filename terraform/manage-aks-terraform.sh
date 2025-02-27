
#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

if [ -z "$SUBSCRIPTION_ID" ]; then
    echo "Error: SUBSCRIPTION_ID is not set. Please add it to the .env file."
    exit 1
fi



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
