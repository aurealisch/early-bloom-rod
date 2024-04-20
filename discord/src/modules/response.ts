import config from "@/config.json";
import { EmbedBuilder } from "discord.js";

type Color = "default" | "error";

const colors: Record<Color, string> = {
  default: config.colors.default,
  error: config.colors.error,
};

export default function response(options: { color?: Color; description: string }) {
  return {
    embeds: [
      new EmbedBuilder()
        .setColor(colors[options.color ?? "default"] as `#{string}`)
        .setDescription(options.description),
    ],
    allowedMentions: {
      repliedUser: false,
    },
  };
}
