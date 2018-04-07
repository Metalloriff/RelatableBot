const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const sql = require("sqlite");

client.on("ready", () => {
    console.log("ready, fam");
    client.user.setActivity("type '.fam help' fam");
});

client.on("message", async message => {
    if(message.author.bot && message.author.id != "247852652019318795")
        return;
    var cmd = message.content.toLocaleLowerCase(), messages = new Array(), isDad = message.author.id == "264163473179672576";

    if(cmd.startsWith(".famdev")){
        var args = cmd.split(" ");

        console.log(message.author.tag + " ran dev command " + cmd);

        if(!isDad){
            message.channel.send("https://youtu.be/LR851d7QYco");
            return;
        }

        if(args[1] == "showguilds"){
            console.log(client.guilds);
            message.channel.send(Array.from(client.guilds.array(), x => x.name).join(", "));
        }

        return;
    }

    if(cmd.startsWith(".fam")){
        var args = cmd.split(" ");

        if(args[1] == "help"){
            fs.readFile("help.txt", "utf8", function(err, data){
                if(err){ throw err; }
                message.channel.send(data);
            }, "text");
        }

        if(args[1] == "getinvite"){ message.channel.send("https://discord.gg/GyPaSWB"); }

        if(args[1] == "info"){
            var minutes = Math.floor(client.uptime / 60000), seconds = ((client.uptime % 600000) / 1000).toFixed(0);
            message.channel.send([
                "Servers: " + client.guilds.size,
                "Average ping: " + client.ping + "ms",
                "Uptime: " + (minutes + ":" + (seconds < 10 ? "0" : "") + seconds)
            ].join("\n\n"));
        }

        return;
    }

    if(Math.random() > 0.95){
        var responses = [
            "I once got really high and talked about shoving 47 crayons up my ass",
            "yo that's cool fam",
            "uhuh, now go make me a sandwich",
            "nobody cares",
            "I am just one giant shitpost fam",
            "kill yourself",
            "you should probably just take my permissions away from every channel except the spam channels",
            "daddy Metalloriff spanks me every night",
            "go call Metalloriff#2891 a twink, he really likes it, and I think he gets off on it",
            "I apologize for being so cancerous... haha jk lol xdddddd"
        ];
        message.channel.send(responses[responses.length * Math.random() << 0]);
        return;
    }

    if(message.author.id == "247852652019318795"){ message.channel.send("Shut up Dad Bot, I am superior."); return; }

    if(message.author.id == "272177766890471430" && Math.random() > 0.9){ message.channel.send("Shut up Dylan"); return; }

    if(message.author.id == "296227376268967936" && Math.random() > 0.9){ message.channel.send("Shut up Trip"); return; }

    if(cmd.startsWith("i ") || cmd.startsWith("i'm ") || cmd.startsWith("im ")){ message.channel.send("same fam"); return; }
    
    if(cmd.includes("heck") || cmd.includes("frick")){ messages.push("https://i.imgur.com/3DC8fcH.jpg"); }
    
    if(cmd.includes("bass")){ messages.push("https://i.imgur.com/sS2IkYC.jpg"); }
    
    if(message.attachments.keyArray().length > 0){ messages.push("#n3rds-random"); }
    
    if(message.mentions.users.keyArray().includes("431835277992919040")){
        var nouResponses = [
            "no u",
            "you wanna ping me again you stupid cunt?",
            "fuck off",
            "don't ping me",
            "hey fam",
            "wut do u want",
            "can u don't",
            "**heavy digital breathing**",
            "@" + message.author.tag,
            "OwO what's this? **notices ping**",
            "wanna fite m8???"
        ];
        messages.push(nouResponses[nouResponses.length * Math.random() << 0]);
    }

    if(cmd.includes("piss") || cmd.includes("urine") || cmd.includes("pee") || cmd.includes("horse") || cmd.includes("pony")){ messages.push("https://i.imgur.com/5GmO9KF.jpg"); }
    
    if(cmd.includes("god")){ messages.push("https://media.discordapp.net/attachments/406492136410972170/409752493891911681/what_am_I_doing_with_my_life.gif"); }
    
    if(cmd.includes("help")){ messages.push("you need help? well this is me with my life problems: http://i.imgur.com/Lk5SHX2.gifv"); }

    if(cmd.includes("dylan")){ messages.push("did somebody say Dylan??? https://i.imgur.com/54qSyDL.png"); }
    
    if(cmd.includes("dog")){ messages.push("https://youtu.be/gvyl82t9IuY"); }

    if(cmd.includes("send nudes")){ messages.push("you'll need this :microscope:"); }

    if(cmd == "stfu" || cmd == "shut" || cmd.includes("shut up") || cmd.includes("shut the fuck up") || cmd.includes("gay") || cmd.includes("kys")){
        if(isDad)
            messages.push("aw okay dad");
        else
            messages.push("no u");
    }

    if(cmd.includes("dab")){
        var dabArray = [
            "http://media3.s-nbcnews.com/i/newscms/2016_05/964556/betty-white-dab-today-tease-160207_288cb9587f95446b9a1fdfacaf1cbbdc.jpg",
            "https://thumb1.shutterstock.com/display_pic_with_logo/982847/529621960/stock-photo-guy-making-dab-529621960.jpg",
            "https://thumb1.shutterstock.com/display_pic_with_logo/5568/545013979/stock-photo-guy-making-dab-portrait-in-studio-isolated-on-white-background-545013979.jpg",
            "https://thumb9.shutterstock.com/display_pic_with_logo/1457387/576988528/stock-photo-photo-of-a-lady-dabbing-wearing-a-denim-shirt-in-a-white-background-576988528.jpg",
            "https://thumb9.shutterstock.com/display_pic_with_logo/186979858/1059886088/stock-vector-dabbing-unicorn-with-stars-1059886088.jpg",
            "https://thumb9.shutterstock.com/display_pic_with_logo/2187713/558930085/stock-photo-guy-making-dab-dance-558930085.jpg",
            "https://thumb1.shutterstock.com/display_pic_with_logo/516562/537941173/stock-photo-santa-claus-dab-dabbing-isolated-on-white-background-537941173.jpg",
            "https://thumb1.shutterstock.com/display_pic_with_logo/982847/532110253/stock-photo-guy-making-dab-532110253.jpg",
            "https://thumb1.shutterstock.com/display_pic_with_logo/189250772/776509873/stock-photo-father-and-daughter-doing-dab-on-the-pier-776509873.jpg",
            "https://thumb1.shutterstock.com/display_pic_with_logo/1237180/696084196/stock-photo-senior-and-young-woman-making-dab-dance-outdoors-by-sea-pier-696084196.jpg",
            "https://thumb1.shutterstock.com/display_pic_with_logo/170141892/728777236/stock-photo-young-man-makes-a-dab-or-flex-it-s-dance-move-on-white-background-728777236.jpg",
            "https://cdn.discordapp.com/attachments/323274833871896576/431971048171372544/Cam-dab-students-04-24-16.png",
            "https://cdn.discordapp.com/attachments/323274833871896576/432031505280401408/0fyfv7bu6pl01.png"
        ];
        var dab = dabArray[dabArray.length * Math.random() << 0];
        if(dab.includes("shutterstock")){ messages.push("the most lit images come from shutterstock"); }
        messages.push(dab);
    }

    if(cmd.includes("dad bot")){ messages.push("Dad butt sucks, I am superior! My memes are litter! By that I mean they're trash."); }

    if(cmd.includes("cancer")){ messages.push("DID SOMEONE CALL FOR CANCER!?!?!?!?"); }

    if(messages.length > 3){
        message.channel.send("u tryna spam m8??? I can be the only cancer cell bitch");
        return;
    }else
        message.channel.send(messages.join("\n"));
});

client.on("channelCreate", channel => {
    channel.send("first!");
});

client.on("typingStart", (channel, user) => {
    if(Math.random() > 0.95){ channel.send("well hi there " + user.username) }
});

client.login(process.env.BOT_TOKEN);