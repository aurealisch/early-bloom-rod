import Game from '@early-bloom-rod/game';

export const game = new Game({
  platform: 'telegram',
  redisClientUrl: process.env.REDIS_CLIENT_URL,
  TRPCClientUrl: process.env.TRPC_CLIENT_URL,
});
