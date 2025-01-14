import Banner from "../components/Banner";
import LatestItems from "../components/LatestItems";
import Reunion from "../components/Reunion";
import Works from "../components/Works";

const Home = () => {
    return (
        <div>
            <Banner />
            <Reunion />
            <LatestItems />
            <Works />
        </div>
    );
};

export default Home;