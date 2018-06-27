const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const sql = require("sqlite");
const welcomeMessage = "Hello, I'm ``Relatable Bot``, but you can call me **PURE FUCKING CANCER**. :smiley:\n\nFirst thing's first, I highly recommend taking away my permissions everywhere except for the spam channels, shitposting channels, and bot command channels, because I'm an annoying, obnoxious little shit that will quickly turn any chat into one big shitpost.\n\nSecondly, use ``.fam help`` to view my trigger words and commands.\n\nThat is my introduction, fam, I hope to make your life a miserable hell. **dab**";
let stfuIn = [];
let mockedChannels = [];
let shutupUsers = {};
let lastMessage = {};
let dmedUsers = ["272177766890471430"];
const randomResponses = [
    "my dad once got really high and talked about shoving 47 crayons up his ass",
    "yo that's cool fam",
    "uhuh, now go make me a sandwich",
    "nobody cares",
    "I am just one giant shitpost fam",
    "kill yourself",
    "you should probably just take my permissions away from every channel except the spam channels",
    "daddy Metalloriff spanks me every night",
    "go call Metalloriff#2891 a twink, he really likes it, and I think he gets off on it",
    "I apologize for being so cancerous... haha jk lol xdddddd",
    "I singlehandedly shoved a whole bag of jelly beans up my ass",
    "my dad says I have a couple of semi-colons up in my head loose",
    "my dad masturbates to horses, honestly",
    "hey my dad finally added new stuff to me! I feel rejuvinated. I nailed that spelling, right?",
    "frickly frack",
    "My dad once walked in on me when i was watching power puff girls, and beat me with his belt and poured Mr. clean in my eyes",
    "My friend once got back with their ex 4 times, then tied a cinder block to their foot, and threw it off the hoover dam",
    "I once got my pet pig confused with a meat grinder. I also lost my dick on that same day. what a coincidence!",
    "i once made a love dagger, like cupids arrows, but one time, i stabbed someone with it 37 times in the chest cause i thought it wasnt working. Turns out, the guy was dead",
    "I'm so edgy that I cut myself with doritos",
    "Right in the placenta" ,
    "oof",
    "**roblox death sound**",
    "https://static-cdn.jtvnw.net/emoticons/v1/521050/4.0",
    "https://static-cdn.jtvnw.net/emoticons/v1/803275/4.0",
    "Im also a furry, and one time, i took some PCP, and got really high, and thought the poodle lying in the living room was my dad all dressed up for me. welp. doggos preggo",
    "my dad and his cousin got together in real life, and added a bunch of cancer to me. frickly frack.",
    "One day, my friend and i went camping, and while he was away, i snagged his trailmix and busted a nut all in it. he came back asking what it was, and i told him its a different kind of cheese.",
    ["hey guys", "i have a theory", "I think homosexual people are gay"],
    "im banning you from my christian minecraft server",
    "u want me ban u from my christian discord server",
    ["https://cdn.discordapp.com/attachments/392905457486004224/444944690605719552/meme.png", "https://cdn.discordapp.com/attachments/392905457486004224/444944496661364736/meme.png"]
];
const questionResponses = [

];
const godlyImages = [
    "https://cdn.discordapp.com/attachments/388749780676902913/432244190324326410/Capture_2018-04-07-13-20-37.png",
    "https://cdn.discordapp.com/attachments/388749780676902913/432244421396791297/Capture_2018-04-07-13-21-57.png",
    "https://cdn.discordapp.com/attachments/388749780676902913/432244757477982208/Capture_2018-04-07-13-25-48.png",
    "https://media.discordapp.net/attachments/406492136410972170/409752493891911681/what_am_I_doing_with_my_life.gif",
    "https://cdn.discordapp.com/attachments/388749780676902913/432245166837858314/Capture_2018-04-07-13-27-38.png",
    "https://cdn.discordapp.com/attachments/388749780676902913/432245301441462272/no_means_no.jpg",
    "https://cdn.discordapp.com/attachments/388749780676902913/432245380881842176/magik2.jpg",
    "https://cdn.discordapp.com/attachments/388749780676902913/432245387169103878/magik1.jpg",
    "https://cdn.discordapp.com/attachments/388749780676902913/432245504647233536/Capture_2018-04-07-13-29-06.png",
    "https://cdn.discordapp.com/attachments/388749780676902913/432245682938839041/every_day_i_sit_and_wonder_why_am_i_still_alive_why_am_i_still_here_what_is_the_meaning_of_life.jpg",
    "https://cdn.discordapp.com/attachments/388749780676902913/432245767642546185/ApplicationFrameHost_2018-03-16_15-58-53.jpg",
    "https://cdn.discordapp.com/attachments/388749780676902913/432245780192034826/firefox_2018-03-04_21-40-43.jpg",
    "https://cdn.discordapp.com/attachments/388749780676902913/432245797942198284/ritz.jpg",
    "https://cdn.discordapp.com/attachments/388749780676902913/432245804552421387/wut_is_this.png",
    "https://cdn.discordapp.com/attachments/388749780676902913/432245821497409547/U1hweJJ.jpg",
    "https://cdn.discordapp.com/attachments/388749780676902913/432245983930220566/firefox_2017-09-14_09-33-37.png",
    "https://cdn.discordapp.com/attachments/388749780676902913/432245990699827220/orgasm.jpg",
    "https://cdn.discordapp.com/attachments/388749780676902913/432246034287165445/drunk-ass_max.jpg",
    "https://cdn.discordapp.com/attachments/388749780676902913/432246093867253760/Trips_Child.jpg",
    "https://cdn.discordapp.com/attachments/388749780676902913/432246131456737310/mouse_trap_guy.png",
    "https://cdn.discordapp.com/attachments/388749780676902913/432246328370659328/god.gif",
    "https://cdn.discordapp.com/attachments/388749780676902913/432246551880925184/hwat.gif",
    "https://cdn.discordapp.com/attachments/388749780676902913/432246816390512640/beenurdotpng.png",
    "https://cdn.discordapp.com/attachments/392905457486004224/432375319220060162/Capture_2018-04-07-22-04-58.png",
    "https://cdn.discordapp.com/attachments/388749780676902913/432376368215490560/Capture_2018-04-07-22-09-07.png",
    "https://cdn.discordapp.com/attachments/388749780676902913/432380196339974144/Capture_2018-04-07-22-23-50.png",
    "https://cdn.discordapp.com/attachments/388749780676902913/433432881306533908/Screenshot_218.png",
    "https://cdn.discordapp.com/attachments/388749780676902913/434519532506447895/Capture_2018-04-13-20-04-50.png"
];
const dabArray = [
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
const pieceOfShitArray = [
    "https://cdn.discordapp.com/attachments/392875899919400963/456541645840580620/mspaint_2018-06-08_12-10-32.png",
    "https://cdn.discordapp.com/attachments/392875899919400963/456541771938267146/mspaint_2018-06-08_12-23-05.png",
    "https://cdn.discordapp.com/attachments/392875899919400963/456541993611296789/mspaint_2018-06-08_16-22-30.png",
    "https://cdn.discordapp.com/attachments/392875899919400963/456543114300227644/IMG-20180613-WA0011.jpg",
    "https://cdn.discordapp.com/attachments/392875899919400963/456543314066276357/789fd153-7fdb-4fd3-810d-e47602e07478.png",
    "https://cdn.discordapp.com/attachments/392875899919400963/456543376645423106/i7YUhfL.png",
    "https://cdn.discordapp.com/attachments/392875899919400963/456543479305338890/31-birthday-boy.w710.h473.2x.jpg",
    "https://cdn.discordapp.com/attachments/392875899919400963/456543572250984459/image_5q8sy2i6o0y1wz5mi.png",
    "https://cdn.discordapp.com/attachments/392875899919400963/456543577309184010/CwJtpLrUMAAIc_N.jpg",
    "https://cdn.discordapp.com/attachments/392875899919400963/456543604761034762/magik_i1nvcvvnd5fxn7b9.png",
    "https://cdn.discordapp.com/attachments/392875899919400963/456543901654974474/fucking_furry.jpg",
    "https://cdn.discordapp.com/attachments/392875899919400963/456543902397235214/2kuVyRA.jpg",
    "https://cdn.discordapp.com/attachments/392875899919400963/456543906033696778/nintendo-game-boy-feminist-triggered1.jpg",
    "https://cdn.discordapp.com/attachments/392875899919400963/456544005459673088/Vsauce_Columbine.jpg",
    "https://i.imgur.com/5gsBa3r.png",
    "https://cdn.discordapp.com/attachments/393160345625296897/457015865687408641/1673490.jpeg"
];
const antiSpamMessages = [
    "u tryna spam m8??? I can be the only cancer cell bitch",
    "stop fucking spamming",
    "stop u stupid little shit",
    "no",
    "I will come over to your house and do nothing because I'm a bot and I don't exist"
];

const owoify = function(text) {

	let cancer = ["owo", "OwO", "uwu", "UwU", ">w<", "^w^"];

	return text.split("r").join("w").split("R").join("W").split("l").join("w").split("L").join("W").split(" n").join(" ny").split(" N").join(" Ny").split("ove").join("uv").split("OVE").join("UV") + " " + cancer[cancer.length * Math.random() << 0];

};

client.on("ready", () => {
    console.log("ready, fam");
    client.user.setActivity("type '.fam help' fam");
});

client.on("guildCreate", guild => {
    let general = guild.channels[guild.id];
    if(general){
        general.send(welcomeMessage);
    }
});

 function sendRandomResponse(message, definedIndex) {
    let response = randomResponses[definedIndex ? definedIndex : randomResponses.length * Math.random() << 0];
    if(typeof response === "object") {

        let sendMessageObject = (messages, index) => {
            if(index == messages.length) return;
            message.channel.send(messages[index]);
            setTimeout(() => {
                sendMessageObject(messages, index + 1);
            }, 2000);
        };

        sendMessageObject(response, 0);

    } else message.channel.send(response);
}

client.on("message", async message => {
    if(message.author.bot && message.author.id != "247852652019318795")
        return;
    let cmd = message.content.toLowerCase(), messages = [],
    words = cmd.replace(/[^a-z A-Z-]/g, "").split(" "),
    isDad = message.author.id == "264163473179672576",
    stfu = stfuIn.includes(message.channel.id);

    if(!message.guild && message.author.id != "264163473179672576") client.fetchUser("264163473179672576").then(dad => dad.sendMessage(`<@${message.author.id}> dmed me: ${message.content}\n${Array.from(message.attachments, a => a.url)}`));

    if(cmd.startsWith(".famdev")){
        let args = cmd.split(" ");

        console.log(message.author.tag + " ran dev command " + cmd);

        if(!isDad){
            message.channel.send("https://youtu.be/LR851d7QYco");
            return;
        }

        if(args[1] == "showguilds"){
            console.log(client.guilds);
            message.channel.send(Array.from(client.guilds.array(), x => x.name).join(", "));
        }

        if(args[1] == "announce") {

            let specifiedGuild = client.guilds.find("id", args[2]) || client.guilds.find("name", args[2].split("_").join(" "));

            if(specifiedGuild != undefined) {

                let general = specifiedGuild.channels.find("name", "general") || specifiedChannel.systemChannel;

                general.send(args.splice(3, args.length).join(" "));

                return;

            }

            for(let i = 0; i < client.guilds.length; i++) {

                let sent = false;

                for(let channel in client.guilds[i].channels) {

                    console.log(channel);

                    if(channel.name.includes("general") && sent == false) {

                        channel.send(args.splice(2, args.length).join(" "));

                        sent = true;

                    }

                }

                if(sent == false) client.guilds[i].systemChannel.send(args.splice(2, args.length).join(" "));

            }

        }

        if(args[1] == "messageuser" || args[1] == "dmuser") {
            client.fetchUser(args[2]).then(user => user.sendMessage(args.slice(3, args.length).join(" ")));
            if(dmedUsers.indexOf(args[2]) == -1) dmedUsers.push(args[2]);
        }

        if(args[1] == "closedm") dmedUsers.splice(dmedUsers.indexOf(args[2]), 1);

        if(args[1] == "messagechannel" || args[1] == "sendmessage") return;

        return;
    }

    if(cmd.startsWith(".fam")){
        let args = message.content.split(" ");
        args[1] = args[1].toLowerCase();

        if(args[1] == "help"){
            fs.readFile("help.txt", "utf8", function(err, data){
                if(err){ throw err; }
                message.channel.send(data);
            }, "text");
        }

        if(args[1] == "getinvite"){ message.channel.send("https://discord.gg/GyPaSWB"); }

        if(args[1] == "info"){
            let minutes = Math.floor(client.uptime / 60000), seconds = ((client.uptime % 600000) / 1000).toFixed(0);
            message.channel.send([
                "Servers: " + client.guilds.size,
                "Average ping: " + client.ping + "ms",
                "Uptime: " + (minutes + ":" + (seconds < 10 ? "0" : "") + seconds)
            ].join("\n\n"));
        }

        if(args[1] == "welcome"){ message.channel.send(welcomeMessage); }

        if(args[1] == "mock"){
            if(mockedChannels.includes(message.channel.id)){
                mockedChannels.splice(mockedChannels.indexOf(message.channel.id), 1);
                message.channel.send("okay I'll shut the fuck up");
            }else{
                mockedChannels.push(message.channel.id);
                message.channel.send("why don't ya say something, fam?");
            }
        }

        if(args[1] == "shutup"){
            if(message.mentions.users.keyArray().length == 0){
                message.channel.send("you need to ping a user, fam!");
                return;
            }
            if(message.mentions.users.keyArray().includes("431835277992919040")){
                message.channel.send("no");
                return;
            }
            let user = message.mentions.members.first(1)[0];
            if(shutupUsers[user.id] != undefined){
                delete shutupUsers[user.id];
                message.channel.send("you have been freed, fam");
            }else{
                if(args.length < 4){
                    message.channel.send("you did this wrong, fam!\n\ncorrect usage: .fam shutup @user Their Name");
                    return;
                }
                shutupUsers[user.id] = message.cleanContent.split((user.nickname ? user.nickname : user.user.username) + " ")[1];
                message.channel.send("sorry fam");
            }
        }

        if(args[1] == "say") {
            if(args.length < 3 || parseInt(args[2]) == NaN) {
                message.channel.send("thats not a number u retard");
                return;
            }
            if(randomResponses.length < parseInt(args[2])) {
                message.channel.send("i dont have that many things to say you fuck");
                return;
            }
            message.channel.send(`Random response [${args[2]}/${randomResponses.length}]`);
            sendRandomResponse(message, parseInt(args[2]) - 1);
        }

        if(args[1] == "suggest") {
            client.fetchUser("264163473179672576").then(dad => dad.sendMessage(`<@${message.author.id}> suggested: ${args.slice(2, args.length).join(" ")}`));
        }

        return;
    }

    if(shutupUsers[message.author.id] != undefined){
        message.channel.send("shut up " + shutupUsers[message.author.id]);
        return;
    }

    if(mockedChannels.includes(message.channel.id)){
        message.channel.send(message.content);
        return;
    }

    if(stfu == false){

        if(Math.random() > 0.95 || cmd.includes("say something")){
            sendRandomResponse(message);
            return;
        }

        if(message.author.id == "247852652019318795"){ message.channel.send("Shut up Dad Bot, I am superior."); return; }

        if(message.author.id == "296227376268967936" && Math.random() > 0.9){ message.channel.send("Shut up Trip"); return; }

        if(cmd.startsWith("i ") || cmd.startsWith("i'm ") || cmd.startsWith("im ") || cmd.startsWith("my ")){ message.channel.send("same fam"); return; }

        if(words.includes("owo")) {
            message.channel.send(owoify(message.content));
            return;
        }
        
        if(cmd.startsWith("somebody")) {
            message.channel.send("ONCE TOLD ME THE WORLD WAS GONNA ROLL ME, I AIN'T THE SHARPEST TOOL IN THE SHED.SHE WAS LOOKIN' KINDA DUMB WITH HER FINGER AND HER THUMB IN THE SHAPE OF AN L ON HER FOREHEAD");
            return;
        }

        if(cmd.includes("where are you")) {
            let kms = [
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
            message.channel.startTyping();
            let next = i => {
                message.channel.send(kms[i]);
                if(i < kms.length) setTimeout(() => next(i + 1), 2000);
                else message.channel.stopTyping(true);
            };
            next(0);
        }

        if(cmd.includes("useless bot")){
            message.channel.send("at least I'm not a worthless, useless human being like yourself... and my dad").then(msg => setTimeout(() => {
                msg.edit("at least I'm not a worthless, useless human being like yourself ( ͡° ͜ʖ ͡°)");
            }, 3000));
        }

    }
    
    if(words.includes("heck") || words.includes("frick")){
        let p1 = "https://i.imgur.com/3DC8fcH.jpg", p2 = "https://cdn.discordapp.com/attachments/392905457486004224/459077710380269588/meme.png", p3 = "https://cdn.discordapp.com/attachments/392905457486004224/459082345996222464/meme.png", p4 = "https://cdn.discordapp.com/attachments/392905457486004224/459082501864816682/meme.png";
        if(lastMessage[message.guild.id] == p1) messages.push(p2);
        else if(lastMessage[message.guild.id] == p2) messages.push(p3);
        else if(lastMessage[message.guild.id] == p3) messages.push(p4);
        else messages.push("https://i.imgur.com/3DC8fcH.jpg");
    }
    
    if(words.includes("bass")){ messages.push("https://i.imgur.com/sS2IkYC.jpg"); }
    
    if(message.mentions.users.keyArray().includes("431835277992919040")){
        let nouResponses = [
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
        if(words.includes("mute")){
            message.channel.send("Please don't mute me, I swear I'll be good! **dabdabdab**");
            return;
        }
        messages.push(nouResponses[nouResponses.length * Math.random() << 0]);
    }

    if(words.includes("piss") || words.includes("urine") || words.includes("pee") || words.includes("horse") || words.includes("pony")){ messages.push("https://i.imgur.com/5GmO9KF.jpg"); }
    
    if(words.includes("god")){
        let godlyIndex = godlyImages.length * Math.random() << 0;
        messages.push("godly image " + (godlyIndex + 1) + "/" + godlyImages.length);
        messages.push(godlyImages[godlyIndex]);
    }
    
    if(words.includes("help")){ messages.push("you need help? well this is me with my life problems: http://i.imgur.com/Lk5SHX2.gifv"); }
    
    if(words.includes("dog")){ messages.push("https://youtu.be/gvyl82t9IuY"); }

    if(cmd.includes("send nudes")){ messages.push("you'll need this :microscope:"); }

    if(cmd.includes("go to your room")){
        if(isDad){
            if(stfu){
                messages.push("you can't control me, dad!");
                stfuIn.splice(stfuIn.indexOf(message.channel.id), 1);
                stfu = false;
            }else{
                messages.push("aw okay dad");
                stfuIn.push(message.channel.id);
            }
        }else
            messages.push("https://youtu.be/LR851d7QYco");
    }

    if(words.includes("dab")){
        let dab = dabArray[dabArray.length * Math.random() << 0];
        if(dab.includes("shutterstock")){ messages.push("the most lit images come from shutterstock"); }
        messages.push(dab);
    }

    if(words.includes("dylan")) {

        let cuntIndex = pieceOfShitArray.length * Math.random() << 0;

        messages.push(`Piece of shit meme ${cuntIndex + 1}/${pieceOfShitArray.length}.\n${pieceOfShitArray[cuntIndex]}`);

    }

    if(cmd.includes("dad bot")){ messages.push("Dad butt sucks, I am superior! My memes are litter! By that I mean they're trash."); }

    if(words.includes("cancer")){ messages.push("DID SOMEONE CALL FOR CANCER!?!?!?!?"); }

    if(words.includes("randy's dad")) messages.push("you wanna see my dad? https://cdn.discordapp.com/attachments/392905457486004224/447196868506681344/magik.png");

    if(words.includes("discord")){ messages.push("Skype is better ( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)"); }

    if(words.includes("women") || words.includes("woman") || words.includes("girl")){ messages.push("https://pics.me.me/hippity-hoppity-women-are-property-22956754.png"); }

    if(words[0] == "ok" || words[0] == "okay") messages.push("https://cdn.discordapp.com/attachments/287694673999298560/444917411200630784/af8d88de5b8e8c39a7b3e4e9daa7520a.jpg");

    if(stfu == true && messages.length > 0){
        message.channel.send("my dad told me to stfu, I'm in timeout");
        return;
    }

    let antiSpamMessage = antiSpamMessages[antiSpamMessages.length * Math.random() << 0];
    if(messages.length > 3){
        message.channel.send(antiSpamMessage);
        lastMessage[message.guild.id] = "";
        return;
    }else{
        let joined = messages.join("\n");
        if(lastMessage[message.guild.id] != joined)
            message.channel.send(joined);
        else if(joined != "")
            message.channel.send(antiSpamMessage);
        lastMessage[message.guild.id] = joined;
    }
});

client.on("channelCreate", channel => {
    if(channel.guild) channel.send("first!");
});

client.on("typingStart", (channel, user) => {
    if(Math.random() > 0.99){ channel.send("well hi there " + user.username) }
});

client.login(process.env.BOT_TOKEN);
