import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";

// Create a namespace.
const ns = new k8s.core.v1.Namespace("argocd", {
    metadata: {
        name: "argocd",
    },
});

const chart = new k8s.helm.v3.Chart('argocd', {
    chart: 'argo-cd',
    version: '5.25.0',
    namespace: ns.metadata.name,
    fetchOpts: {
        repo: 'https://argoproj.github.io/argo-helm',
    },
})
