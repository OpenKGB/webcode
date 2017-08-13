pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Tests') {
            steps {
                sh './tools/run-tests.sh'
            }
        }

        stage('Remove old docker entities') {
            steps {
                sh '''
                    cd /srv/openkgb/webcode
                    docker-compose down --rmi local -v
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    cd /srv/openkgb
                    rm -rf *
                    checkout scm
                    withCredentials([file(credentialsId: 'local_settings.py', variable: 'LOCAL_SETTINGS'), text(credentials_id: 'Postgres password', variable: 'POSTGRES_PASSWORD')]{
                        sh 'cat $LOCAL_SETTINGS > /srv/openkgb/webcode/django/webcode/webcode/local_settings.py'
                        sh 'POSTGRES_PASSWORD=$POSTGRES_PASSWORD docker-compose up -d -e POSTGRES_PASSWORD'
                    }
                '''
            }
        }
    }
}