import { Link } from "react-router-dom";

const ItemCard = ({item}) => {
    const { _id, title, thumbnail, postType, description, location } = item
    return (
        <div className="card bg-base-100 border shadow-xl">
            <figure className="px-10 pt-10">
                <img
                    src={thumbnail}
                    alt={title}
                    className="rounded-xl h-52 w-full" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{title}</h2>
                <p className="badge badge-accent">{postType}</p>
                <p>{description}</p>
                <p>Location: {location}</p>
                <Link to={`/allItems/${_id}`} className="card-actions">
                    <button className="btn btn-success">View Details</button>
                </Link>
            </div>
        </div>
    );
};

export default ItemCard;