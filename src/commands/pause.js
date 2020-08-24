const execute = (bot,msg,args) => {
    const queue = bot.queues.get(msg.guild.id);

    if(!queue) return msg.reply("Não tem nenhuma Música tocando");

    queue.dispatcher.pause();

    return msg.reply(`${queue.songs[0].title} Pausada!`)
}

module.exports = {
    name: "pa",
    help: "Pausa a Músiquinha",
    execute,
};