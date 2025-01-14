import { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../context/AuthContext";

const ItemDetails = () => {
    const {user} = useContext(AuthContext);
    const { id } = useParams(); 
    const { title, thumbnail, postType, description, location, category, date } = useLoaderData();
    const [isModalOpen, setModalOpen] = useState(false); 
    const [recoveryDate, setRecoveryDate] = useState(new Date()); 
    const [recoveredLocation, setRecoveredLocation] = useState(""); 
    const [item, setItem] = useState(null); 

    const loggedInUser = {
        name: user?.name, 
        email: user?.email,
        photoURL: user?.photoURL,
    };

    // Fetch item details
    useEffect(() => {
        fetch(`https://where-is-it-server-taupe.vercel.app/allItems/${id}`)
            .then((res) => res.json())
            .then((data) => setItem(data))
            .catch(() => toast.error("Failed to fetch item details."));
    }, [id]);

    // Handle recovery submission
    const handleRecoverySubmit = () => {
        const recoveryData = {
            itemId: id,
            title,
            recoveredLocation,
            recoveryDate,
            recoveredBy: loggedInUser,
        };

        fetch("https://where-is-it-server-taupe.vercel.app/recoveries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recoveryData),
        })
            .then((res) => res.json())
            .then(() => {
                return fetch(`https://where-is-it-server-taupe.vercel.app/allItems/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "recovered" }),
                });
            })
            .then((res) => res.json())
            .then(() => {
                toast.success("Item marked as recovered!");
                setModalOpen(false); 
            })
            .catch(() => toast.error("Failed to mark item as recovered."));
    };

    if (!item) return <span className="loading loading-bars loading-lg mx-auto"></span>;

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row lg:gap-8">
                <img src={thumbnail} className="max-w-lg rounded-lg shadow-2xl" />
                <div className="space-y-6">
                    <h1 className="text-5xl font-bold">{title}</h1>
                    <p className="badge badge-accent">{postType}</p>
                    <p>{description}</p>
                    <p>Location: {location}</p>
                    <p>Category: {category}</p>
                    <p>Date: {new Date(date).toLocaleDateString()}</p>
                    <p>Status: {item.status || "Not recovered"}</p>
                    <button
                        className={`btn btn-primary mt-4 ${item.status === "recovered" ? "btn-disabled" : ""}`}
                        onClick={() => setModalOpen(true)}
                        disabled={item.status === "recovered"}
                    >
                        {postType === "Lost" ? "Found This!" : "This is Mine!"}
                    </button>
                    {item.status === "recovered" && <p className="text-red-500 mt-2">This item has already been recovered.</p>}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold">Recovery Information</h3>
                        <div className="form-control mt-2">
                            <label className="label">Recovered Location</label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={recoveredLocation}
                                onChange={(e) => setRecoveredLocation(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={title}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control mt-2">
                            <label className="label">Recovery Date</label>
                            <DatePicker
                                selected={recoveryDate}
                                onChange={(date) => setRecoveryDate(date)}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control mt-2">
                            <label className="label">Recovered By</label>
                            <input type="text" value={user?.name} className="input input-bordered" readOnly />
                            <input type="email" value={user?.email} className="input input-bordered mt-2" readOnly />
                            <img src={user?.photoURL} alt="User" className="w-16 h-16 mt-2 rounded-full" />
                        </div>
                        <div className="modal-action">
                            <button className="btn btn-success" onClick={handleRecoverySubmit}>
                                Submit
                            </button>
                            <button className="btn" onClick={() => setModalOpen(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemDetails;