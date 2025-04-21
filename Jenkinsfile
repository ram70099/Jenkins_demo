pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {
        stage("Checkout Code") {
            steps {
                git 'https://github.com/ram70099/Jenkins_demo.git'
            }
        }

        stage("Install Dependencies") {
            steps {
                bat "npm install --verbose"
            }
        }

        stage("Check package.json") {
            steps {
                script {
                    echo "Contents of package.json:"
                    bat 'type package.json'  // For Windows
                }
            }
        }

       

       
    }
}
