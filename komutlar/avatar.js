const Discord = require('discord.js');

exports.run = (client, message, params) => {

  let user = message.mentions.users.first() || message.author


    const embed = new Discord.RichEmbed()
        .setAuthor(user.tag)
        .setImage(user.avatarURL)

    message.channel.send(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['avatarım'],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: 'Avatarınızı gösterir',
  usage: 'avatar'
