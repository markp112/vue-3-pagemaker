# Steps to deploy Pqgemaker on OpenShift

oc new-project pagemaker

yarn build

docker -t markp112/pagemaker .
docker push markp112/pagemaker

oc new-app docker.io/markp112/pagemaker

oc expose service pagemaker --port 8080


