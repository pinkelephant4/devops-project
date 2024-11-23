pipeline {
    agent any
    environment {
        NODE_ENV = 'production'
    }
    tools {
        nodejs 'NodeJS 14'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/pinkelephant4/devops-project.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube-devopsProject') {
                    sh 'npx sonar-scanner'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t devops-project .'
            }
        }
        stage('Deploy Application') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
