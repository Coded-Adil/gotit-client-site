import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthContext";
import SocialLogin from "../components/SocialLogin";

const Register = () => {

    const { createUser, setUser, updateUserProfile } = useContext(AuthContext);

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const displayName = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

        // console.log(name, email, photo, password);

        // Password Validation
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasLength = password.length >= 6;

        if (!hasUppercase) {
            toast.error("Password must contain at least one uppercase letter.");
            return;
        }
        if (!hasLowercase) {
            toast.error("Password must contain at least one lowercase letter.");
            return;
        }
        if (!hasLength) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        createUser(email, password)
            .then(result => {
                console.log(result.user)
                const currentUser = { displayName: displayName, photoURL: photo };
                updateUserProfile(currentUser)
                    .then(() => {
                        setUser(prevUser => {
                            return { ...prevUser, currentUser }
                        })
                        toast.success("Registration successful!");
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error("Failed to update profile.");
                    })
            })
            .catch(error => {
                toast.error(error.message || "Registration failed.");
            })
    }
    return (
        <div className="hero bg-gradient-to-r from-blue-300 to-blue-800 min-h-screen">
            {/* <ToastContainer /> */}
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card w-full backdrop-blur-xl border border-gray-300 max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-3xl text-center pt-4 font-bold">Register now!</h1>
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="photo URL" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <Link to='/login' className="label-text-alt text-red-600 text-lg link link-hover">Already Have An Account? Login</Link>
                            </label>
                        </div>
                        <SocialLogin />
                        <div className="form-control mt-6">
                            <button className="btn btn-success">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;