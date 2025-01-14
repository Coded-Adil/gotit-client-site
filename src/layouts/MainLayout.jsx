import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <ToastContainer />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;