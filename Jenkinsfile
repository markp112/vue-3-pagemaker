pipeline {
  agent any

  stages {

    stage('Initialize'){
        def dockerHome = tool 'myDocker'
        env.PATH = "${dockerHome}/bin:${env.PATH}"
    }

      stage('checkout') {
        steps{
          echo "Checking out source code"
          checkout scm
        }
      }

      stage('Stage-1 Build') {
        steps {
          echo "Starting Build...."
          script {
            dockerImage = docker.build registry + ":$BUILD_NUMBER"
          }
        }
      }
  }
  environment {
    VERSION= "1.0.0"
    registry = "markp112/jenkinsbuild"
    registryCedential="dockerhub"
    dockerImage =  ''
    }
  }