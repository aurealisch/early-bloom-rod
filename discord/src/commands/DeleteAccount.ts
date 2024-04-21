import ChatInputCommand from '@modules/ChatInputCommand';
import response from '@modules/response';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
  name: 'удалить-аккаунт',
  description: 'Ну блин',
})
export default class extends ChatInputCommand {
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await this.container.game.deleteUser(
      await this.container.game.getId(interaction.user.id)
    );

    await interaction.reply(
      response({
        description: `Ты удалил аккаунт`,
      })
    );
  }
}
