const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message, args) => {

  if (!message.guild) {
  const embed = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı :warning:', '`sustur` komutunu özel mesajlarda kullanamazsın.')
  return message.author.send({embed}); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  client.muteReason = reason;
  client.muteAuth = message.author;
  let user = message.mentions.users.first();
  let modlog = guild.channels.find('name', 'ceza-takip');
  if (!modlog) return message.reply('`ceza-takip` kanalını bulamıyorum.');
  if (message.mentions.users.size < 1) return message.reply('Susturmak istediğin kişiyi etiketlemelisin.').catch(console.error);
  if (reason.length < 1) return message.reply('Susturma sebebini yazmalısın.');
  message.react('✅');
  message.guild.channels.filter(s => s.type === 'text').forEach(s => {
  s.overwritePermissions(user, {
  SEND_MESSAGES: false,
  ADD_REACTIONS: false
})
})

if (!message.guild.member(user).kickable) return message.reply("Yetkilileri susturamam.").then(async msg => {
  await message.clearReactions();
  message.react('❌');
  message.channel.overwritePermissions(user, {
    SEND_MESSAGES: null
  })
});
  const embed = new Discord.RichEmbed()
    .setColor("ff0000")
    .setTimestamp()
    .addField('Eylem:', 'Susturma')
    .addField('Kullanıcı:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Yetkili:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Sebep', reason);
  return guild.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['mute', 'adminsustur'],
  permLevel: 2
};

exports.help = {
  name: 'sustur',
  description: 'Eğer bir yetkili iseniz istediğiniz kişiyi susturur.',
  usage: 'sustur <kullanıcı> <sebep>'
};
