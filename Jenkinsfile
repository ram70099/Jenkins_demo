pipeline {
    agent any

    options {
        // Avoid default SCM checkout to prevent conflict with our custom checkout
        skipDefaultCheckout(true)
    }

    tools {
        nodejs 'nodejs'  // Make sure NodeJS is configured in Jenkins global tools
    }

    environment {
        // Define environment variables for site ID and access token
        NETLIFY_SITE_ID = credentials('1c4f2446-f5d5-4f44-b23d-399af5022494')
        NETLIFY_ACCESS_TOKEN = credentials('nfp_Dzf92qapQAFfWo42YhoPDZegrobeUJURbcd5')
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
                bat "npm install -g netlify-cli"  // Install Netlify CLI globally
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

        stage("Deploy to Netlify") {
            steps {
                script {
                    // Deploy to Netlify using the Netlify CLI
                    bat """
                    netlify deploy --dir=build --prod --site=$NETLIFY_SITE_ID --auth=$NETLIFY_ACCESS_TOKEN
                    """
                }
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
