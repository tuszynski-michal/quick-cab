import {useEffect, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";

import {BaseListeners, SocketArguments, SocketInstance, SocketListenerObject} from "@/hooks/use-socket/types";


export const useSocket = <T extends SocketListenerObject>({namespace}: SocketArguments) => {
    const socket = useRef<SocketInstance<T> | null>(null);

    const [isConnected, setConnected] = useState<boolean>(false);


    const listenerHandlers = {
        connect: () => {
            setConnected(true);
        },
        connectError: () => {
            setConnected(false);
        },
        disconnect: () => {
            setConnected(false);
        },
    };

    const addJobListener = (socketInstance: Socket<BaseListeners>) =>
        <E extends keyof BaseListeners>(event: E) => {
            const handler = listenerHandlers[event];
            if (!handler) return () => null;

            socketInstance.on<keyof BaseListeners>(event, handler);

            return () => {
                socketInstance.off<keyof BaseListeners>(event, handler);
            };
        }

    const mountListeners = (socketInstance: Socket<BaseListeners>) => {
        const unmountFunctions = Object.keys(listenerHandlers).map((event) => {
                return addJobListener(socketInstance)(event as keyof BaseListeners);
            }
        );

        return () => {
            unmountFunctions.forEach((unmount) => unmount());
        };
    }

    useEffect(() => {
        if (!socket.current) {
            socket.current = io(`http://localhost:4000${namespace}`, {
                autoConnect: false,
            });
        }

        const unmountListeners = mountListeners(socket.current);

        if (!socket.current.connected) {
            socket.current.connect();
        }

        return () => {
            unmountListeners();
        };

    }, []);

    return {socket: socket.current, isConnected};
};