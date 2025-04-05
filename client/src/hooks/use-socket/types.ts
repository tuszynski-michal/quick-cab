import {Socket} from "socket.io-client";

export type BaseListeners = {
    connect: () => void;
    connectError: (err: Error) => void;
    disconnect: (reason: Socket.DisconnectReason) => void;
};

export type SocketInstance<T extends SocketListenerObject> = Socket<Partial<BaseListeners & T>>;
export type SocketListenerObject = Record<string, (...args: any[]) => void>

export type SocketArguments = {
    namespace: string;
};