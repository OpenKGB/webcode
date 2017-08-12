pipeline {
    agent any

    stages {
        stage('Checkout') {
            checkout scm
        }

        stage('Tests') {
            sh './tools/run-tests.sh'
        }
    }
}