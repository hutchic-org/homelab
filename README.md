# README

```
cd bootstrap
cat ~/.kube/config | pulumi config set --secret kubernetes:kubeconfig
```

# CRD

```
kubectl get crd applications.argoproj.io -o yaml > crd/application.yaml
crd2pulumi --nodejsPath ./crd/application crd/application.yaml
```

# Applications

## Mealie

```
https://truecharts.org/charts/common/helm-values/
```
