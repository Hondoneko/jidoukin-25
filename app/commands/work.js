const { EmbedBuilder } = require('discord.js');

// クールダウンを記録するMap（ユーザーID → 最終使用時刻）
const cooldowns = new Map();

module.exports = {
  name: '!work',
  execute(message, balances) {
    const userId = message.author.id;
    const now = Date.now();
    const cooldownAmount = 30 * 60 * 1000; // 30分（ミリ秒）

    const lastUsed = cooldowns.get(userId);
    if (lastUsed && now - lastUsed < cooldownAmount) {
      const remaining = cooldownAmount - (now - lastUsed);
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);

      const cooldownEmbed = new EmbedBuilder()
        .setColor(0xff9900)
        .setTitle('クールダウン中')
        .setDescription(次にworkできるまで **${minutes}分${seconds}秒** 待ってください。)
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() });

      return message.reply({ embeds: [cooldownEmbed] });
    }

    // クールダウンを更新
    cooldowns.set(userId, now);

    // 報酬を計算
    const earned = Math.floor(Math.random() * 501) + 250; // 250〜750ドル
    const current = balances.get(userId) || 0;
    const newBalance = current + earned;
    balances.set(userId, newBalance);

    const embed = new EmbedBuilder()
      .setColor(0x00ff66)
      .setTitle('成功')
      .setDescription(あなたは **$${earned}** を稼ぎました。\n現在の残高は **$${newBalance}** です。)
      .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() });

    message.reply({ embeds: [embed] });
  }
};
