pipeline {
    agent { docker 'node:6.10.3' }
    stages {
        stage('build') {
            steps {
                sh 'npm install'
                sh 'npm start'
            }
        }
    }
}
