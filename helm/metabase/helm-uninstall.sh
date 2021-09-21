#!/bin/bash

helm uninstall cas-metabase -n dev-metabase
kubectl delete configmap --all -n dev-metabase
kubectl delete pvc --all -n dev-metabase

helm uninstall cas-metabase -n test-metabase
kubectl delete configmap --all -n test-metabase
kubectl delete pvc --all -n test-metabase

helm uninstall cas-metabase -n prod-metabase
kubectl delete configmap --all -n prod-metabase
kubectl delete pvc --all -n prod-metabase

kubectl delete namespace dev-metabase
kubectl delete namespace test-metabase
kubectl delete namespace prod-metabase
