const Discord = require("discord.js");


const client = new Discord.Client();


const config = require("./config.json");

client.on("ready", () => {
  
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  
  client.user.setActivity(`Royaume de Wael👑`);
});

client.on("guildCreate", guild => {

  console.log(`Nouvelle guilde rejoint: ${guild.name} (id: ${guild.id}). Cette guilde a ${guild.memberCount} membres!`);
  client.user.setActivity(`Contrôle ${client.guilds.size} serveurs`);
});

client.on("guildDelete", guild => {
  
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
  
  if(message.author.bot) return;
  
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  

  
  if(command === "latence") {
    
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! La latence est de ${m.createdTimestamp - message.createdTimestamp}ms. API latence est de ${Math.round(client.ping)}ms`);
  }
  
  if(command === "supprimemsg") {

const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  
  if(command === "expulse") {

    if(!message.member.roles.some(r=>["ADMIN", "Moderateur"].includes(r.name)) )
      return message.reply("Désolé,soit vous n'avez pas les permissions pour utilisez cette commande ,soit vous avez mal mentionné la personne !");
    
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Mentionné un membre valide sur ce serveur");
    if(!member.kickable) 
      return message.reply("Je ne peux pas expulser cette personne !");
    
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Aucune raison fournie";
    
    
    await member.kick(reason)
      .catch(error => message.reply(`Désolé ${message.author} Je ne pouvais pas éxpulser à cause de : ${error}`));
    message.reply(`${member.user.tag} a été expulsé(e) par ${message.author.tag} parce que: ${reason}`);

  }
  
  if(command === "ban") {
    
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Désolé,soit vous n'avez pas les permissions pour utilisez cette commande ,soit vous avez mal mentionné la personne !");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Mentionné un membre valide sur ce serveur");
    if(!member.bannable) 
      return message.reply("je ne peux pas bannir cette personne !");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Aucune raison fournie";
    
    await member.ban(reason)
      .catch(error => message.reply(`Désolé ${message.author} Je ne pouvais pas ban parce que : ${error}`));
    message.reply(`${member.user.tag} à été banni(e) par ${message.author.tag} parce que: ${reason}`);
  }
  
  if(command === "vide") {
    
    const deleteCount = parseInt(args[0], 10);
    
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Veuillez indiquer un nombre compris entre 2 et 100 pour le nombre de messages à supprimer.");
    
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Impossible de supprimer des messages à cause de: ${error}`));
  }
});

client.login('NjQxNTY5NzkyMjgwNjI1MTUy.XcQKRg.to6pDe3PwJTm1VYYGLuQhmnFz2I');
