import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

const AllRecovered = () => {
    const {user} = useContext(AuthContext);
    const [recoveredItems, setRecoveredItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const loggedInUser = {
        email: user?.email,
    };

    // Fetch recovered items
    useEffect(() => {
        fetch(`https://where-is-it-server-taupe.vercel.app/recoveries?email=${loggedInUser.email}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setRecoveredItems(data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load recovered items.");
                setLoading(false);
            });
    }, [loggedInUser.email]);

    if (loading) return <span className="loading loading-bars loading-lg mx-auto"></span>;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">All Recovered Items</h1>
            {recoveredItems.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>No recovered items to display. Check back later!</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-4 py-2">Title</th>
                                <th className="border border-gray-200 px-4 py-2">Recovered Date</th>
                                <th className="border border-gray-200 px-4 py-2">Recovered Location</th>
                                <th className="border border-gray-200 px-4 py-2">Recovered By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recoveredItems.map((item) => (
                                <tr key={item._id}>
                                    <td className="border border-gray-200 px-4 py-2">{item.title}</td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        {new Date(item.recoveryDate).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">{item.recoveredLocation}</td>
                                    <td className="border border-gray-200 px-4 py-2">{item.recoveredBy.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllRecovered;
