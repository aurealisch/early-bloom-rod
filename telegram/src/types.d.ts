declare module 'bun' {
  interface Env {
    TOKEN: string;
    REDIS_CLIENT_URL: string;
    TRPC_CLIENT_URL: string;
    SOCKET_IO_URL: string;
  }
}
