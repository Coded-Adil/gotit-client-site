import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyItems = () => {
    const { user } = useContext(AuthContext); // Get logged-in user details
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = user.email;
        fetch(`https://where-is-it-server-taupe.vercel.app/myItems?email=${email}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch((err) => {
                toast.error("Failed to load items");
                setLoading(false);
            });
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://where-is-it-server-taupe.vercel.app/myItems/${id}`, { method: "DELETE" })
                    .then((res) => res.json())
                    .then(() => {
                        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch(() => toast.error("Failed to delete item"));
            }
        });
    };

    if (loading) return <span className="loading loading-bars loading-lg mx-auto"></span>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">My Items</h1>
            {items.length === 0 ? (
                <p className="text-lg text-gray-600">You haven't added any items yet.</p>
            ) : (
                <table className="table-auto w-full border">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Post Type</th>
                            <th className="px-4 py-2">Location</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item._id}>
                                <td className="border px-4 py-2">{item.title}</td>
                                <td className="border px-4 py-2">{item.postType}</td>
                                <td className="border px-4 py-2">{item.location}</td>
                                <td className="border px-4 py-2">{item.date}</td>
                                <td className="border px-4 py-2">
                                    <Link to={`/updateItems/${item._id}`} className="btn btn-info mr-2">Update</Link>
                                    <button
                                        className="btn btn-error"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyItems;