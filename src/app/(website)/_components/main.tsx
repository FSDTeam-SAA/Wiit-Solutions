"use client";

import AboutUs from '@/app/components/About/AboutUs'
import MissionVision from '@/app/components/About/OurMisson'
import ChooseUs from '@/app/components/Contact/ChooseUs'
import HearForm from '@/app/components/Contact/HearForm'
import Banner from '@/app/components/HomePage/Homepage';
import OurComprehensiveServices from '@/app/components/NationwideServices/OurComprehensiveServices';
import Ourcorevalues from '@/app/components/NationwideServices/Ourcorevalues'
import Navbar from '@/app/components/Navbar/Navbar';
import { HomePageData } from '@/types/home'
import React, { useEffect, useState } from 'react'

function Main() {
    const [homeData, setHomeData] = useState<HomePageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchHeaderData() {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/frontend-data`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setHomeData(data);
            } catch (error) {
                console.error('Failed to fetch header data:', error);
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        fetchHeaderData();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    if (!homeData) return <div className="flex justify-center items-center h-screen">No data available</div>;



    const aboutId = homeData?.menu?.[0]?.link2?.replace("#", "") || "";
    const serviceId = homeData?.menu?.[0]?.link3?.replace("#", "") || "";
    const contactId = homeData?.menu?.[0]?.link4?.replace("#", "") || "";


    return (
        <div >
            {homeData.about && homeData.about[0] && (
                <Navbar navbarData={homeData.menu[0]} />
            )}
           
            {homeData.about && homeData?.banner && (
                <Banner bannerData={homeData?.banner} />
            )}
            <div id={aboutId} className=''>
                {homeData.about && homeData.about[0] && (
                    <AboutUs aboutData={homeData.about[0]} />
                )}
            </div>
            {homeData.possible && homeData.possible[0] && (
                <MissionVision missionVisionData={homeData.possible[0]} />
            )}

            <div id={serviceId} className=''>
                {homeData.service && homeData.service[0] && (
                    <Ourcorevalues coreValuesData={homeData.service[0]} />
                )}
            </div>

            {homeData.ourcomprenhensive && homeData.ourcomprenhensive[0] && (
                <OurComprehensiveServices ourcomprenhensiveData={homeData.ourcomprenhensive[0]} />
            )}

            {homeData.whychooseus && homeData.whychooseus[0] && (
                <ChooseUs chooseUsData={homeData.whychooseus[0]} />
            )}

            <div id={contactId}>
                {homeData.contact && homeData.contact[0] && (
                    <HearForm contactData={homeData.contact[0]} />
                )}
            </div>
        </div>

    )
}

export default Main