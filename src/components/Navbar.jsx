import { Link, NavLink } from "react-router-dom";
import Icon from '../../public/icon-lg.png'
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";


const Navbar = () => {
    const { user, logOutUser } = useContext(AuthContext);

    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                toast.success("Log Out successful!");
            })
            .catch(error => {
                toast.error(`Failed to log out profile: ${error.message}`);
            })
    }
    const links =
        <>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/allItems'>All Items</NavLink>
            <NavLink to='/addItem'>Add Item</NavLink>
            <NavLink to='/myItems'>My Items</NavLink>
            <NavLink to='/allRecovared'>Recovered</NavLink>
        </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {
                            links
                        }
                    </ul>
                </div>
                <Link to='/' className="flex items-center gap-2">
                    <img className="max-w-8" src={Icon} alt="" />
                    <p className="text-xl">Got-It</p>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-4 px-1">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <input
                    type="checkbox"
                    value="synthwave"
                    className="toggle theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:theme(colors.sky.500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:theme(colors.blue.900)]" />
                {
                    user && user?.email && user?.photoURL ?
                        <>
                            <div className="tooltip tooltip-open tooltip-bottom" data-tip={user?.displayName}>
                                <img className="h-10 object-cover w-10 rounded-full" src={user?.photoURL} alt="" />
                            </div>
                            <button onClick={handleLogOut} className="btn btn-success lg:text-lg">LogOut</button>
                        </> :
                        <>
                            <Link to='/register' className="lg:text-lg">Register</Link>
                            <Link to='/login' className="btn btn-success lg:text-lg">LogIn</Link>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;