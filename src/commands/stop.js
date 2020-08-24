const execute = (bot,msg,args) => {
    const queue = bot.queues.get(msg.guild.id);

    if(!queue) return msg.reply("Não tem nenhuma Música tocando");

    queue.songs = [];
    bot.queues.set(msg.guild.id, queue);
    queue.dispatcher.end();

    return msg.reply(`Saudades Broly...`)
}

module.exports = {
    name: "st",
    help: "Limpa a Lista de Músiquinha",
    execute,
};