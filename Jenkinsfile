pipeline {
  
  agent {
    docker {
      image 'node'
    }
  }
  stages {
    stage('Clone Sources') {
      steps {
        git 'https://https://github.com/markp112/vue-3-pagemaker.git'
      }
    }
    stage('Information') {
      steps {
        sh 'node -v'
        sh 'npm -v'
      }
    }
    
    stage('Dependencies') {
      steps {
        sh 'npm install'
      }
    }
    // stage('Unit Test') {
    //   steps {
    //     sh 'npm run unit'
    //   }
    // }
    // stage('E2E Test') {
    //   steps {
    //     sh 'npm run e2e'
    //   }
    // }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Artifacts') {
      steps {
        sh 'tar -czf dist.tar.gz ./dist'
        stash 'dist.tar.gz'
        stash 'Dockerfile'
        stash 'nginx.conf'
        archiveArtifacts artifacts: 'dist.tar.gz', fingerprint: true
      }
    }
    stage('Docker Image') {
      agent {
        docker {
          image 'docker:dind'
        }
      }
      steps {
        sh 'docker -v'
        unstash 'dist.tar.gz'
        unstash 'Dockerfile'
        unstash 'nginx.conf'
        sh 'docker build -t registry.gitlab.com/markp112/pagemaker:latestgit  .'
      }
    }
    
  }
}