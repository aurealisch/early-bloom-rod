import config from '@/config.json';
import { isNullish } from '@sapphire/utilities';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from 'discord.js';

type Color = 'default' | 'error';

const colors: Record<Color, string> = {
  default: config.colors.default,
  error: config.colors.error,
};

interface Button {
  customId: string;
  emoji: string;
  label: string;
}

export default function response(options: {
  color?: Color;
  description: string;
  buttons?: Array<Button>;
}) {
  const buttons = options.buttons;
  let components = undefined;

  if (!isNullish(buttons)) {
    components = [
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        buttons.map((button) => {
          return new ButtonBuilder()
            .setCustomId(button.customId)
            .setEmoji(button.emoji)
            .setLabel(button.label)
            .setStyle(ButtonStyle.Secondary);
        })
      ),
    ];
  }

  return {
    embeds: [
      new EmbedBuilder()
        .setColor(colors[options.color ?? 'default'] as `#{string}`)
        .setDescription(options.description),
    ],
    components,
    allowedMentions: {
      repliedUser: false,
    },
  };
}
