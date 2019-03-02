module.exports = {
  apps: [
    {
      name: "remoted",
      script: ".production-server/server/index.js",

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: "max",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {
    production: {
      user: "andrerpena",
      host: "212.83.163.1",
      ref: "origin/master",
      repo: "git@github.com:andrerpena/remoted.git",
      path: "/root/git/remoted",
      "post-deploy":
        "npm install && npm run build && pm2 reload ecosystem.config.js --env production"
    }
  }
};
