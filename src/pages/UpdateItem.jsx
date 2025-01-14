import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateItem = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [item, setItem] = useState(null); 
    const [date, setDate] = useState(new Date()); 

    useEffect(() => {
        // Fetch existing item data
        fetch(`https://where-is-it-server-taupe.vercel.app/allItems/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setItem(data);
                setDate(new Date(data.date)); 
            })
            .catch((error) => {
                console.log(error.message)
                toast.error("Failed to fetch item details.")
            });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedItem = {
            postType: form.postType.value,
            thumbnail: form.thumbnail.value,
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            location: form.location.value,
            date,
            contact: item.contact, 
        };

        // Send updated data to the backend
        fetch(`https://where-is-it-server-taupe.vercel.app/allItems/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedItem),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    toast.success("Item updated successfully!");
                    navigate("/myItems"); 
                } else {
                    toast.error("Failed to update item.");
                }
            })
            .catch(() => toast.error("An error occurred while updating the item."));
    };

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div className="hero bg-gradient-to-r from-green-300 to-green-800 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card w-full backdrop-blur-xl border border-gray-300 shrink-0 shadow-2xl">
                    <h1 className="text-3xl text-center pt-4 font-bold">Update Item</h1>
                    <form onSubmit={handleUpdate} className="card-body">
                        {/* Pre-filled fields */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Post Type</span>
                            </label>
                            <select
                                name="postType"
                                className="select select-bordered"
                                defaultValue={item.postType}
                                required
                            >
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
                                defaultValue={item.title}
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
                                defaultValue={item.thumbnail}
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
                                defaultValue={item.description}
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
                                defaultValue={item.location}
                                className="input input-bordered"
                                required
                            />
                        </div>
                        {/* Repeat for other fields with `defaultValue={item.<field>}` */}
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Contact Email</span>
                            </label>
                            <input
                                type="email"
                                value={item.contact.email}
                                className="input input-bordered"
                                readOnly
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-success">Update Item</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateItem;