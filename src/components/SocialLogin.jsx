import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

const SocialLogin = () => {
    const { signInWithGoogle, setUser } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                setUser(result.user);
                toast.success("Successfully logged in!");
            })
            .catch(error => {
                console.error("Login Error:", error.message);
                toast.error(`Failed to log in: ${error.message}`);
            })
    }
    return (
        <div className="mx-auto">
            <button onClick={handleGoogleSignIn} className="btn btn-primary text-xl rounded-none">Google</button>
        </div>
    );
};

export default SocialLogin;