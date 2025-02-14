pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18'  // Use the configured Node.js version
    }

    environment {
        CI = 'true'  // Set environment variable for CI
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/VikasSangwan21/playwrightJS.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npm run test:chromeCI'
            }
        }

        stage('Publish Playwright Report') {
            steps {
                publishHTML (target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}
