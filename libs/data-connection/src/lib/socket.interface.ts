export interface SocketModel {
  connect: () => void;
  disconnect: () => void;
  onServerData: () => void;
  sendData: (arg: string) => void;
}
