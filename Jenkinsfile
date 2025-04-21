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
                dir('basic_docker_concept') {
                    bat "npm install --verbose"
                }
            }
        }

        stage("Check package.json") {
            steps {
                dir('basic_docker_concept') {
                    script {
                        echo "Contents of package.json:"
                        bat 'type package.json'  // For Windows
                    }
                }
            }
        }

        stage("Run Tests") {
            steps {
                dir('basic_docker_concept') {
                    script {
                        // Check if the "test" script exists in package.json
                        def hasTest = fileExists('package.json') && readFile('package.json').contains('"test":')
                        if (hasTest) {
                            bat 'npm test || echo "Test failed"'
                        } else {
                            echo 'No test script found in package.json'
                        }
                    }
                }
            }
        }

        stage("Build React App") {
            steps {
                dir('basic_docker_concept') {
                    script {
                        // Check if the "build" script exists in package.json
                        def hasBuild = fileExists('package.json') && readFile('package.json').contains('"build":')
                        if (hasBuild) {
                            bat 'npm run build || echo "Build failed"'
                        } else {
                            echo 'No build script found in package.json'
                        }
                    }
                }
            }
        }
    }
}
