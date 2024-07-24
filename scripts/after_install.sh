#!/bin/bash

# navigate to app folder
cd /fp-dashboard-dev

 - aws s3 cp --recursive ./build/ s3://codepipeline-us-east-2-992243525314/fpt-Pipeline/BuildArtif/build/
sudo cp -r build/* /fp-dashboard-dev
# install dependencies
#sudo npm install
#sudo npm run build
#sudo cp -r build/* /var/www/html
#sudo cp -r build/* /var/www/html
#sudo cp -R build/ /var/www/vhosts/frontend/
#sudo npm install pm2 -g
#sudo pm2 start npm -- start