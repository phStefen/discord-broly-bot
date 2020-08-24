const search = require("yt-search");
const ytdl = require("ytdl-core-discord");

const execute = (bot,msg,args) => {
    const s = args.join(" ");
    if(!msg.member.voice.channel) return msg.reply("Entre em um Canal de Voz para Tocar uma Música");

    try {
        search(s,(err,result) => {
            console.log(result);
            if(err) throw err;
            else if(result && result.videos.length>0){
                const song = result.videos[0];
                const queue = bot.queues.get(msg.guild.id);

                msg.reply(`${song.title} Adicionada!`);

                if(queue){
                    queue.songs.push(song);
                    bot.queues.set(msg.guild.id, queue);
                }
                else{
                    playSong(bot,msg,song);
                }
            }
            else{
                return msg.reply("Não achei essa Música");
            }
        });
    } catch (e) {
        console.error(e);
    }
};

const playSong = async (bot,msg,song) => {
    let queue = bot.queues.get(msg.member.guild.id);
    if(!song){
        if(queue){
            queue.connection.disconnect();
            return bot.queues.delete(msg.member.guild.id);
        }
    }
    if(!queue){
        const conn = await msg.member.voice.channel.join();
        queue = {
            volume: 0.5,
            connection: conn,
            dispatcher: null,
            songs: [song]
        };
        bot.queues.set(msg.member.guild.id, queue);
    }
    
    queue.dispatcher = await queue.connection.play(
        await ytdl(
            song.videoId, 
            {highWaterMark: 1 << 25, filter: "audioonly"}
            ),
        {type: "opus",}
    );

    queue.dispatcher.on("finish",() => {
        queue.songs.shift();
        playSong(bot,msg,queue.songs[0]);
    });

    queue.dispatcher.on("start",() => {
        msg.channel.send(`Tocando: ${song.title}`);
    });
}

module.exports = {
    name: "pl",
    help: "Toca Música",
    execute,
    playSong,
};