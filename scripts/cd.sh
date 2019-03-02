#!/usr/bin/env bash
ssh root@157.230.209.56 'cd /root/git/remoted; git pull; npm i; npm run build; pm2 restart remoted'