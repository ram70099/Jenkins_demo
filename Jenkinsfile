pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    tools {
        // Make sure this exact name is configured in Jenkins > Manage Jenkins > Global Tool Configuration
        nodejs 'nodejs'
    }

    environment {
        // These credentials must be set as "Secret text" in Jenkins
        NETLIFY_SITE_ID      = credentials('1c4f2446-f5d5-4f44-b23d-399af5022494')         // Replace with actual credentials ID
        NETLIFY_ACCESS_TOKEN = credentials('nfp_EWLu35miw8fRAeq2fX981T1hyaYo6HcQ8317')    // Replace with actual credentials ID
    }

    stages {
        stage("Checkout Code") {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/ram70099/Jenkins_demo.git'
                    // Remove credentialsId if public repo
            }
        }

        stage("Install Dependencies") {
            steps {
                bat "npm install --verbose"
                bat "npm install -g netlify-cli"
            }
        }

        stage("List Directory") {
            steps {
                bat "dir"
            }
        }

        stage("Check package.json") {
            steps {
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

        stage("Deploy to Netlify") {
            steps {
                bat """
                    netlify deploy --dir=build --prod --site=%NETLIFY_SITE_ID% --auth=%NETLIFY_ACCESS_TOKEN%
                """
            }
        }
    }

    post {
        success {
            echo '✅ Build and Deploy Successful!'
        }
        failure {
            echo '❌ Build or Deploy Failed!'
        }
    }
}
