import ChatInputCommand from "@modules/ChatInputCommand";
import response from "@modules/response";
import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";

@ApplyOptions<Command.Options>({
  name: "лидеры",
  description: "Самые крутые ребята",
})
export default class extends ChatInputCommand {
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const users = await this.container.game.getLeaders();

    await interaction.reply(
      response({
        description: users
          .map((user, index) => {
            return `${index + 1}. <@${user.id}> **\`${user.fish}\`**`;
          })
          .join("\n"),
      })
    );
  }
}
