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
                    npm ci
                     //install chromium
                    //npx playwright install firefox
                    //npx playwright install webkit

                """
            }
        }
        stage('Test') {
            steps {
                bat """
                    set PLAYWRIGHT_BROWSERS_PATH = "C:\\playwright-browsers" //to avoid downloading browsers every time
                    echo %PLAYWRIGHT_BROWSERS_PATH%
                    npx playwright
                    //testing part
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