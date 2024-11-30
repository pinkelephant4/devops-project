pipeline {
    agent any
    environment {
        NODE_ENV = 'production'
        DOCKER_HOST = 'tcp://localhost:2375'
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
                withSonarQubeEnv('SonarQube-devopsProject') {
                    bat 'sonar-scanner.bat'
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
                bat 'docker run -d -p 8080:8080 my-app:latest'
            }
        }
    }
    
}
