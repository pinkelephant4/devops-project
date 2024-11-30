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
                script {
                    // Run SonarScanner using Docker
                    def sonarScannerCmd = """
                        docker run --rm -v ${pwd()}:/project sonarsource/sonar-scanner-cli \
                        -Dsonar.projectKey=devops-project \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://localhost:9000 \
                        -Dsonar.login=sonar.login=sqp_8ab1987cd104b76f4cac3ad01811458efc5fe865

                    """
                    bat sonarScannerCmd
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
