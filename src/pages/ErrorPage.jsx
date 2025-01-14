import Lottie from 'lottie-react';
import errorLottieData from '../assets/FAQ/Lottie/AnimationError.json';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='flex flex-col gap-4 justify-center items-center my-8'>
            <div>
                <Lottie className='max-w-72' animationData={errorLottieData}></Lottie>
            </div>
            <p className='text-4xl font-bold text-green-800'>Page Is Not Found!</p>
            <Link to='/' className='btn btn-error rounded-none'>Home</Link>
        </div>
    );
};

export default ErrorPage;