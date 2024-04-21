import { socket } from '@/socket';
import {
  EarlyBloomRodCode,
  type EarlyBloomRodRequest,
} from '@early-bloom-rod/io';
import { readdirSync } from 'fs';
import { Bot, type Composer } from 'grammy';
import { join } from 'path';

const bot = new Bot(process.env.TOKEN);
export const api = bot.api;

const commandsFolder = join(__dirname, 'commands');

readdirSync(commandsFolder).forEach(async (commandsFile) => {
  const command: { composer: Composer<any> } = await import(
    join(commandsFolder, commandsFile)
  );

  bot.use(command.composer);
});

bot.callbackQuery('ok', async (context) => {
  const author = await context.getAuthor();

  const request: EarlyBloomRodRequest = {
    code: EarlyBloomRodCode.Verified,
    data: {
      id: String(author.user.id),
    },
  };

  socket.emit('message', JSON.stringify(request));

  await context.answerCallbackQuery({
    text: 'Ок',
  });
});

bot.callbackQuery('cancel', async (context) => {
  const author = await context.getAuthor();

  const request: EarlyBloomRodRequest = {
    code: EarlyBloomRodCode.NotVerified,
    data: {
      id: String(author.user.id),
    },
  };

  socket.emit('message', JSON.stringify(request));

  await context.answerCallbackQuery({
    text: 'Отменено',
  });
});

bot.start();
