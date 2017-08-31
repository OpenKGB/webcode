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
                sh '''
                    echo "Hello, World!"
                '''
            }
        }

        stage('Remove old docker entities') {
            steps {
                sh '''
                    cd /srv/openkgb/webcode || exit 0
                    # docker-compose down --rmi local -v || true
                    docker-compose down || true
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    cd /srv/openkgb
                    rm -rf *
                    git clone https://github.com/OpenKGB/webcode.git
                '''
                withCredentials([
                    file(credentialsId: 'local_settings.py', variable: 'LOCAL_SETTINGS'),
                    file(credentialsId: 'openkgb.key', variable: 'OPENKGB_KEY'),
                    file(credentialsId: 'openkgb.crt', variable: 'OPENKGB_CRT'),
                    string(credentialsId: 'postgres_password', variable: 'POSTGRES_PASSWORD')
                ]) {
                   sh '''
                        cat $LOCAL_SETTINGS > /srv/openkgb/webcode/django/webcode/webcode/local_settings.py
                        cat $OPENKGB_KEY > /srv/openkgb/webcode/nginx/openkgb.key
                        cat $OPENKGB_CRT > /srv/openkgb/webcode/nginx/openkgb.crt
                        cd /srv/openkgb/webcode
                        export POSTGRES_PASSWORD=$POSTGRES_PASSWORD
                        docker-compose up -d --build django postgres nginx
                    '''
                }
            }
        }
    }
}
