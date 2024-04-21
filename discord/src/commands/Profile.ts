import ChatInputCommand from '@modules/ChatInputCommand';
import response from '@modules/response';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { isNullish } from '@sapphire/utilities';

@ApplyOptions<Command.Options>({
  name: 'профиль',
  description: 'Ого',
})
export default class extends ChatInputCommand {
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    let description = '🆔 ID: {id}\n🐟 Рыбы: {fish}';

    await interaction.reply(
      response({
        description: description
          .replace('{id}', this.container.loadingEmoji)
          .replace('{fish}', this.container.loadingEmoji),
      })
    );

    const user = await this.container.game.getProfile(
      await this.container.game.getId(interaction.user.id)
    );

    if (!isNullish(user.telegramUsername)) {
      description += `\n<:telegram:1231543860472315945> Телеграм: **\`@${user.telegramUsername}\`**`;
    }

    await interaction.editReply(
      response({
        description: description
          .replace('{id}', `**\`${user.id}\`**`)
          .replace('{fish}', `**\`${user.fish}\`**`),
      })
    );
  }
}
