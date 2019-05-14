module.exports = {
  apps: [{
    name: 'Baseball2019',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-3-19-14-165.us-east-2.compute.amazonaws.com',
      key: '~/Desktop/Main/Coding-Stuff/Baseball-Statistics-WebApp-Stuff/Baseball2019.pem',
      ref: 'origin/master',
      repo: 'https://github.com/Smoota22/Baseball2019.git',
      path: '/home/ubuntu/Baseball2019',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}