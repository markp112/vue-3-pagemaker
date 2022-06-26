pipeline {
  agent any 

  stages {
      stage('checkout') {
        steps{
          echo "Checking out source code"
          checkout scm
        }
      }

      stage('Stage-1 Build') {
        steps {
          echo "Starting Build...."
          sh 'docker-compose build'
        }
      }
  }

  environment {
    VERSION= "1.0.0"
  }
}