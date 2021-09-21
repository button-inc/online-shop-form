#!/bin/bash

helm uninstall mailhog -n dev-mailhog
helm uninstall mailhog -n test-mailhog

kubectl delete namespace dev-mailhog
kubectl delete namespace test-mailhog
