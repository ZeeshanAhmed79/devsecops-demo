pipeline{
    agent any
    stages{
        stage ("Deploy to cluster dev-kt-k8s") {
            steps {
                withKubeConfig(credentialsId: 'kubeconfig-dev-kt-k8s') {
                    sh "kubectl apply -f kubernetes/deployment.yaml "
                    sh "kubectl apply -f kubernetes/service.yaml"
                    sh "kubectl apply -f kubernetes/ingress.yaml"
                }
            }
        }
    }
}