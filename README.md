# README

```
cd bootstrap
cat ~/.kube/config | pulumi config set --secret kubernetes:kubeconfig
```