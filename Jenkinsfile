pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    tools {
        // This must match the NodeJS tool name configured in Jenkins > Global Tool Configuration
        nodejs 'nodejs'
    }

    environment {
        // Use Jenkins credentials of type "Secret text" with these IDs
        NETLIFY_SITE_ID      = credentials('1c4f2446-f5d5-4f44-b23d-399af5022494')        // Should be like "1c4f2446-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        NETLIFY_ACCESS_TOKEN = credentials('nfp_EWLu35miw8fRAeq2fX981T1hyaYo6HcQ8317')   // Should be like "nfp_XXXX..."
    }

    stages {
        stage("Checkout Code") {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/ram70099/Jenkins_demo.git'
                    // No credentialsId needed if public repo
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
                    echo Deploying to Netlify...
                    echo Site ID: %NETLIFY_SITE_ID%
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
            echo '❌ Build or Deploy Failed! Check the logs.'
        }
    }
}
