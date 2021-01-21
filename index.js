const {
    Client,
    Collection
} = require("discord.js");
const {
    config
} = require("dotenv");

const client = new Client({
    disableEveryone: true
})

client.commands = new Collection();
client.aliases = new Collection();

config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`bot is on`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "being updated not working fully",
            type: "STREAMING"
        }
    });
})
client.on('guildMemberAdd', member => { 
    const channel = member.guild.channels.cache.find(ch => ch.name === 'Joins');  
    if (!channel) return;  
    channel.send(` ${member}`);
    });


client.on("message", async message => {
    const prefix = "!";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    console.log()
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);



});

client.login("NzU5MzM5ODczMjQ0MTUxODE4.X28EXQ.qRTGrb31caKlhM8Sdkhy4Eu_q_A");
