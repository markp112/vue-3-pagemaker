pipeline {
  agent any 

  stages {
      stage('Stage-1 Build') {
        steps {
          echo("Stage 1 Build Started")
          sh 'docker-compose build'
        }
      }
  }

  environment {
    VERSION= "1.0.0"
  }
}