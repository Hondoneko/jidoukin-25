const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: '!give',
  async execute(message, balances, args) {
    const senderId = message.author.id;
    const targetInput = args[1];
    const amount = parseInt(args[2], 10);

    let target = message.mentions.users.first();

    if (!target) {
      const members = await message.guild.members.fetch();
      const found = members.find(member =>
        member.user.username.toLowerCase() === targetInput.toLowerCase() ||
        member.user.id === targetInput
      );
      if (found) target = found.user;
    }

    const senderBalance = balances.get(senderId) || 0;
    const receiverBalance = balances.get(target.id) || 0;

    balances.set(senderId, senderBalance - amount);
    balances.set(target.id, receiverBalance + amount);

    const embed = new EmbedBuilder()
      .setColor(0x3399ff)
      .setTitle('成功')
      .setDescription(`${message.author.username} さんが ${target.username} さんに **$${amount}** を送金しました。`)
      .setFooter({ text: `残高: あなた $${senderBalance - amount} / ${target.username} $${receiverBalance + amount}` });

    message.reply({ embeds: [embed] });
  }
};
