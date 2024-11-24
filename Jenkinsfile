pipeline {
    agent any
    environment {
        NODE_ENV = 'production'
        DOCKER_IMAGE = "devops-project-${BUILD_NUMBER}"
    }
    tools {
        nodejs 'NodeJS 20'
    }
    stages {
        stage('Clean Workspace') {
            steps {
                bat 'if exist %WORKSPACE% rmdir /s /q %WORKSPACE%'
            }
        }
        stage('Clone Repository') {
            steps {
                bat 'git clone -b main https://github.com/pinkelephant4/devops-project.git .'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube-devopsProject') {
                    bat 'sonar-scanner.bat'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                bat "docker build -t %DOCKER_IMAGE% ."
            }
        }
        stage('Deploy Application') {
            steps {
                bat "docker-compose up -d"
            }
        }
    }
    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}
