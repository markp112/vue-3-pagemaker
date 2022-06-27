pipeline {
  agent {
    dockerfile true
  }

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
        }
      }
  }
  environment {
    VERSION= "1.0.0"
    }
  }