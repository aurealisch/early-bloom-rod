import { Command } from '@sapphire/framework';

export default class ChatInputCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand({
      name: this.name,
      description: this.description,
    });
  }
}
