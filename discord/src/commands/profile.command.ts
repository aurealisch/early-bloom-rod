import ChatInputCommand from "@modules/ChatInputCommand";
import response from "@modules/response";
import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";

@ApplyOptions<Command.Options>({
  name: "профиль",
  description: "Ого",
})
export default class extends ChatInputCommand {
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const user = await this.container.game.getProfile(
      await this.container.game.getId(interaction.user.id)
    );

    await interaction.reply(
      response({
        description: `🆔 ID: **\`${user.id}\`**\n🐟 Рыбы: **\`${user.fish}\`**`,
      })
    );
  }
}
