import ChatInputCommand from '@modules/ChatInputCommand';
import response from '@modules/response';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
  name: 'создать-аккаунт',
  description: 'Так надо',
})
export default class extends ChatInputCommand {
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await this.container.game.TRPCClient.users.create.mutate({
      discord: {
        id: interaction.user.id,
        username: interaction.user.username,
      },
    });

    await interaction.reply(
      response({
        description: `Ты создал аккаунт`,
      })
    );
  }
}
