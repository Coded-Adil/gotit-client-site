import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import SocialLogin from "../components/SocialLogin";


const Login = () => {

    const { logInUser, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || '/';

    const handleLogIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        logInUser(email, password)
            .then(result => {
                console.log(result.user);
                setUser(result.user);
                toast.success("Successfully logged in!");
                navigate(from);
            })
            .catch(error => {
                console.error("Login Error:", error.message);
                toast.error(`Failed to log in: ${error.message}`);
            });
    };

    return (
        <div className="hero bg-gradient-to-r from-blue-300 to-blue-800 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card w-full backdrop-blur-xl border border-gray-300 max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-3xl text-center pt-4 font-bold">Login now!</h1>
                    <form onSubmit={handleLogIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <Link to='/register' className="label-text-alt text-red-600 text-lg link link-hover">Don't have an account? Register</Link>
                            </label>
                        </div>
                        <SocialLogin />
                        <div className="form-control mt-6">
                            <button className="btn btn-success">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;