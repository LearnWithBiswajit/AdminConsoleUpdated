pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/LearnWithBiswajit/AdminConsoleUpdated.git'
        BRANCH = 'main'
        DEPLOY_HOST = '10.10.87.41'
        DEPLOY_USER = 'arc'
        APP_DIR = '/home/arc/AdminConsoleUpdated'
    }

    stages {
        stage('Clone Public Repo') {
            steps {
                git branch: "${BRANCH}", url: "${REPO_URL}"
            }
}
        stage('Deploy to Server') {
            steps {
                sshagent(['deploy-server-ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} '
                        if [ ! -d "${APP_DIR}" ]; then
                                git clone ${REPO_URL} ${APP_DIR};
                        fi
                        cd ${APP_DIR}
                        git pull origin ${BRANCH}
                        
                        echo "Stopping all running containers..."
                        docker stop \$(docker ps -q) || true

                        echo "Removing all containers..."
                        docker rm \$(docker ps -aq) || true

                        echo "Removing all images..."
                        docker rmi -f \$(docker images -q) || true
                        
                        docker volume prune
                        
                        echo "Starting new containers..."
                        docker compose -p adminconsole up -d
                        
                        echo "Deployment complete!"
                    '
                    """
                }
            }
         }
    }
}

pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/LearnWithBiswajit/AdminConsoleUpdated.git'
        BRANCH = 'main'
        DEPLOY_HOST = '10.10.87.41'
        DEPLOY_USER = 'arc'
        APP_DIR = '/home/arc/AdminConsoleUpdated'
    }

    stages {
        stage('Clone Public Repo') {
            steps {
                git branch: "${BRANCH}", url: "${REPO_URL}"
            }
}
        stage('Deploy to Server') {
            steps {
                sshagent(['deploy-server-ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} '
                        if [ ! -d "${APP_DIR}" ]; then
                                git clone ${REPO_URL} ${APP_DIR};
                        fi
                        cd ${APP_DIR}
                        git pull origin ${BRANCH}
                        
                        echo "Stopping all running containers..."
                        docker stop \$(docker ps -q) || true

                        echo "Removing all containers..."
                        docker rm \$(docker ps -aq) || true

                        echo "Removing all images..."
                        docker rmi -f \$(docker images -q) || true
                        
                        docker volume prune
                        
                        echo "Starting new containers..."
                        docker compose -p adminconsole up -d
                        
                        echo "Deployment complete!"
                    '
                    """
                }
            }
         }
    }
}

