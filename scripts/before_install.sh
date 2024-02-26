

#!/bin/bash

# navigate to app folder
cd /fprepo/fpfrontend

# install node and npm
sudo apt-get install curl
sudo curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install nodejs -y
sudo apt-get install npm -y
sudo apt install nginx -y
sudo ufw allow 'Nginx HTTP'

#rm -rf /var/www/html/*
