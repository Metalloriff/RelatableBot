from bs4 import BeautifulSoup
import requests
import discord
import random
import time
import os
import re

client = discord.Client()

mockedchannels = []
shutted = {}
silence = []
randresponses = open("random responses.txt").read().split("\n")
dad = "264163473179672576"
heccsandfriccs = ("https://i.imgur.com/3DC8fcH.jpg", "https://cdn.discordapp.com/attachments/392905457486004224/459077710380269588/meme.png", "https://cdn.discordapp.com/attachments/392905457486004224/459082345996222464/meme.png", "https://cdn.discordapp.com/attachments/392905457486004224/459082501864816682/meme.png")
lastheccorfricc = ""
godlyimages = open("godly images.txt").read().split("\n")
dab = open("dabs.txt").read().split("\n")
shitarray = open("shit array.txt").read().split("\n")
succmemes = open("succ memes.txt").read().split("\n")

def chance(p):
	return random.random() < (p / 100)

def getrandomimagefrom(source):
	try:
		if source == "e621":
			req = requests.get("https://e621.net/post/random", headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36 OPR/54.0.2952.71"})
			site = BeautifulSoup(req.text, "lxml")

			for link in site.find_all("a"):
				if "Download" in link:
					return link.get("href") + "\nSource: <" + req.url + ">"
			return "Failed to fetch random image from e621!"
	except:
		return "Failed to fetch random image from " + source + "!"

@client.event
async def on_ready():
	print("ready fam")
	await client.change_presence(game = discord.Game(name = "naughty videos. Don't tell my dad.", type = 3))

async def helpmenu():
	embed = discord.Embed(
		title = "Help Me Dad",
		description = "I have trigger words. Certain words make me all triggered and I respond. I also have a 5%% chance of randomly getting triggered, but you can relate, can't you fam?\n\nI also have commands, which are the following:",
		colour = 0x7289da
	)

	embed.add_field(name = ".fam help", value = "Displays this cancerous menu.")
	embed.add_field(name = ".fam getinvite", value = "Gives the link to dad's cancerous server.")
	embed.add_field(name = ".fam mock", value = "Literal cancer, and it should not exist, do not enter this command.")
	embed.add_field(name = ".fam shutup <user name or user id> <name>", value = "Says 'shut up <name>' every time <user> says something.")
	embed.add_field(name = ".fam say <which>", value = "Says one of my cancerous random responses of your choice.")
	embed.add_field(name = ".fam suggest <suggestion>", value = "Sends the rest of your cancerous message to my dad as a suggestion for him to consider and probably never add because he's a lazy piece of shit.")
	embed.add_field(name = ".fam fetchuser <user id>", value = "Fetches a user's info by their ID. Was a simple embed test my dad made.")
	embed.add_field(name = ".fam e6rand", value = "Grabs a random image from https://e621.net/ you fucking furry.")

	embed.add_field(name = "", value = "If you want to invite me to join your fam elsewhere, give your fam this link, fam.\nhttps://discordapp.com/api/oauth2/authorize?client_id=431835277992919040&permissions=604097600&scope=bot")

	embed.add_field(name = "", value = "If you need any help or have any cancerous suggestions, talk to dad, Metalloriff#2891, or use the suggest command.")

	my = await client.get_user_info(dad)

	embed.set_footer(
		text = "Developed by " + my.name + "#" + my.discriminator,
		icon_url = my.avatar_url
	)

	return embed

@client.event
async def on_message(message):
	isdad = message.author.id == dad
	msg = message.content.lower()
	words = re.sub("[^A-Z a-z]", "", msg).split(" ")

	if message.author.id == "431835277992919040":
		return
	
	if not message.server and message.author.id != dad:
		await client.send_message(await client.get_user_info(dad), message.author.name + " (" + message.author.id + ") slid into my DM's with: " + message.content)
	
	if msg.startswith(".famdev"):
		if not isdad:
			return

		args = message.content.split(" ")
		cmd = args[1].lower()

		if cmd == "showguilds":
			serverstr = []
			for server in client.servers:
				serverstr.append(server.name)
			await client.send_message(message.channel, ", ".join(serverstr))

		elif cmd == "dmuser":
			user = await client.get_user_info(args[2])
			try:
				await client.send_message(user, " ".join(args[3:]))
				await client.send_message(message.channel, "Slid into " + user.name + "'s DMs, fam!")
			except:
				await client.send_message(message.channel, "Failed to DM this user, fam!")

		elif cmd == "messagechannel":
			try:
				await client.send_message(client.get_channel(args[2]), " ".join(args[3:]))
				await client.send_message(message.channel, "They won't know what him 'em, fam! <:wellfricklyfrack:473254617006997505>")
			except:
				await client.send_message(message.channel, "Failed to message this channel, fam!")
		
		elif cmd == "eval":
			try:
				await client.send_message(message.channel, str(eval(" ".join(args[2:]))))
			except:
				await client.send_message(message.channel, "Failed, fam!")

		else:
			await client.send_message(message.channel, "Available commands: showguilds, dmuser, messagechannel, eval")
		
		return
	
	if msg.startswith(".fam"):
		args = message.content.split(" ")
		cmd = args[1].lower()

		if cmd == "help":
			await client.send_message(message.channel, embed = await helpmenu())

		elif cmd == "getinvite":
			await client.send_message(message.channel, "https://discord.gg/GyPaSWB")
			
		elif cmd == "mock":
			if message.channel.id in mockedchannels:
				mockedchannels.remove(message.channel.id)
				await client.send_message(message.channel, "okay I'll shut the fuck up")
			else:
				mockedchannels.append(message.channel.id)
				await client.send_message(message.channel, "why don't you say something, fam? <:wellfricklyfrack:473254617006997505>")
		
		elif cmd == "shutup":
			if args[2] in shutted:
				shutted.pop(args[2], None)
				await client.send_message(message.channel, "you have been freed, fam")
			else:
				if len(args) < 4:
					await client.send_message(message.channel, "you did it wrong, fam!\n\ncorrect usage: .fam shutup <user id or user name> <text to say after shut up>")
				
				shutted[args[2]] = " ".join(args[3:])
				await client.send_message(message.channel, "sorry fam")

		elif cmd == "say":
			i = 0
			try:
				i = int(args[2])
			except:
				await client.send_message(message.channel, "thats not a number u retard")
			if len(randresponses) < i:
				await client.send_message(message.channel, "I don't have that many random responses")
			await client.send_message(message.channel, randresponses[i])

		elif cmd == "suggest":
			daduser = await client.get_user_info(dad)
			await client.send_message(daduser, message.author.mention + " suggested: '" + " ".join(args[3:]) + "' in <#" + message.channel.id + ">")
			await client.send_message(message.channel, "Sent to my dad, fam!")
		
		elif cmd == "fetchuser":
			try:
				user = await client.get_user_info(args[2])
				embed = discord.Embed(
					title = user.name + "#" + user.discriminator,
					timestamp = user.created_at,
					description = "Bot: " + str(user.bot)
				)
				embed.set_image(url = user.avatar_url)

				await client.send_message(message.channel, embed = embed)
			except:
				await client.send_message(message.channel, "Failed to fetch this user, fam!")
		
		elif cmd == "e6rand":
			await client.send_message(message.channel, getrandomimagefrom("e621"))

		else:
			await client.send_message(message.channel, "this is not a valid command! type `.fam help` to view my commands")
		
		return
	
	if chance(2) or "randy" in msg:
		await client.add_reaction(message, random.choice(list(client.get_all_emojis())))
	
	if message.server != None and message.server.id in silence:
		if "go to your room" in msg and isdad:
			silence.remove(message.server.id)
			return await client.send_message(message.channel, "no I'm coming out of the closet")
		return
	elif "go to your room" in msg:
		if isdad:
			silence.append(message.server.id)
			return await client.send_message(message.channel, "aw ok dad")
		else:
			return await client.send_message(message.channel, "https://youtu.be/LR851d7QYco")
	
	if message.channel.id in mockedchannels:
		return await client.send_message(message.channel, message.content)
	
	if msg.startswith(("i ", "i'm", "im", "my ", "same", "^")):
		return await client.send_message(message.channel, "same fam " + random.choice(("<:wellfricklyfrack:473254617006997505>", "<:samefam:433664866222604344>", "<:heythatsprettynate:448208498250088448>")))
	
	if "?" in msg and chance(50):
		return await client.send_message(message.channel, random.choice((
			"I don't know you tell me",
			"yes",
			"no",
			"can",
			"can't",
			"maybe"
		)))
	
	if "shut up" in msg:
		return await client.send_message(message.channel, "no u")
	
	if message.author.id in shutted:
		return await client.send_message(message.channel, "shut up " + shutted[message.author.id])
	elif message.author.name in shutted:
		return await client.send_message(message.channel, "shut up " + shutted[message.author.name])
	
	if chance(5) or "say something" in msg:
		return await client.send_message(message.channel, random.choice(randresponses))
	
	if message.author.id == "247852652019318795" and chance(50):
		return await client.send_message(message.channel, "shut up dad butt I am superior")
	
	if msg.startswith("somebody"):
		return await client.send_message(message.channel, "ONCE TOLD ME THE WORLD WAS GONNA ROLL ME, I AIN'T THE SHARPEST TOOL IN THE SHED.SHE WAS LOOKIN' KINDA DUMB WITH HER FINGER AND HER THUMB IN THE SHAPE OF AN L ON HER FOREHEAD")
	
	if "where are you" in msg:
		return await client.send_message(message.channel, "AND OIM SO SOURRY\nI CANNOT SLEEP, I CANNOT DREAM TONOIT\nI NEED SOMEBODY AND ALWAYS\nTHIS SICK, STRANGE DARKNESS\nCOMES CREEPING ON SO HAUNTING EVERYTOIM\nAND AS I STARED I COUNTED\nTHE WEBS FROM ALL THE SPOIDERS\nCATCHIGN THINGS AND EATING THEIR INSIDES\nLIKE INDECISION TO CALL YOOO\nAND HEAR YOUR VOICE OF TREASON\nWILL YOU COME HOME AND STOP THIS PAIN TONOIT\nSTOP THIS PAIN TONOIT")
	
	if "useless bot" in msg:
		sent = await client.send_message(message.channel, "at least I'm not a worthless, useless human being like yourself... and my dad")
		time.sleep(3)
		return await client.edit_message(sent, "at least I'm not a worthless, useless human being like yourself ( ͡° ͜ʖ ͡°)")
	
	if "heck" in msg or "frick" in msg or "hecc" in msg or "fricc" in msg:
		if lastheccorfricc == heccsandfriccs[0]:
			await client.send_message(message.channel, heccsandfriccs[1])
		elif lastheccorfricc == heccsandfriccs[1]:
			await client.send_message(message.channel, heccsandfriccs[2])
		elif lastheccorfricc == heccsandfriccs[2]:
			await client.send_message(message.channel, heccsandfriccs[3])
		else:
			await client.send_message(message.channel, heccsandfriccs[0])
		return
	
	if "bass" in words:
		return await client.send_message(message.channel, "https://i.imgur.com/sS2IkYC.jpg")
	
	if client.user.mentioned_in(message):
		return await client.send_message(message.channel, random.choice((
			"no u",
			"you wanna ping me again you stupid cunt?",
			"fuck off",
			"heck off",
			"<:wellfricklyfrack:473254617006997505>",
			"hey fam",
			"do it again i dare u",
			"wut do u want",
			"can u dont",
			"shouldnt u couldnt",
			"*heavy digital breathing*",
			message.author.mention,
			"OwO what's this? *notices ping*",
			"wana fite m8???",
			message.author.avatar_url,
			"@lowercaseletters",
			"go away lowercase",
			"<@454465635972284428>"
		)))
	
	if "piss" in words or "urine" in words or "pee" in words or "horse" in words or "pony" in words:
		return await client.send_message(message.channel, "https://i.imgur.com/5GmO9KF.jpg")
	
	if "god" in words:
		rand = random.choice(godlyimages)
		await client.send_message(message.channel, "godly image " + str(godlyimages.index(rand) + 1) + " of " + str(len(godlyimages)))
		return await client.send_message(message.channel, rand)
	
	if "send nudes" in msg:
		return await client.send_message(message.channel, "you'll need this :microscope:")
	
	if "go to your room" in msg:
		if isdad:
			if message.server.id in silence:
				silence.remove(message.server.id)
			else:
				silence.append(message.server.id)
		else:
			await client.send_message(message.channel, "https://youtu.be/LR851d7QYco")
		return
	
	if "dab" in words:
		rand = random.choice(dab)
		if "shutterstock" in rand:
			await client.send_message(message.channel, "the most lit images come from shutterstock")
		return await client.send_message(message.channel, rand)
	
	if "dylan" in words:
		rand = random.choice(shitarray)
		return await client.send_message(message.channel, rand)
	
	if "dad bot" in msg:
		return await client.send_message(message.channel, "dad butt sux! am superior!")
	
	if "discord" in words:
		return await client.send_message(message.channel, "Skype is better. <:KappaStretch:456582483027296256> <:KappaStretch:456582483027296256> <:KappaStretch:456582483027296256>")
	
	if "women" in words or "woman" in words or "girl" in words:
		return await client.send_message(message.channel, "https://cdn.discordapp.com/attachments/287694673999298560/444917411200630784/af8d88de5b8e8c39a7b3e4e9daa7520a.jpg")
	
	if "trip" in words:
		return await client.send_message(message.channel, random.choice(succmemes))
	
@client.event
async def on_message_delete(message):
	if chance(5):
		await client.send_message(message.channel, message.author.mention + " I saw that!")

@client.event
async def on_channel_create(channel):
	if not channel.is_private:
		await client.send_message(channel, "first!")

@client.event
async def on_member_join(member):
	await client.send_message(member.server, "hey my famlet! " + member.name + "!")

@client.event
async def on_member_remove(member):
	await client.send_message(member.server, "bye fuck you " + member.mention)

@client.event
async def on_member_ban(member):
	await client.send_message(member.server, member.name + " got toasted! <:flaminhot:475767990885810187>")

@client.event
async def on_typing(channel, user, when):
	if chance(2):
		await client.send_message(channel, "well hi there " + user.name)

client.run(os.getenv("BOT_TOKEN"))