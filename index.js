function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const bot = new Discord.Client();
const talkedRecently = new Set();
const talkedRecently2 = new Set();
const ytdl = require('ytdl-core')

const token = 'TOKEN HERE';
const ADMINID = '500456250190856202'

const PREFIX = '!deadweight ';
const PREFIX2 = '!d ';

bot.on('ready', () =>{
	console.log('deadweight is ready');
})

const directoryPath = path.join(__dirname, 'botfiles');

var servers = {}

var filecount
var error
var args
var prevauth
var deletenextmessage
var ttsmsg

bot.on('message', message=>{
	if (deletenextmessage) {
		message.delete()
		deletenextmessage = false
	}
	if (message.content.split(" ")[0] + " " == PREFIX) {
		args = message.content.substring(PREFIX.length).split(" ")
	} else {
		if (message.content.split(" ")[0] + " " == PREFIX2) {
			args = message.content.substring(PREFIX2.length).split(" ")
		}
	}
        if ((message.content.split(" ")[0] + " " == PREFIX && message.author.id != 769258493261381674) || (message.content.split(" ")[0] + " " == PREFIX2 && message.author.id != 769258493261381674)) {
		prevauth = message.author
		switch(args[0]){
			case 'asay':
				if (message.author.id == ADMINID) {
					message.delete()
					args.shift()
					message.channel.send(args.join(" "))
				} else {
					message.channel.send(prevauth + "error 2: admin command used by non-admin");
				}
				break;
			case 'say':
				message.delete()
				args.shift()
				message.channel.send(args.join(" "))
				message.channel.send("annoying message brought to you by: " + prevauth)
				break;
			case 'tts':
				message.delete()
				args.shift()
				message.channel.send(args.join(" "), {
					tts: true
				})
				deletenextmessage = true
				message.channel.send("annoying tts message brought to you by: " + prevauth + "\nmessage contents: " + args.join(" ") )
				message.channel.send()
				break;
			case 'euthanize':
				if (message.author.id == "500456250190856202") {
					message.channel.send('now i die.');
					bot.destroy();
					process.once('SIGUSR2', function () {
						gracefulShutdown(function () {
							process.kill(process.pid, 'SIGUSR2');
						});
					});
				} else {
					message.channel.send(prevauth + "error 2: admin command used by non-admin")
				}
				break
			case 'atts':
				if (message.author.id == ADMINID) {
					message.delete()
					args.shift()
					message.channel.send(args.join(" "), {
						tts: true
					})
					deletenextmessage = true
				} else {
					message.channel.send(prevauth + "error 2: admin command used by non-admin");
				}
				break
			case 'appendmemory':
				args.shift()
				fs.appendFile('mem.txt', args.join(" "), (err) => {
    				if (err) {
						message.channel.send("error 3: unidentified error: " + data)
						throw err;
					} else {
						message.channel.send("put down \"" + args.join(" ") + "\" into my memory")
					}
				});
				break;
			case 'getmemory':
				fs.readFile('mem.txt', 'utf8', function(err, data) {
					if (err) {
						message.channel.send("error 3: unidentified error: " + data)
						throw err;
					} else {
						message.channel.send(data)
					}
				});
				break;
			case 'clearmemory':
				fs.writeFile("mem.txt", " ", (err) => {
    					if (err) {
							message.channel.send("error 3: unidentified error: " + data)
							throw err;
						} else {
							message.channel.send("memory cleared")
						}
				}); 
				break;
			case 'shutdown':
				if (message.author.id == ADMINID) {
					message.channel.send('ok mr.bossman! please wait while i shut down...');
					bot.destroy();
					process.once('SIGUSR2', function () {
						gracefulShutdown(function () {
							process.kill(process.pid, 'SIGUSR2');
						});
					});
				} else {
					message.channel.send(prevauth + "error 2: admin command used by non-admin");
				}
				break;
			case 'shutoff':
				if (message.author.id == ADMINID) {
					message.channel.send('ok mr.bossman! please wait while i shut down...');
					bot.destroy();
					process.once('SIGUSR2', function () {
						gracefulShutdown(function () {
							process.kill(process.pid, 'SIGUSR2');
						});
					});
				} else {
					message.channel.send(prevauth + "error 2: admin command used by non-admin");
				}
				break;
			case 'break':
				if (message.author.id == ADMINID) {
					message.channel.send('ok mr.bossman! please wait while i shut down...');
					bot.destroy();
					process.once('SIGUSR2', function () {
						gracefulShutdown(function () {
							process.kill(process.pid, 'SIGUSR2');
						});
					});
				} else {
					message.channel.send(prevauth + "error 2: admin command used by non-admin");
				}
				break;
			case 'die':
				if (message.author.id == ADMINID) {
					message.channel.send('ok mr.bossman! please wait while i shut down...');
					bot.destroy();
					process.once('SIGUSR2', function () {
						gracefulShutdown(function () {
							process.kill(process.pid, 'SIGUSR2');
						});
					});
				} else {
					message.channel.send(prevauth + "error 2: admin command used by non-admin");
				}
				break;
			case 'help':
				message.channel.send('\"!d play\ [song link]" to have me add a song into my song queue \n \"!d skip\" to have me skip the current song \n \"!d stop\" to have me stop playing music. \n \"!d queue\" for me to tell you the songs in my song queue')
				break;
			case 'overwatchtip':
				message.channel.send(badgametips[getRandomInt(badgametips.length)])
				break;
			case 'play': 
				
				function play(connection, message) {
					var server = servers[message.guild.id]
					
					server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}))
					
					server.queue.shift()
					
					server.dispatcher.on("end", function() {
						if (server.queue[0]) {
							play(connection, message)
						} else {
							connection.disconnect
						}
					})
				}
				
				var passed = false
				if (!args[1]) {
					message.channel.send("error 4: no song link provided")
					return;
				} else if (!message.member.voiceChannel) {
					message.channel.send("error 5: user not in voice channel")
					return;
				} else {
					passed = true
				}
				if (passed) {
					if(!servers[message.guild.id]) servers[message.guild.id] = {queue: []}
					
					var server = servers[message.guild.id]
					
					server.queue.push(args[1])
					
					if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
						play(connection, message)
					})
				}
				break;
			case 'skip':
				var server = servers[message.guild.id]
				if (server.dispatcher) server.dispatcher.end();
				break;
			case 'stop':
				var server = servers[message.guild.id]
				if(message.guild.voiceConnection) {
					for (var i = server.queue.length - 1; i >= 0; i--) {
						server.queue.splice(i, 1)
					}
					
					server.dispatcher.end()
				}
				
				if(message.guild.connection) message.guild.voiceConnection.disconnect()
				break;
			case 'queue':
				message.channel.send("<" + servers[message.guild.id].queue + ">")
			}
				
	} else {
		if ((message.content.split(" ")[0] + " " == PREFIX && message.author.id == 609870094834597906) || (message.content.split(" ")[0] + " " == PREFIX2 && message.author.id == 609870094834597906)) {
			message.channel.send(prevauth + "error 1: cannot respond to self")	
		}
	}
})

bot.login(token);

var badgametips = [
	"As a Tracer, dodge.",
	"As a Tracer, spam healing voice lines to annoy your teammates.",
	"As an Ashe, teabag all widowmaker players for good measure.",
	"While playing Ashe, play country music very loudly to improve your aim.",
	"When playing Genji, rethink your choices.",
	"When playing Genji, complain that you didn\'t get nano every time you Dragonblade.",
	"Playing Hanzo makes the enemy team hate you 50% more than usual.",
	"Most Hanzo mains think their support teammates suck at all times.",
	"As Roadhog, don\'t die.",
	"As Roadhog, complain to both your supports and the enemies as well.",
	"As D.Va, drink copious amounts of mountain dew.",
	"As D.Va, use your ultimate at the worst times.",
	"As Reinhardt, charge off the map at every opportunity.",
	"When playing Reinhardt, use Earthshatter to lower the enemies shield durability.",
	"When playing Reinhardt, make sure to never put up your shield for your teammates.",
	"As Zenyatta, have a smaller hitbox by playing someone else.",
	"As Zenyatta, die to Moira.",
	"As Moira, kill Zenyattas.",
	"As Moira, steal every gold medal and POTG.",
	"As Brigitte, get nerfed every patch.",
	"As Brigitte, disappoint your team.",
	"When playing Mercy, pocket heal your other support.",
	"When playing Mercy, always try and kill people with the pistol.",
	"As Widowmaker, don\'t miss.",
	"When playing Widowmaker, switch heroes.",
	"As Baptiste, waste your immortality field as quick as you can",
	"When playing Baptiste, never heal, only deal damage.",
   	"As Lucio, Boop.",
	"When playing Lucio, screw up every wallride you can.",
	"As Ana, make sure to aim.",
	"When playing Ana, always nano boost your other support",
]
