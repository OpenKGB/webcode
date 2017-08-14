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
                    docker-compose down --rmi local -v || true
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
                withCredentials([file(credentialsId: 'local_settings.py', variable: 'LOCAL_SETTINGS')]) {
                    sh 'cat $LOCAL_SETTINGS > /srv/openkgb/webcode/django/webcode/webcode/local_settings.py'
                }
                withCredentials([file(credentialsId: 'plotyourthought.key', variable: 'PLOTYOURTHOUGHT_KEY')]) {
                    sh 'cat $PLOTYOURTHOUGHT_KEY' > /srv/openkgb/webcode/nginx/plotyourthought.key'
                }
                withCredentials([file(credentialsId: 'plotyourthought.crt', variable: 'PLOTYOURTHOUGHT_CRT')]) {
                    sh 'cat $PLOTYOURTHOUGHT_CRT' > /srv/openkgb/webcode/nginx/plotyourthought.crt'
                }
                withCredentials([string(credentialsId: 'postgres_password', variable: 'POSTGRES_PASSWORD')]) {
                    sh '''
                        cd /srv/openkgb/webcode
                        export POSTGRES_PASSWORD=$POSTGRES_PASSWORD
                        docker-compose up -d
                    '''
                }
            }
        }
    }
}
