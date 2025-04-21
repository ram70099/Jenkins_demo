pipeline {
    agent any

    tools {
        nodejs 'nodejs'  // Make sure NodeJS is configured in Jenkins global tools
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

        stage("List Directory") {
            steps {
                bat "dir"
            }
        }

        stage("Check package.json") {
            steps {
                script {
                    echo "Contents of package.json:"
                    bat 'type package.json'
                }
            }
        }

        stage("Build React App") {
            steps {
                bat "npm run build"
            }
        }

        stage("Archive Build Files") {
            steps {
                archiveArtifacts artifacts: 'build/**/*', fingerprint: true
            }
        }
    }

    post {
        success {
            echo '✅ Build Successful!'
        }
        failure {
            echo '❌ Build Failed!'
        }
    }
}
