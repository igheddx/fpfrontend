#!/bin/bash

# navigate to app folder
cd /fprepo/fpfrontend

# install dependencies
sudo npm install
sudo npm run build
sudo cp -r build/* /var/www/html
sudo npm install pm2 -g
sudo pm2 start npm -- start