"use client";
import {useState, useEffect} from "react";

interface Destination {
    _id: string;
    name: string;
    description: string;
} 

export default function DestinationPage() {
    const [destinations, setDestinations] = useState<Destination[]>([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            const response = await fetch("http://localhost:3001/api/destinations")
            const data = await response.json();
            setDestinations(data);
            console.log(data);
        }
        fetchDestinations();
    }, [])

    return (<div>
        <h1 className="text-3xl font-bold">Destinations</h1>
        <table className="table-auto w-full border border-slate-400 border-collapse">

            <thead>
                <tr>
                <th className="border border-slate-300 p-2">Name</th>
                <th className="border border-slate-300 p-2">Description</th>
                <th className="border border-slate-300 p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {destinations.map((destination) => (
                    <tr key={destination._id}>
                        <td className="border border-slate-300 p-2">{destination.name}</td>
                        <td className="border border-slate-300 p-2">{destination.description}</td>
                        <td className="border border-slate-300 p-2">
                            <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
    </div>)
}