import {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";

const socket: Socket = io("http://localhost:4000");

type RideStatus = {
    id: string;
    status: string;
};

export const useSocketRideStatus = () => {
    const [ride, setRide] = useState<RideStatus | null>(null);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected app");
        });

        socket.on("statusChanged", (data: RideStatus) => {
            setRide(data);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected app");
        });

        return () => {
            socket.off("statusChanged");
        };
    }, []);

    return {ride};
};