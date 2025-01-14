import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddItem = () => {
    const { user } = useContext(AuthContext); // Get logged-in user details
    const [date, setDate] = useState(new Date()); // Date picker state

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const postType = form.postType.value;
        const thumbnail = form.thumbnail.value;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        const location = form.location.value;

        // Data to send to the database
        const newItem = {
            postType,
            thumbnail,
            title,
            description,
            category,
            location,
            date,
            contact: {
                displayName: user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL,
            },
        };

        console.log("Submitted Item:", newItem);
        // Make a POST request to the database API
        fetch("https://where-is-it-server-taupe.vercel.app/allItems", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                toast.success("Item added successfully!");
            })
            .catch(() => toast.error("An error occurred while adding the item."));
    };

    return (
        <div className="hero bg-gradient-to-r from-blue-300 to-blue-800 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card w-full backdrop-blur-xl border border-gray-300 shrink-0 shadow-2xl">
                    <h1 className="text-3xl text-center pt-4 font-bold">Add Item</h1>
                    <form onSubmit={handleSubmit} className="card-body">
                        {/* Post Type Dropdown */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Post Type</span>
                            </label>
                            <select name="postType" className="select select-bordered" required>
                                <option value="" disabled>
                                    Select Post Type
                                </option>
                                <option value="Lost">Lost</option>
                                <option value="Found">Found</option>
                            </select>
                        </div>

                        {/* Title */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter title"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        {/* Thumbnail (Image URL) */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Item Image (URL)</span>
                            </label>
                            <input
                                type="url"
                                name="thumbnail"
                                placeholder="Enter image URL"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                name="description"
                                placeholder="Describe the item"
                                className="textarea textarea-bordered"
                                required
                            ></textarea>
                        </div>

                        {/* Category Dropdown */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select name="category" className="select select-bordered" required>
                                <option value="" disabled>
                                    Select Category
                                </option>
                                <option value="pets">Pets</option>
                                <option value="documents">Documents</option>
                                <option value="gadgets">Gadgets</option>
                                <option value="others">Others</option>
                            </select>
                        </div>

                        {/* Location */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Enter location"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        {/* Date Lost or Found */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date Lost or Found</span>
                            </label>
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                className="input input-bordered"
                                required
                            />
                        </div>

                        {/* Contact Information (Readonly) */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Contact Information</span>
                            </label>
                            <input
                                type="text"
                                value={user?.displayName || ""}
                                placeholder="Your Name"
                                className="input input-bordered"
                                readOnly
                            />
                            <input
                                type="email"
                                value={user?.email || ""}
                                placeholder="Your Email"
                                className="input input-bordered mt-2"
                                readOnly
                            />
                            <input
                                type="text"
                                value={user?.photoURL || ""}
                                placeholder="Your Photo"
                                className="input input-bordered mt-2"
                                readOnly
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button className="btn btn-success">Add Item</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddItem;