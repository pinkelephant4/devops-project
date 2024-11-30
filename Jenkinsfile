pipeline {
    agent any
    environment {
        NODE_ENV = 'production'
        DOCKER_HOST = 'tcp://localhost:2375'
        SONAR_HOST_URL = 'http://localhost:9000'
        SONAR_AUTH_TOKEN = 'sqa_aa346d9718f48938dff657b0200629d4d7ba8c74' // Replace with your actual SonarQube token
    }
    tools {
        nodejs 'NodeJS 20'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/pinkelephant4/devops-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // Run SonarScanner on the local machine (instead of using Docker)
                    bat """
                    sonar-scanner \
                        -Dsonar.projectKey=devops-project \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=${SONAR_HOST_URL} \
                        -Dsonar.login=${SONAR_AUTH_TOKEN}
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t my-app:latest .'
            }
        }

        stage('Deploy Application') {
            steps {
                bat 'docker run -d -p 3000:3000 my-app:latest'
            }
        }
    }
}
