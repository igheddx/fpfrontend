#!/bin/bash

# navigate to app folder
cd /fprepo/fpfrontend

# install dependencies
sudo npm install
sudo npm run build
cp -r build/* /var/www/html
npm install pm2 -g