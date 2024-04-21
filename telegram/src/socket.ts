import { game } from '@/game';
import { type EarlyBloomRodData } from '@early-bloom-rod/io';
import { isNullish } from '@sapphire/utilities';
import { InlineKeyboard } from 'grammy';
import { io } from 'socket.io-client';
import { api } from '.';

export const socket = io(process.env.SOCKET_IO_URL);

socket.on('verify', (data) => {
  const parsedData: EarlyBloomRodData = JSON.parse(data);

  const inlineKeyboard = new InlineKeyboard()
    .text('Ок', 'ok')
    .text('Отменить', 'cancel');

  api.sendMessage(parsedData.id, 'Подтвердите привязывание аккаунта', {
    reply_markup: inlineKeyboard,
  });
});

socket.on('not-verified', (data) => {
  const parsedData: EarlyBloomRodData = JSON.parse(data);

  api.sendMessage(parsedData.id, 'Отменено');
});

socket.on('verified', async (data) => {
  const parsedData: EarlyBloomRodData = JSON.parse(data);
  const discordId = parsedData.id;
  const telegramId = await game.redis.get(`verification:${discordId}`);

  // TODO
  if (isNullish(telegramId)) throw Error('...');

  await game.discordToTelegram({
    discordId,
    telegramId,
  });

  await api.sendMessage(telegramId, 'Ок');
});
