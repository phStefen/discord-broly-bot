const search = require("yt-search");
const ytdl = require("ytdl-core-discord");
const id = { listId: 'PLt0X8ZrznTdRLsOAZ-e38gvDD9TJ33wmE' }

const execute = (bot,msg,args) => {
    if(!msg.member.voice.channel) return msg.reply("Entre em um Canal de Voz para Tocar uma Música");

    try {
        search(id,(err,result) => {
            if(err) throw err;
            else if(result){
                msg.reply(`Tocando Weaboobotgirl's worldwide hits!`);
                const queue = bot.queues.get(msg.guild.id);
                let videos = result.videos;
                videos = shuffle(videos);

                if(queue){
                    videos.forEach(v => {queue.songs.push(v);});
                    bot.queues.set(msg.guild.id, queue);
                }

                else playSong(bot,msg,videos);
            }
            else{
                return msg.reply("Não achei essa Playlist");
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
            songs: [song[0]],
        };
        bot.queues.set(msg.member.guild.id, queue);
    }
    
    queue.dispatcher = await queue.connection.play(
        await ytdl(
            song[0].videoId, 
            {highWaterMark: 1 << 25, filter: "audioonly"}
            ),
        {type: "opus",}
    );

    queue.dispatcher.on("finish",() => {
        queue.songs.shift();
        playSong(bot,msg,queue.songs[0]);
    });

    queue.dispatcher.on("start",() => {
        msg.channel.send(`Tocando: ${queue.songs[0].title}`);
    });

    song.shift();
    song.forEach(v => {queue.songs.push(v);});
    bot.queues.set(msg.guild.id, queue);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

module.exports = {
    name: "amds",
    help: "Playlist das Músicas da AMDS",
    execute,
};