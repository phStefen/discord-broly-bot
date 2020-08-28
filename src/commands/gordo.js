const execute = (bot,msg,args) => {
    return msg.channel.send({files: ["https://media.discordapp.net/attachments/627238645249867778/747932994047836312/EgKLZEbWoAAhqij.png"]})
};

module.exports = {
    name: "reza",
    help: "Reza diária para o Broly",
    execute,
}