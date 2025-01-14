import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Reunion = () => {
    const stories = [
        {
            id: 1,
            title: "Lost Wallet Returned!",
            description: "John lost his wallet at the park, and within two days, a kind stranger reported it here. Now, it's back in his hands!",
            image: "https://i.ibb.co.com/VYDb3tP/pexels-vlada-karpovich-4452503.jpg",
        },
        {
            id: 2,
            title: "Beloved Pet Reunited",
            description: "Lila's missing cat, Whiskers, was found by a neighbor using this platform. She's so grateful for the community support!",
            image: "https://i.ibb.co.com/PZnWDDn/pexels-kmerriman-20787.jpg",
        },
        {
            id: 3,
            title: "Keys Found at the Mall",
            description: "Mike misplaced his keys at the mall. Thanks to a quick report, he retrieved them the next day.",
            image: "https://i.ibb.co.com/hywddpN/pexels-eye4dtail-333837.jpg",
        },
        {
            id: 4,
            title: "Priceless Necklace Found",
            description: "Sophia thought she lost her family heirloom forever, but a Good Samaritan reported it here. Tears of joy followed!",
            image: "https://i.ibb.co.com/LZkhGwh/pexels-enginakyurt-1458867.jpg",
        },
    ];

    return (
        <div className="py-8 px-4">
            <h2 className="text-4xl font-bold text-center mb-6">Reunion <span className='text-[#19863aaf]'>Stories</span></h2>
            <p className="text-center text-xl mb-10">
                Read heartwarming stories of lost items returned to their owners through our community effort.
            </p>
            <Swiper
                modules={[Pagination, Navigation]}
                slidesPerView={1}
                spaceBetween={20}
                pagination={{ clickable: true }}
                navigation
                autoplay={{
                    delay: 3000,
                }}
                className="mySwiper"
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {stories.map((story) => (
                    <SwiperSlide key={story.id} className="p-4">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={story.image}
                                alt={story.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {story.title}
                                </h3>
                                <p className="text-gray-600">{story.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Reunion;
