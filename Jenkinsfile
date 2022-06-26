pipeline {
  agent any 

  stages {
      stage('checkout') {
        echo "Checking out source code"
        checkout scm
      }

      stage('Stage-" Build') {
        steps {
          echo "Starting Build....")
          sh 'docker-compose build'
        }
      }
  }

  environment {
    VERSION= "1.0.0"
  }
}