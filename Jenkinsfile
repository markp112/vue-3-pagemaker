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
          sh '''
            docker build -t pageMaker-3:${BUILD_NUMBER} . 
            docker tag pageMaker-3:${BUILD_NUMBER} pageMaker-3:latest 
          '''
        }
      }
  }

  environment {
    VERSION= "1.0.0"
  }
}