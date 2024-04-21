import {
  EarlyBloomRodCode,
  type EarlyBloomRodRequest,
} from '@early-bloom-rod/io';
import response from '@modules/response';
import { ApplyOptions } from '@sapphire/decorators';
import {
  InteractionHandler,
  InteractionHandlerTypes,
} from '@sapphire/framework';
import type { ButtonInteraction } from 'discord.js';

@ApplyOptions<InteractionHandler.Options>({
  interactionHandlerType: InteractionHandlerTypes.Button,
})
export default class extends InteractionHandler {
  public override parse(interaction: ButtonInteraction) {
    if (interaction.customId !== 'ok') return this.none();

    return this.some();
  }

  public async run(interaction: ButtonInteraction) {
    const request: EarlyBloomRodRequest = {
      code: EarlyBloomRodCode.Verified,
      data: {
        id: interaction.user.id,
      },
    };

    this.container.socket.emit('message', JSON.stringify(request));

    await interaction.reply(
      response({
        description: 'Ок',
      })
    );
  }
}
