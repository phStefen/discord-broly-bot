const execute = (bot,msg,args) => {
    const queue = bot.queues.get(msg.guild.id);
    if(!queue) return msg.reply("Não tem nenhuma Música tocando");
    
    var tocando = queue.songs[0];
    queue.songs.shift();
    queue.songs = shuffle(queue.songs);
    queue.songs.splice(0, 0, tocando);
    bot.queues.set(msg.guild.id, queue);
    
    msg.reply("Músicas Randomizadas!");
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
    name: "sh",
    help: "Randomiza a Músiquinha",
    execute,
};