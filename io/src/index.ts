import { Server } from "socket.io";

export enum EarlyBloomRodCode {
  Verify,
  Verified,
  NotVerified,
}

export interface EarlyBloomRodData {
  id: string;
}

export interface EarlyBloomRodRequest {
  code: EarlyBloomRodCode;
  data: EarlyBloomRodData;
}

if (Bun.main === import.meta.filename) {
  const server = new Server(8080);

  server.on("connection", (socket) => {
    socket.on("message", (content) => {
      const request: EarlyBloomRodRequest = JSON.parse(content);

      const codes: Record<EarlyBloomRodCode, string> = {
        [EarlyBloomRodCode.NotVerified]: "not-verified",
        [EarlyBloomRodCode.Verified]: "verified",
        [EarlyBloomRodCode.Verify]: "verify",
      };

      socket.broadcast.emit(codes[request.code], JSON.stringify(request.data));
    });
  });
}
