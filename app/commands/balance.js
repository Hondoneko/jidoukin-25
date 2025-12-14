const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: '!balance',
  execute(message, balances) {
    const userId = message.author.id;
    const balance = balances.get(userId) || 0;

    // ランキングを作成（降順）
    const sorted = [...balances.entries()]
      .filter(([id]) => message.guild.members.cache.has(id))
      .sort((a, b) => b[1] - a[1]);

    // 自分の順位を取得
    const rank = sorted.findIndex(([id]) => id === userId) + 1;

    const embed = new EmbedBuilder()
      .setColor(0x00bfff)
      .setTitle(' あなたの残高')
      .setDescription(現在の残高は **$${balance}** です。\nサーバー内での順位は **${rank}位** です。)
      .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() });

    message.reply({ embeds: [embed] });
  }
};
