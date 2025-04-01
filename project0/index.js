/*npm i telegraf  go to the documentation of npm telegraf
go to the telegram and search botfather it help you to get bot tocken which helps the telegram that who own this bot
start chating
Chandrashekhar, [17-07-2024 12:41]
/start

BotFather, [17-07-2024 12:41]
I can help you create and manage Telegram bots. If you're new to the Bot API, please see the manual (https://core.telegram.org/bots).
You can control me by sending these commands:
/newbot - create a new bot
/mybots - edit your bots
Edit Bots
/setname - change a bot's name
/setdescription - change bot description
/setabouttext - change bot about info
/setuserpic - change bot profile photo
/setcommands - change the list of commands
/deletebot - delete a bot

Bot Settings
/token - generate authorization token
/revoke - revoke bot access token
/setinline - toggle inline mode (https://core.telegram.org/bots/inline)
/setinlinegeo - toggle inline location requests (https://core.telegram.org/bots/inline#location-based-results)
/setinlinefeedback - change inline feedback (https://core.telegram.org/bots/inline#collecting-feedback) settings
/setjoingroups - can your bot be added to groups?
/setprivacy - toggle privacy mode (https://core.telegram.org/bots/features#privacy-mode) in groups

Web Apps
/myapps - edit your web apps (https://core.telegram.org/bots/webapps)
/newapp - create a new web app (https://core.telegram.org/bots/webapps)
/listapps - get a list of your web apps
/editapp - edit a web app
/deleteapp - delete an existing web app

Games
/mygames - edit your games (https://core.telegram.org/bots/games)
/newgame - create a new game (https://core.telegram.org/bots/games)
/listgames - get a list of your games
/editgame - edit a game
/deletegame - delete an existing game

Chandrashekhar, [17-07-2024 12:41]
/newbot

BotFather, [17-07-2024 12:41]
Alright, a new bot. How are we going to call it? Please choose a name for your bot.

Chandrashekhar, [17-07-2024 12:43]
chandu_bot

BotFather, [17-07-2024 12:43]
Good. Now let's choose a username for your bot. It must end in `bot`. Like this, for example: TetrisBot or tetris_bot.

Chandrashekhar, [17-07-2024 12:44]
chandu_algo_bot

BotFather, [17-07-2024 12:44]
Done! Congratulations on your new bot. You will find it at t.me/chandu_algo_bot. You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully operational before you do this.

Use this token to access the HTTP API:
7272434935:AAE3nw0GNBkvkRGUIutPUSnPvzQAN3wDO_w
Keep your token secure and store it safely, it can be used by anyone to control your bot.

For a description of the Bot API, see this page: https://core.telegram.org/bots/api
*/
const { Telegraf } = require('telegraf');
require('dotenv').config(); // i have npm i dotenv installed
const bot = new Telegraf(process.env.BOT_TOKEN); // Ensure BOT_TOKEN is defined in your .env file
const binarysearch = `
function search(arr, x) {
    let lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        if (arr[mid] == x) return mid;
        else if (arr[mid] < x) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return undefined;
}
`;
try{
bot.start((ctx)=>ctx.reply('welcome to chandu algo bot'))
bot.command('binarysearch',(ctx)=>ctx.reply(binarysearch));
bot.on(message('sticker'),(ctx)=>ctx.reply('love'));
bot.launch();
}catch{
    console.log("unexpacted command");
}