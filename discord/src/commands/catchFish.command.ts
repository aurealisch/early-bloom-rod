import ChatInputCommand from "@modules/ChatInputCommand";
import response from "@modules/response";
import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import { Time } from "@sapphire/time-utilities";

@ApplyOptions<Command.Options>({
  name: "ловить-рыбу",
  description: "Бульк",
  cooldownDelay: Time.Hour * 2,
})
export default class extends ChatInputCommand {
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const { catched } = await this.container.game.catchFish(
      await this.container.game.getId(interaction.user.id)
    );

    await interaction.reply(
      response({
        description: `Ты поймал **\`${catched}\`** рыбы`,
      })
    );
  }
}
