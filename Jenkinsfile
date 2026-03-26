pipeline{
    agent any
    tools {
        nodejs  'node25' //node js testconfig named node25
        allure  'allure' //jenkins Tool configuration named allure
        git     'Git252'
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
                bat """
                    set -eu
                    npm ci
                    npx playwright install --with-deps
                """
            }
        }
        stage('Test') {
            steps {
                bat """
                    set TEST_USERNAME=%TEST_CREDENTIALS_USR%
                    set TEST_PASSWORD=%TEST_CREDENTIALS_PSW%
                    npm run make-apt
                """
            }
        }             
    }
    post{
            always {
                //Publish allure report by the test result
                allure includeProperties: false,
                 jdk: '', 
                 results: [[path: 'allure-results']],
                 reportBuildPolicy: 'ALWAYS'
            }
    }   
}