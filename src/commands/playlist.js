const search = require("yt-search");
const ytdl = require("ytdl-core-discord");
const id = { listId: 'PLt0X8ZrznTdRLsOAZ-e38gvDD9TJ33wmE' }

const execute = (bot,msg,args) => {
    const queue = bot.queues.get(msg.guild.id);
    let s = "\n====== Lista de Músicas ======\n\n"

    if(!queue) return msg.reply("Não tem nenhuma Música tocando");
    console.log(queue.songs);
    
    queue.songs.forEach(m => {
        s+=`${m.title}\n`;
    });

    console.log(s);
    return msg.reply(s);
};

module.exports = {
    name: "li",
    help: "Mostra a Fila de Músicas",
    execute,
};