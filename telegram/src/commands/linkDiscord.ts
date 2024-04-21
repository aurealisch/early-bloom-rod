import { game } from '@/game';
import { socket } from '@/socket';
import {
  EarlyBloomRodCode,
  type EarlyBloomRodRequest,
} from '@early-bloom-rod/io';
import { isNullish } from '@sapphire/utilities';
import { Composer } from 'grammy';

export const composer = new Composer();

composer.command('linkdiscord', async (context) => {
  const id = Number(context.match);

  const user = await game.getProfile(id);

  const discordId = user.discordId;

  // TODO
  if (isNullish(discordId)) throw Error('...');

  const request: EarlyBloomRodRequest = {
    code: EarlyBloomRodCode.Verify,
    data: {
      id: discordId,
    },
  };

  socket.emit('message', JSON.stringify(request));

  await context.reply(
    'Пожалуйста подтвердите привязывание, зайдя в чат с дискорд ботом'
  );

  const author = await context.getAuthor();

  game.redis.set(`verification:${discordId}`, author.user.id);
});
