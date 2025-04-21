pipeline {
    agent any

    options {
        // Avoid default SCM checkout to prevent conflict with our custom checkout
        skipDefaultCheckout(true)
    }

    tools {
        nodejs 'nodejs'  // Make sure NodeJS is configured in Jenkins global tools
    }

    stages {
        stage("Checkout Code") {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/ram70099/Jenkins_demo.git',
                    credentialsId: 'dockerhub.creds'  // Optional: use if you have private repos or need auth
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
                echo "Contents of package.json:"
                bat "type package.json"
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
