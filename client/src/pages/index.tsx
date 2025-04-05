import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>Quick Cab</title>
                <meta name="description" content="Symulate taxi ride" />
            </Head>
            <main className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-blue-600 mb-4">🚕 Quick Cab</h1>
                    <p className="text-gray-700 text-lg">Order your ride.</p>
                </div>
            </main>
        </>
    );
}