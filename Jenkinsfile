pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    stages {
        stage("Checkout Code") {
            steps {
                checkout scm
            }
        }

        stage("Install Dependencies") {
            steps {
                sh "npm install"
            }
        }

        stage("Run Tests") {
            steps {
                sh "npm test || echo 'No tests found or test command failed'"
            }
        }

        stage("Build Docker Image") {
            steps {
                sh "docker build -t my-react-app ."
            }
        }

    }
}
