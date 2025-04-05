import Head from "next/head";
import {useFetch} from "@hyper-fetch/react";
import {useEffect} from "react";

import {AdminPanel} from "@/components";
import {getRides, Ride} from "@/api";
import {useSocket} from "@/hooks/use-socket/hook";

export default function Home() {
    const {socket, isConnected} = useSocket({namespace: "/rides"});

    const {data, setData, loading} = useFetch(getRides)

    useEffect(() => {
        if (!socket) return;

        socket.connect();

        socket.on("rides:create", (ride: Ride) => {
            setData([...(data ?? []), ride]);
        });

        return () => {
            socket.off("rides:create");
            socket.disconnect();
        };
    }, [socket, data]);

    return (
        <>
            <Head>
                <title>Quick Cab</title>
                <meta name="description" content="Symulate taxi ride"/>
            </Head>

            <main className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-blue-600 mb-4">🚕 Quick Cab</h1>

                    {loading && <p className="text-gray-500">Data loading...</p>}

                    {!loading && (data ?? [])?.map(({id, status}) => (
                        <div key={id} className="flex items-center">
                            <p className="text-2xl font-semibold text-green-600 mt-1">Ride status: {status}</p>
                        </div>
                    ))}
                    <AdminPanel/>
                </div>
            </main>
        </>
    );
}