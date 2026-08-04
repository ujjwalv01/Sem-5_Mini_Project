'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialSlider from '@/components/TestimonialSlider';
import AvailableSpacesPlaceholder from '@/components/AvailableSpacesPlaceholder';
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
    const router = useRouter();
    // Search parameters
    const [location, setLocation] = useState('');
    const [otherLocation, setOtherLocation] = useState('');
    const [spaceType, setSpaceType] = useState('');
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const autocompleteInputRef = useRef(null);
    // Initialize autocomplete for main hero search box
    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
        if (!apiKey || apiKey === 'your-google-maps-api-key')
            return;
        setOptions({
            key: apiKey,
            v: 'weekly',
        });
        importLibrary("places").then(() => {
            const google = window.google;
            if (autocompleteInputRef.current) {
                const autocomplete = new google.maps.places.Autocomplete(autocompleteInputRef.current, {
                    types: ['(regions)'],
                    componentRestrictions: { country: 'in' }
                });
                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    if (!place.geometry || !place.geometry.location)
                        return;
                    setLat(place.geometry.location.lat());
                    setLng(place.geometry.location.lng());
                    setOtherLocation(place.formatted_address || place.name || '');
                });
            }
        }).catch((err) => {
            console.error('Failed to load Google Maps inside home', err);
        });
    }, []);
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        const finalLocation = location === 'Other' ? otherLocation : location;
        if (finalLocation)
            params.set('city', finalLocation);
        if (spaceType)
            params.set('spaceType', spaceType);
        if (lat !== null)
            params.set('lat', lat.toString());
        if (lng !== null)
            params.set('lng', lng.toString());
        router.push(`/search-spaces?${params.toString()}`);
    };
    const sections = [
        {
            image: '/lms-1.jpg',
            preheading: 'PROJECT OVERVIEW',
            heading: 'Discover Medical Spaces',
            text: 'Explore medical spaces, manage listings, and discover the core features of the MedSpace college project.'
        }, 
        
        {
    image: '/lms-2.jpg',
    preheading: 'SPACE LISTING',
    heading: 'Share Available Medical Spaces',
    text: 'Allow healthcare professionals to publish available medical spaces and help others easily discover suitable workspaces.',
    buttonLabel: 'List a Space',
    buttonLink: '/list-your-space'
},
        {
    image: '/lms-3.jpg',
    preheading: 'SMART SEARCH',
    heading: 'Find the Right Medical Space',
    text: 'Search medical spaces using location and availability filters to quickly find the most suitable option.',
    buttonLabel: 'Search Spaces',
    buttonLink: '/search-spaces'
},
        {
    image: '/lms-4.jpg',
    preheading: 'USER FRIENDLY',
    heading: 'Simple and Intuitive Interface',
    text: 'MedSpace provides an easy-to-use interface that helps users browse, explore, and manage medical spaces efficiently.',
    buttonLabel: 'Explore',
    buttonLink: '/search-spaces'
},
        {
    image: '/lms-5.jpg',
    preheading: 'MODERN TECHNOLOGY',
    heading: 'Built with Modern Web Technologies',
    text: 'Developed using Next.js, Tailwind CSS, MongoDB, Prisma, and NextAuth to demonstrate a modern full-stack web application.',
    buttonLabel: 'Search Spaces',
    buttonLink: '/search-spaces'
}

    ];
    return (<div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      {/* Hero Header */}
      <div className="w-full bg-[#e8edf2] py-4 px-6 text-center shadow-sm relative z-20">
        <h2 className="text-xl sm:text-2xl font-bold text-[#204066] mb-1">Medical Space Management Made Simple</h2>
        <p className="text-[#3b5998] text-sm sm:text-base font-medium">A college project for discovering and managing medical spaces.</p>
      </div>

      {/* Hero Split Section */}
      <section className="flex flex-col md:flex-row w-full min-h-[calc(100vh-160px)]">
        {/* Left Half (Red) */}
        <div className="w-full md:w-1/2 bg-[#eb5253] flex flex-col justify-center items-center text-center p-12 sm:p-20 relative overflow-hidden group">
          <div className="relative z-10 space-y-6 max-w-md mx-auto flex flex-col items-center">
            <p className="text-white text-xs sm:text-sm font-bold tracking-[0.2em]">EXPLORE</p>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              List Medical Spaces
            </h1>
            <button onClick={() => router.push('/list-your-space')} className="mt-8 border border-white/80 hover:bg-white hover:text-[#eb5253] text-white transition-all duration-300 rounded-none px-8 py-3 flex flex-col items-center group-hover:scale-105">
              <div className="flex items-center gap-2 font-bold text-lg">
                <span>List a Space</span>
                <ArrowRight className="w-5 h-5"/>
              </div>
              <div className="text-[10px] sm:text-xs font-bold opacity-90 mt-1 uppercase tracking-wider">Quick & Easy Listing</div>
            </button>
          </div>
        </div>

        {/* Right Half (Blue) */}
        <div className="w-full md:w-1/2 bg-[#4c668b] flex flex-col justify-center items-center text-center p-12 sm:p-20 relative overflow-hidden group">
          <div className="relative z-10 space-y-6 max-w-md mx-auto flex flex-col items-center">
            <p className="text-white text-xs sm:text-sm font-bold tracking-[0.2em]">DISCOVER</p>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Find Medical Spaces
            </h1>
            <button onClick={() => router.push('/search-spaces')} className="mt-8 border border-white/80 hover:bg-white hover:text-[#4c668b] text-white transition-all duration-300 rounded-none px-8 py-3 flex items-center gap-2 group-hover:scale-105 h-[68px]">
              <span className="font-bold text-lg">Browse Spaces</span>
              <ArrowRight className="w-5 h-5"/>
            </button>
          </div>
        </div>
      </section>

      

      {/* Alternating Content Sections */}
      <div className="bg-slate-50/50">
        {sections.map((section, idx) => {
            const isEven = idx % 2 === 1;
            return (<section key={idx} className="py-16 sm:py-24 max-w-[1200px] mx-auto px-6">
              <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-video lg:aspect-[4/3] w-full mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50">
                    <Image src={section.image} alt={section.heading} fill className="object-cover"/>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 space-y-6">
                  {section.preheading && (<p className="text-[#eb5253] text-xs sm:text-sm font-bold uppercase tracking-[0.15em] mb-2">
                      {section.preheading}
                    </p>)}
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#204066] leading-tight">
                    {section.heading}
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {section.text}
                  </p>
                  {section.buttonLabel && section.buttonLink && (<div className="pt-4">
                      <Link href={section.buttonLink} className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-teal-600/20 active:scale-[0.98] transition-all">
                        {section.buttonLabel}
                        <ArrowRight className="w-5 h-5"/>
                      </Link>
                    </div>)}
                </div>
              </div>
            </section>);
        })}
      </div>

      <AvailableSpacesPlaceholder />
      
      <TestimonialSlider />

      <Footer />
    </div>);
}
