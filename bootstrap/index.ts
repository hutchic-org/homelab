import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";
import { hostname } from "os";
import * as application from "./crd/application";
import { Application } from "./crd/application/argoproj/v1alpha1";

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

// Create an ArgoCD Mealie Application.

new k8s.core.v1.Namespace("mealie-ns", {
    metadata: {
        name: "mealie",
    },
});

new Application("mealie-application", {
    metadata: {
        name: "mealie",
        namespace: "argocd"
    },
    spec: {
        project: "default",
        source: {
            chart: "mealie",
            repoURL: "https://charts.truecharts.org/",
            targetRevision: "14.0.21",
            helm: {
                parameters: [
                    {
                        name: "ingress.main.enabled",
                        value: "true"
                    },
                    {
                        name: "ingress.main.hosts[0].host",
                        value: "homelab.local"
                    },
                    {
                        name: "ingress.main.hosts[0].paths[0].path",
                        value: "/"
                    },
                    {
                        name: "ingress.main.enableFixedMiddlewares",
                        value: "false"
                    }
                ]
            }
        },
        destination: {
            server: "https://kubernetes.default.svc",
            namespace: "mealie",
        },
        syncPolicy: {
            automated: {}
        }
    },
});
