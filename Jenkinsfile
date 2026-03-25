pipeline{
    agent any
    tools {
        nodejs  'node22'  //node js testconfig named node22
        allure  'allure' //jenkins Tool configuration named allure
        maven 'maven-3.6.3'
    }
    options {
        timeout(time: 20, unit: 'MINUTES')
    }
    environment { TEST_CREDENTIALS = credentials('e2e-test-user') //jenkins credentials with id test-credentials
        ALLURE_RESULTS = 'allure-results'
    }
    stages{
        stage('Build') {
            steps {
                sh '''
                    set -eu
                    npm ci
                    npx playwright install
                '''
            }
        }
        stage('Test') {
            steps {
                sh '''
                    export TEST_USERNAME=$TEST_CREDENTIALS_USR
                    export TEST_PASSWORD=$TEST_CREDENTIALS_PSW
                    npm run make-apt
                '''
            }
        } 
              
    }
    post{
            always {
                //Publish allure report by the test result
                allure includeProperties: false,
                 jdk: '', 
                 results: [[path: 'allure-results']],
                 reportBuildPolicy: 'ALWAYS',
            }
        }
    
}