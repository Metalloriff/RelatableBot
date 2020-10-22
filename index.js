const Discord = require("discord.js");
const config = require("./data/config.json");
const { token } = require("./data/protected.json");

const client = new Discord.Client();

const chance = c => Math.random() < c / 100;
const random = arr => arr[Math.floor(Math.random() * arr.length)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const getRandomResponse = (channel, idx) => {
	const response = config.randomResponses[idx] || random(config.randomResponses);

	return response
		.replace(/<@random>/gmi, channel.members.random().toString());
};

class Commands {
	help() {
		const embed = new Discord.MessageEmbed()
			.setColor("#7289da")
			.setTitle("I have trigger words. Certain words make me all triggered and I respond. " +
				"I also have a 5% chance of randomly getting triggered, but you can relate, can't you fam?\n\nAvailable commands:");
		
		embed.addFields(...[
			{ name: ".fam help", value: "Displays this cancerous menu.", inline: false },
			{ name: ".fam mock", value: "Literal cancer, and it shouldn to exist, do not enter this command.", inline: false },
			{ name: ".fam say <number>", value: "Says a cancerous random response choice of your liking.", inline: false },
			{ name: ".fam suggest <suggestion>", value: "Sends a cancerous request to my cancerous dad for him to probably never add because he's lazy. " +
				"Unless money is involved of course. He'll pog real hard then.", inline: false },
			{ name: ".fam e6rand (CURRENTLY DISABLED)", value: "Grabs a random image from https://e621.net/ you fucking furry.", inline: false },
			{ name: ".fam e6deathwish (CURRENTLY DISABLED)", value: "Please... for the love of all memes... do not enter this. PLEASE.", inline: false }
		]);

		return embed;
	}

	mock({ channel }) {
		if (mocked.includes(channel.id)) {
			mocked.splice(mocked.indexOf(channel.id), 1);
			return "okay I'll shut the fuck up";
		}
		
		mocked.push(channel.id);
		return "why don't you say something fam? <:wellfricklyfrack:473254617006997505>";
	}

	say({ channel }, [ idx ]) {
		idx = parseInt(idx);

		return idx >= config.randomResponses || idx < 0
			? `this response doesn't exist fam!\n\nthere are a total of ${config.randomResponses.length} responses`
			: getRandomResponse(channel, idx);
	}

	async suggest({ author }, words) {
		const dad = await client.users.fetch("264163473179672576", true, true);

		await dad.send(`${author.tag} suggested "${words.join(' ')}"`);
		return "Sent to my dad, fam!";
	}

	failure() {
		return "this is either not a command or was formatted incorrectly! dumbass bitch ass mother fucker!";
	}
}

class Randy {
	commands = new Commands();

	init() {
		console.log("Ready fam!");

		setInterval(() => {
			const status = random(config.statuses);
			
			client.user.setActivity(status.name, { type: status.type });
		}, 60000);
	}

	async handleMessage(message) {
		const { content, author, guild, channel, mentions } = message;
		const lcontent = content.toLowerCase();
		const words = lcontent.split(/( |$|\.|\?|\!|,)/gmi);
		const isDad = author.id == config.dadId;
		const bruh = "<:bruh:742890895271264356>";

		if (author.id == "431835277992919040")
			return;

		if (!author.bot && content.toLowerCase().startsWith(".fam")) {
			const args = content.split(" ");
			const cmd = args.splice(0, 2)[1].toLowerCase();

			const response =
				this.commands && typeof(this.commands[cmd]) === "function"
					? await this.commands[cmd](message, args)
					: this.commands.failure();
			
			return response ? channel.send(response) : null;
		}

		if (chance(2) || words.includes("randy"))
			await message.react(client.emojis.cache.random());

		if (lcontent.includes("go to your room") && guild) {
			if (isDad) {
				if (silenced.includes(guild.id)) {
					silenced.splice(silenced.indexOf(guild.id), 1);

					await channel.send("thanks dad I'll be better");
				} else {
					silenced.push(guild.id);

					await channel.send("aw.. ok dad");
				}
			}
			else
				await channel.send("https://youtu.be/LR851d7QYco");

			return;
		}

		if (guild && silenced.includes(guild.id))
			return;
		if (mocked.includes(channel.id))
			return await channel.send(content);
		if ((/^(i |i'm|im|my|same|\^)/gmi).test(content))
			return await channel.send("same fam");
		if (lcontent.includes("shut up"))
			return await channel.send("no u " + bruh);
		if (lcontent.includes("?") && !lcontent.includes("http") && chance(50))
			return await channel.send(random([
				"iunno mang",
				"idk",
				"you tell me",
				"yes",
				"no",
				"can",
				"can't",
				"maybe",
				bruh
			]));

		if (chance(5) || lcontent.includes("say something"))
			return await channel.send(getRandomResponse());
		if (lcontent.startsWith("somebody"))
			return await channel.send(
				"ONCE TOLD ME THE WORLD WAS GONNA ROLL ME, I AIN'T THE SHARPEST TOOL IN THE SHED. " +
				"SHE WAS LOOKIN' KINDA DUMB WITH HER FINGER AND HER THUMB IN THE SHAPE OF AN L ON HER FOREHEAD"
			);
		if (lcontent.startsWith("where are you")) {
			const parts = [
				"AND OIM SO SOURRY",
				"I CANNOT SLEEP, I CANNOT DREAM TONOIT",
				"I NEED SOMEBODY AND ALWAYS",
				"THIS SICK, STRANGE DARKNESS",
				"COMES CREEPING ON SO HAUNTING EVERYTOIM",
				"AND AS I STARED I COUNTED",
				"THE WEBS FROM ALL THE SPOIDERS",
				"CATCHIGN THINGS AND EATING THEIR INSIDES",
				"LIKE INDECISION TO CALL YOOO",
				"AND HEAR YOUR VOICE OF TREASON",
				"WILL YOU COME HOME AND STOP THIS PAIN TONOIT",
				"STOP THIS PAIN TONOIT"
			];

			for (let i = 0; i < parts.length; i++) {
				await sleep(1000);

				await channel.send(parts[i]);
			}

			return;
		}

		if (words.includes("bass"))
			return await channel.send("https://i.imgur.com/sS2IkYC.jpg");
		if (mentions.has(client.user))
			return await channel.send(random(config.mentionResponses));
		if (words.includes("feet") || words.includes("beans") || words.includes("paws"))
			return await channel.send("https://cdn.discordapp.com/attachments/488151859513786388/490670600256356357/Thats_my_Fetish.png");
		if (words.includes("god") || words.includes("cursed"))
			return await channel.send(random(config.cursedImages));
		if (lcontent.includes("send nudes"))
			return await channel.send("you'll need this 🔬");
		if (words.includes("dab"))
			return await channel.send(random(config.dabs));
		if (words.includes("dylan"))
			return await channel.send(random(config.dylanMemes));
		if (words.includes("succ") || words.includes("trip"))
			return await channel.send(random(config.succMemes));
		if (words.includes("women") || words.includes("woman") || words.includes("girl"))
			return await channel.send("https://cdn.discordapp.com/attachments/287694673999298560/444917411200630784/af8d88de5b8e8c39a7b3e4e9daa7520a.jpg");
	}

	handleMessageDelete(channel) {
		// add annoying shit here
	}

	handleChannelCreate(channel) {
		try {
			if (channel.type == "text") {
				channel.send("first!");
			}
		} catch (err) {
			console.error(`Exception on handleChannelCreate: ${err}`);
		}
	}

	async handleEmojiCreate(emoji) {
		const general = emoji.guild.channels.cache.find(({ name }) => name.includes("general"));

		if (general) {
			const message = await general.send(`ooooh look at this shit new shit my guy! ${emoji} ${emoji} ${emoji}`);
			await message.react(emoji);
		}
	}
}

let randy = new Randy();
let silenced = [];
let mocked = [];

client.on("ready", () => randy.init());
client.on("message", m => randy.handleMessage(m).catch(err => console.error(`Exception on handleMessage: ${err}\nStacktrace: ${err.stackTrace}`)));
client.on("channelCreate", c => randy.handleChannelCreate(c));
client.on("emojiCreate", e => randy.handleEmojiCreate(e).catch(err => console.error(`Exception on handleEmojiCreate: ${err}\nStacktrace: ${err.stackTrace}`)));

client.login(token);