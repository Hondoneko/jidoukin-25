// 1. ライブラリと環境変数の読み込み
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// 2. Botの初期化
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// 3. 所持金データ（簡易的にMapで管理）
const balances = new Map();

// 4. 起動時の処理
client.once('ready', () => {
  console.log(${client.user.tag} でログインしました！);
});

// 5. メッセージ受信時の処理
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const args = message.content.trim().split(/\s+/);
  const command = args[0].toLowerCase();

  // ここに !balance, !work, !give, !top の処理を追加
});

// 6. Botにログイン
client.login(process.env.DISCORD_TOKEN);
