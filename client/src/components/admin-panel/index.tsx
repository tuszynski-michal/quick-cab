import {useState} from "react";
import {useSubmit} from "@hyper-fetch/react";

import {createRide} from "@/api";

const STATUSES = [
    "waiting",
    "on_the_way",
    "arrived",
    "in_progress",
    "finished",
];

export const AdminPanel = () => {
    const [status, setStatus] = useState<string>("waiting");
    const [message, setMessage] = useState("");

    const {submit} = useSubmit(createRide)

    const handleUpdate = () => {
        submit({data: {status}}).then(() => {
            setMessage(`✅ Status changed to "${status}"`);
        }).catch(error => {
            setMessage(`❌ Error: ${error}`);
        })
    };

    return (
        <div className="mt-10 p-4 border rounded-lg bg-white shadow-md w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">🔧 Admin panel</h2>
            <div className="flex flex-col gap-4">
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="p-2 border rounded"
                >
                    {STATUSES.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Create ride
                </button>
                {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
            </div>
        </div>
    );
};