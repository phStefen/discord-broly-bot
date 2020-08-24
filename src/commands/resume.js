const execute = (bot,msg,args) => {
    const queue = bot.queues.get(msg.guild.id);

    if(!queue) return msg.reply("Não tem nenhuma Música tocando");

    queue.dispatcher.resume();

    return msg.reply(`${queue.songs[0].title} Resumida!`)
}

module.exports = {
    name: "re",
    help: "Resume a Músiquinha",
    execute,
};