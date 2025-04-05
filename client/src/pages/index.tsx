import Head from "next/head";
import {useFetch} from "@hyper-fetch/react";

import {useSocketRideStatus} from "@/hooks/use-socket-ride-status"
import {AdminPanel} from "@/components";
import {getRides} from "@/api";

export default function Home() {
    const {ride} = useSocketRideStatus();

    const {data, loading} = useFetch(getRides)
    console.log(data)
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