import response from "@/modules/response";
import {
  EarlyBloomRodCode,
  type EarlyBloomRodRequest,
} from "@early-bloom-rod/io";
import ChatInputCommand from "@modules/ChatInputCommand";
import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import { isNullish } from "@sapphire/utilities";

@ApplyOptions<Command.Options>({
  name: "привязать-телеграм",
  description: "Эту функцию было интересно реализовывать",
})
export default class extends ChatInputCommand {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) => {
      return builder
        .setName(this.name)
        .setDescription(this.description)
        .addNumberOption((builder) => {
          return builder
            .setName("id")
            .setDescription("Нужно")
            .setRequired(true);
        });
    });
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const id = interaction.options.getNumber("id", true);

    const user = await this.container.game.getProfile(id);

    const telegramId = user.telegramId;

    // TODO
    if (isNullish(telegramId)) throw Error("...");

    const request: EarlyBloomRodRequest = {
      code: EarlyBloomRodCode.Verify,
      data: {
        id: telegramId,
      },
    };

    this.container.socket.emit("message", JSON.stringify(request));

    const message = await interaction.reply(
      response({
        description:
          "Пожалуйста подтвердите привязывание, зайдя в чат с телеграм ботом",
      })
    );

    this.container.game.redis.set(
      `verification:${telegramId}`,
      JSON.stringify({
        edit: message.edit,
      })
    );
  }
}
