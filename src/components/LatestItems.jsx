import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LatestItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://where-is-it-server-taupe.vercel.app/latestItems")
            .then((res) => res.json())
            .then((data) => setItems(data))
            .catch((error) => console.error("Failed to fetch latest items", error));
    }, []);

    return (
        <div className="my-8">
            <h2 className="text-3xl font-bold text-center mb-6">Latest Find & Lost Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                    <div
                        key={item._id}
                        className="border rounded-lg p-4 shadow-md bg-white flex flex-col justify-between"
                    >
                        <h3 className="text-lg font-semibold">{item.title || "Unnamed Item"}</h3>
                        <p className="text-sm text-gray-500">
                            {item.description?.slice(0, 50)}...
                        </p>
                        <p className="text-sm text-gray-400">Date: {new Date(item.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
            <div className="text-center mt-6">
                <Link to="/allItems">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                        See All
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LatestItems;