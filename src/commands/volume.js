const execute = (bot,msg,args) => {
    const queue = bot.queues.get(msg.guild.id);
    if(!queue) return msg.reply("Não tem nenhuma Música tocando");

    const vol = Number(args);
    if(isNaN(vol) || vol < 0 || vol > 10) return msg.reply("Força Inválida")

    queue.dispatcher.setVolume(vol/10);
    queue.volume = vol;
    bot.queues.set(msg.guild.id,queue);

    msg.reply(`Estou usando ${vol*10}% de meu Poder`)
}

module.exports = {
    name: "vol",
    help: "Ajusta a Força do Broly",
    execute,
};