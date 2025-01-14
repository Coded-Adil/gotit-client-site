import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/autoplay';
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Banner = () => {
    const slides = [
        {
            image: "https://i.ibb.co.com/d4CgzNR/pexels-goumbik-915915.jpg",
            text: "Lost something? Let 'Got It' help you find it!",
        },
        {
            image: "https://i.ibb.co.com/PGCLKBQ/pexels-fotios-photos-1092644.jpg",
            text: "Found an item? Share it here and reunite it with its owner.",
        },
        {
            image: "https://i.ibb.co.com/q5wZ8kd/pexels-ferarcosn-190819.jpg",
            text: "Reconnecting people with their belongings—one item at a time.",
        },
        {
            image: "https://i.ibb.co.com/VJQnF5k/pexels-nitin-creative-249210.jpg",
            text: "Your trusted platform for lost and found items.",
        },
    ];

    return (
        <div className="my-8">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative">
                            <img
                                src={slide.image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-[400px] lg:h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-opacity-60 flex items-center justify-center bg-gray-800 text-white p-4 rounded">
                                <p className="text-2xl font-semibold lg:text-4xl">{slide.text}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;