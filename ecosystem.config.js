module.exports = {
  apps: [
    {
      name: "remoted",
      script: ".production-server/server/index.js",

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 1,
      autorestart: true,
      watch: true
    }
  ]
};
