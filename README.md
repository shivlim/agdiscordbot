# agdiscordbot
Simple script to assign role to user in csv file.
Runs on latest version of node (v16.13.2). use nvm to manage it https://github.com/nvm-sh/nvm

Prerequisites:
- Create bot and add bot to server and get bot token id as described here https://discordjs.guide/preparations/setting-up-a-bot-application.html
- Update config.json with token and name of role.
- update users.csv with discordusernames of everyone you want to assign role for.

Running:
 - nvm use 16  
 - npm install
 - node index.js
