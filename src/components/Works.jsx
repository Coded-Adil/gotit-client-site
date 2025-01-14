import Lottie from "lottie-react";
import faqLottieData from '../assets/FAQ/Lottie/FaqAnimation.json';

const Works = () => {
    return (
        <div className="my-8">
            <h3 className="text-4xl font-bold text-center mb-12">How It <span className="text-[#19863aaf]">Works</span></h3>
            <p className="text-xl px-4 text-center my-4">Easily report lost or found items with just a few clicks! Browse listings by category or location to quickly find what you're looking for. Once reunited, share your success story to inspire others and grow our community.</p>
            <div>
                <div className="hero">
                    <div className="hero-content flex-col lg:flex-row gap-4">
                        <Lottie animationData={faqLottieData}></Lottie>
                        <div>
                            <div className="collapse collapse-arrow border border-blue-100 my-2">
                                <input type="radio" name="my-accordion-2" defaultChecked />
                                <div className="collapse-title text-xl font-medium">How do I report a lost or found item?</div>
                                <div className="collapse-content">
                                    <p>Click on the "Report" button on the homepage. Select whether you’re reporting a lost or found item, fill in the details such as a description, location, and contact information, and upload a photo if available. Once submitted, your report will be visible to other users.</p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow border border-blue-100 my-2">
                                <input type="radio" name="my-accordion-2" />
                                <div className="collapse-title text-xl font-medium">How do I search for an item I’ve lost?</div>
                                <div className="collapse-content">
                                    <p>Use the search bar on the homepage to look for specific keywords related to your item. You can also filter results by category, date, or location to narrow down your search.</p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow border border-blue-100 my-2">
                                <input type="radio" name="my-accordion-2" />
                                <div className="collapse-title text-xl font-medium">What happens after I find my item or return one?</div>
                                <div className="collapse-content">
                                    <p>If you successfully find or return an item, you can mark the report as "Resolved" by logging into your account. We encourage you to share your success story in the "Reunion Stories" section to inspire and motivate others.</p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow border border-blue-100 my-2">
                                <input type="radio" name="my-accordion-2" />
                                <div className="collapse-title text-xl font-medium">Is my personal information secure?</div>
                                <div className="collapse-content">
                                    <p>Yes, your personal information is protected. Only the details you choose to share, such as your contact number or email, will be visible to the person claiming or returning an item. We prioritize user privacy and use secure systems to manage your data.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Works;