"use client";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function NewDestinationPage() {
    const [formData, setFormData] = useState({
        name: "",
        page: "",
        description: "",
        image: null as File | null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const body = new FormData();
        body.append("name", formData.name);
        body.append("page", formData.page);
        body.append("description", formData.description);
        if (formData.image) {
            body.append("image", formData.image);
        }
        
        try {
            const response = await fetch("http://localhost:3001/api/destinations", {
                method: "POST",
                body
            });
            if (!response.ok) {
                throw new Error("Failed to add destination");
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
            redirect('/destinations');
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, image: e.target.files![0]}));
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Add New Destination
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Fill in the details below to create a new travel spot.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm transition-all focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none"
                            placeholder="e.g. Kyoto, Japan"
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-1">
                            Cover Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all cursor-pointer border border-gray-200 rounded-lg bg-gray-50"
                        />
                    </div>

                    <div>
                        <label htmlFor="page" className="block text-sm font-semibold text-gray-700 mb-1">
                            Page Slug
                        </label>
                        <input
                            type="text"
                            id="page"
                            name="page"
                            value={formData.page}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm transition-all focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none"
                            placeholder="e.g. /kyoto"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm transition-all focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none resize-none"
                            placeholder="Briefly describe the destination..."
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-sm"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Adding Destination...
                                </>
                            ) : "Add Destination"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}