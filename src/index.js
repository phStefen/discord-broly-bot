const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

// Configurações Padrões do bot (Token)
dotenv.config();

// É o bot
const bot = new Discord.Client();
// Coleção dos Comandos do Bot
bot.commands = new Discord.Collection();
// Lista de Músicas
bot.queues = new Map();

// Arquivos dos Comandos
const commandFiles = fs
    .readdirSync(path.join(__dirname,"/commands"))
    .filter((filename) => filename.endsWith(".js"));
// Setar os comandos
for(var filename of commandFiles){
    const command = require(`./commands/${filename}`);
    bot.commands.set(command.name,command);
}

// Deixar o BOT online
bot.login(process.env.TOKEN);

// Quando o bot ta Online
bot.on("ready",() => {
    console.log(`Estou Conectado como ${bot.user.username}`)
});

// Quando receber mensagem
bot.on("message", (msg) => {
    if(!msg.content.startsWith(process.env.PREFIX || msg.author.bot)) return;

    // Tira o Prefixo da mensagem recebida e recebe o comando
    const args = msg.content.slice(process.env.PREFIX.length).split(" ");
    const command = args.shift();

    //Executa o comando que foi pego da mensagem
    try{
        bot.commands.get(command).execute(bot,msg,args);
    } catch(e){
        return msg.reply("Comando Inválido\n Erro: " + e);
    }
})