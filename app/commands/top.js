const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
  name: '!top',
  async execute(message, balances) {
    const sorted = [...balances.entries()]
      .filter(([id]) => message.guild.members.cache.has(id))
      .sort((a, b) => b[1] - a[1]);

    const pageSize = 10;
    let page = 0;

    const getPageEmbed = (page) => {
      const start = page * pageSize;
      const pageData = sorted.slice(start, start + pageSize);

      const description = pageData.map(([id, balance], index) => {
        const user = message.guild.members.cache.get(id)?.user;
        return `${start + index + 1}. **${user?.username || '不明なユーザー'}** — $${balance}`;
      }).join('\n') || 'ランキングデータがありません。';

      return new EmbedBuilder()
        .setColor(0xffcc00)
        .setTitle('所持金ランキング')
        .setDescription(description)
        .setFooter({ text: `ページ ${page + 1} / ${Math.ceil(sorted.length / pageSize)}` });
    };

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('prev')
        .setLabel('◀ 前へ')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId('next')
        .setLabel('▶ 次へ')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(sorted.length <= pageSize)
    );

    const reply = await message.reply({
      embeds: [getPageEmbed(page)],
      components: [row]
    });

    const collector = reply.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 60000
    });

    collector.on('collect', async interaction => {
      if (interaction.user.id !== message.author.id) {
        return interaction.reply({ content: 'そのコマンドは実行者のみです。', ephemeral: true });
      }

      if (interaction.customId === 'prev') page--;
      if (interaction.customId === 'next') page++;

      // ボタンの状態を更新
      row.components[0].setDisabled(page === 0);
      row.components[1].setDisabled((page + 1) * pageSize >= sorted.length);

      await interaction.update({
        embeds: [getPageEmbed(page)],
        components: [row]
      });
    });

    collector.on('end', () => {
      reply.edit({ components: [] }).catch(() => {});
    });
  }
};
