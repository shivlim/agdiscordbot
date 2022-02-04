const { Client, Intents } = require('discord.js');
const { token, rolename } = require('./config.json');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS]
});


client.once('ready', () => {
    client.guilds.cache.forEach(guild => {
        let role= guild.roles.cache.find(role => role.name === rolename);
        fs.createReadStream(path.resolve(__dirname, 'assets', 'users.csv'))
            .pipe(csv.parse({ headers: true }))
            .on('error', error => console.error(error))
            .on('data', row => {
                guild.members.fetch({cache : false})
                        .then(members=>members.find(member=>member.user.tag === row['USERNAME']))
                        .then(async (user) => {
                            if (user != null) {
                                await user.roles.add(role);
                                console.log("Added role to user " + user.user.tag)
                            } else {
                                console.log("user not found " + row['USERNAME'])
                            }
                        })
                        .catch(console.error);

            })
            .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
    });


});


client.login(token);
