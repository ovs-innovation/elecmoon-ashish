import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@layout/Layout";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import useUtilsFunction from "@hooks/useUtilsFunction";

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const servicesList = [
    {
        id: "oem-solutions",
        title: "OEM Solutions",
        icon: "⚙️",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80",
        description:
            "ARB has always focused on introducing innovative technology in front of the world. The Original Equipment Manufacturer solutions of ARB have provided to be the best choice in every challenge. This technology is used to build standard products for our business partners. We understand how crucial a role an OEM partnership plays in product manufacturing. That is why we consider every minor detail of our clients to maintain their standards in production and delivery. Our services are not limited to engineering and designing as we provide a full solution for our manufacturers. Our Development team is motivated to help our clients prioritize the performance and their experience. You can trust us as with your requirements as we are one of the companies offering complete battery solutions to our clients.",
        href: "/service/oem-solutions",
    },
    {
        id: "engineering-design",
        title: "Engineering & Design",
        icon: "🔧",
        image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=1600&q=80",
        description:
            "Our engineering and design team brings decades of experience in battery technology and power systems. We offer end-to-end design services from concept to production, including schematic design, PCB layout, thermal management, and mechanical integration. Our engineers work closely with clients to ensure every product meets the highest standards of performance, safety, and reliability. Whether you need a custom battery pack or a full power management system, our team can deliver innovative solutions tailored to your exact requirements.",
        href: "/service/engineering-design",
    },
    {
        id: "complete-battery-solutions",
        title: "Complete Battery Solutions",
        icon: "🔋",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=80",
        description:
            "We offer a comprehensive range of battery solutions covering design, manufacturing, testing, and deployment. Our complete battery solutions include lithium-ion cell selection, BMS integration, pack assembly, and quality assurance. We support industries ranging from electric vehicles to energy storage systems, ensuring our clients receive the most efficient and cost-effective power solutions available. Our team ensures every battery solution is built to last, with full lifecycle support and after-sales service.",
        href: "/service/complete-battery-solutions",
    },
    {
        id: "custom-manufacturing-support",
        title: "Custom Manufacturing Support",
        icon: "🏭",
        image: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=1600&q=80",
        description:
            "Our custom manufacturing support services help businesses scale production efficiently. We provide guidance on process optimization, quality control, supply chain management, and factory setup. Whether you are launching a new product or scaling an existing one, our manufacturing experts are here to support every stage of your production journey. We leverage our global network of manufacturing partners to ensure the highest quality at competitive costs.",
        href: "/service/custom-manufacturing-support",
    },
    {
        id: "energy-storage-systems",
        title: "Energy Storage Systems",
        icon: "⚡",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=80",
        description:
            "Our energy storage system solutions are designed for residential, commercial, and industrial applications. We design and supply high-performance battery storage systems that integrate seamlessly with solar, grid, and hybrid power setups. Our ESS products are engineered for maximum efficiency, safety, and longevity, helping businesses and homeowners reduce energy costs and carbon footprint. Each system comes with intelligent management software for real-time monitoring and control.",
        href: "/service/energy-storage-systems",
    },
    {
        id: "rnd-support",
        title: "R&D Support",
        icon: "🔬",
        image: "https://images.unsplash.com/photo-1532187896946-dbb5a40ff875?w=1600&q=80",
        description:
            "Innovation is at the heart of everything we do. Our dedicated R&D team continuously explores new battery chemistries, manufacturing techniques, and power management strategies. We collaborate with universities, research institutions, and industry partners to stay at the forefront of technology. Whether you need support with prototyping, testing, or patent development, our R&D division is equipped to help you bring new ideas to life quickly and cost-effectively.",
        href: "/service/rnd-support",
    },
    {
        id: "consultancy",
        title: "Consultancy Services",
        icon: "💼",
        image: "https://images.unsplash.com/photo-1454165833761-1216b2808c23?w=1600&q=80",
        description:
            "Our expert consultants provide strategic guidance on battery technology selection, market entry, regulatory compliance, and business development. We work with startups, established companies, and government bodies to develop actionable roadmaps for success. From feasibility studies to full project management, our consultancy team brings deep industry knowledge and hands-on experience to every engagement. Trust us to help you make informed decisions that drive long-term growth and sustainability.",
        href: "/service/consultancy",
    },
    {
        id: "advanced-prototyping",
        title: "Advanced Prototyping",
        icon: "📐",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80",
        description:
            "We provide high-precision prototyping services for custom power solutions and mechanical components. Our team uses state-of-the-art 3D printing, CNC machining, and rapid circuit board assembly to bring your concepts to life in record time. This allows for rigorous testing and validation before full-scale manufacturing, minimizing risks and ensuring the final product meets all functional requirements and performance benchmarks.",
        href: "/service/advanced-prototyping",
    },
];

const ServicesPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isGridVisible, setIsGridVisible] = useState(false);
    const [activeService, setActiveService] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const gridRef = useRef(null);
    const { showingTranslateValue } = useUtilsFunction();

    useEffect(() => {
        setIsVisible(true);
        
        // Fetch real services from DB
        import("@services/ServiceServices").then(({ default: SS }) => {
            SS.getShowingServices().then(res => {
                setServices(res || []);
                setLoading(false);
            }).catch(() => setLoading(false));
        });

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsGridVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (gridRef.current) {
            observer.observe(gridRef.current);
        }

        return () => {
            if (gridRef.current) {
                observer.unobserve(gridRef.current);
            }
        };
    }, []);

    // Placeholder data for services that don't have images/icons in DB but we want them to look good
    const getServiceDisplayData = (service) => {
        const defaultImages = [
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80",
            "https://images.unsplash.com/photo-1574169208507-84376144848b?w=1600&q=80",
            "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=80",
            "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=1600&q=80"
        ];
        
        return {
            title: showingTranslateValue(service.name),
            description: showingTranslateValue(service.description) || "Reliable and innovative solutions for your power needs.",
            image: service.image || defaultImages[Math.floor(Math.random() * defaultImages.length)],
            icon: service.icon || "⚡",
            href: `/service/${service.slug}`
        };
    };

    return (
        <Layout
            title="Our Services"
            description="Explore our comprehensive range of battery and power solutions including OEM, Engineering, Energy Storage, R&D and more."
        >
            {/* Service Top Slider Section */}
            <div className="relative w-full h-[600px] lg:h-[750px] overflow-hidden group">
                {/* Floating CTA Button Overlay */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[50] w-full max-w-screen-2xl px-4 pointer-events-none">
                    <div className="flex justify-center md:justify-end pointer-events-auto">
                        <Link 
                            href="/request-a-quote"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#ff5c23] hover:bg-[#0b1d3d] text-white font-black rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(255,92,35,0.4)] hover:shadow-2xl text-lg uppercase tracking-wider"
                        >
                            <span className="text-2xl">📝</span>
                            Request A Quote
                        </Link>
                    </div>
                </div>

                <Swiper
                    modules={[Autoplay, EffectFade, Navigation, Pagination]}
                    effect="fade"
                    speed={1200}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    loop={true}
                    className="w-full h-full"
                >
                    {(services.length > 0 ? services : servicesList).map((item, idx) => {
                        const service = item.id ? item : getServiceDisplayData(item);
                        return (
                        <SwiperSlide key={item._id || item.id || idx} className="relative w-full h-full">
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-[8s] scale-100 group-hover:scale-110"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                                <div className="absolute inset-0 bg-black/30" />
                            </div>

                            {/* Slide Content */}
                            <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-10 lg:px-20 h-full flex items-center">
                                <div className="max-w-3xl space-y-8">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#ff5c23]/10 backdrop-blur-md rounded-lg border border-[#ff5c23]/30">
                                        <span className="text-3xl">{service.icon}</span>
                                        <span className="text-[#ff5c23] font-black uppercase tracking-widest text-sm">Premier Service</span>
                                    </div>
                                    
                                    <h2 className="text-white font-black text-4xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight">
                                        {service.title}
                                    </h2>
                                    
                                    <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium line-clamp-3">
                                        {service.description.split('.')[0]}. {service.description.split('.')[1] || ''}
                                    </p>

                                    <div className="flex flex-wrap gap-5 pt-4">
                                        <Link
                                            href={service.href}
                                            className="px-10 py-5 bg-[#ff5c23] hover:bg-white hover:text-[#0b1d3d] text-white font-black rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl text-lg flex items-center gap-3"
                                        >
                                            Explore Details
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                        <Link
                                            href="/contact-us"
                                            className="px-10 py-5 border-2 border-white/40 hover:border-white text-white font-black rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm text-lg"
                                        >
                                            Inquire Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );})}

                    {/* Navigation Buttons */}
                    <div className="swiper-button-prev !bg-white/10 !backdrop-blur-md !w-16 !h-16 !rounded-full !text-white hover:!bg-[#ff5c23] transition-all after:!text-xl after:!font-black group-hover:translate-x-4 -translate-x-full duration-500 shadow-2xl" />
                    <div className="swiper-button-next !bg-white/10 !backdrop-blur-md !w-16 !h-16 !rounded-full !text-white hover:!bg-[#ff5c23] transition-all after:!text-xl after:!font-black group-hover:-translate-x-4 translate-x-full duration-500 shadow-2xl" />
                </Swiper>

                {/* Custom Swiper Pagination Styling */}
                <style jsx global>{`
                    .swiper-pagination-bullet {
                        width: 40px !important;
                        height: 5px !important;
                        border-radius: 5px !important;
                        background: rgba(255, 255, 255, 0.4) !important;
                        opacity: 1 !important;
                        transition: all 0.3s ease !important;
                    }
                    .swiper-pagination-bullet-active {
                        background: #ff5c23 !important;
                        width: 60px !important;
                    }
                    .swiper-button-next:after, .swiper-button-prev:after {
                        font-family: swiper-icons;
                    }
                `}</style>
            </div>

            {/* Introductory Content - Restored and Enhanced */}
            <div className="relative py-16 lg:py-24 bg-white overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50" />

                <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-10 text-center">
                    <p
                        className={`text-[#ff5c23] font-black text-sm uppercase tracking-[0.3em] mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                            }`}
                    >
                        Our services
                    </p>
                    <h1
                        className={`text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b1d3d] leading-tight max-w-5xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                            }`}
                    >
                        Helping thousands of businesses in creating their <span className="text-[#ff5c23]">dream product</span> in a simple and affordable way
                    </h1>
                    <p
                        className={`mt-8 text-gray-500 text-lg sm:text-xl max-w-3xl mx-auto font-medium transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                            }`}
                    >
                        From OEM solutions to R&D support, we deliver end-to-end battery and power solutions tailored to your business needs, ensuring maximum performance and reliability.
                    </p>
                    
                    <div
                        className={`mt-12 flex flex-wrap justify-center gap-6 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                            }`}
                    >
                        <Link
                            href="/request-a-quote"
                            className="px-10 py-4 bg-[#0b1d3d] hover:bg-[#ff5c23] text-white font-black rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-[#ff5c23]/20"
                        >
                            Get a Free Quote
                        </Link>
                        <Link
                            href="/contact-us"
                            className="px-10 py-4 border-2 border-gray-200 hover:border-[#ff5c23] text-[#0b1d3d] hover:text-[#ff5c23] font-black rounded-full transition-all duration-300 transform hover:scale-105"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            {/* Services List Section - Modern & Clean Grid */}
            <div className="relative py-24 bg-gray-50/50">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <p className="text-[#ff5c23] font-black uppercase tracking-[0.2em] mb-3 text-sm">
                            Core Capabilities
                        </p>
                        <h2 className="text-3xl md:text-5xl font-black text-[#0b1d3d] mb-4">
                            Tailored <span className="text-[#ff5c23]">Solutions</span> for Your Success
                        </h2>
                        <div className="w-24 h-1.5 bg-[#ff5c23] mx-auto rounded-full" />
                    </div>

                    {/* Grid Layout */}
                    <div 
                        ref={gridRef}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start"
                    >
                        {(services.length > 0 ? services : servicesList).map((item, idx) => {
                            const service = item.id ? item : getServiceDisplayData(item);
                            const serviceKey = item._id || item.id || idx;
                            return (
                            <div
                                key={serviceKey}
                                className={`group transition-all duration-700 ease-out ${isGridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                                style={{ transitionDelay: `${idx * 100}ms` }}
                            >
                                <div
                                    className={`relative flex flex-col rounded-[2rem] bg-white transition-all duration-500 overflow-hidden shadow-lg border cursor-pointer ${activeService === serviceKey
                                            ? "border-[#ff5c23] shadow-2xl scale-[1.02] z-20"
                                            : "border-gray-100 hover:border-[#ff5c23]/30 hover:shadow-xl hover:-translate-y-1 z-10"
                                        }`}
                                    onClick={() => setActiveService(activeService === serviceKey ? null : serviceKey)}
                                >
                                    {/* Accent Decoration */}
                                    <div className={`absolute top-0 right-0 w-24 h-24 bg-orange-50/50 rounded-bl-[4rem] transition-transform duration-700 group-hover:scale-150 ${activeService === serviceKey ? 'bg-[#ff5c23]/5' : ''}`} />

                                    <div className="relative z-10 p-5 flex flex-col h-full">
                                        {/* Icon Container */}
                                        <div className="mb-5 w-11 h-11 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-50 transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                                            <span className="text-2xl filter drop-shadow-sm">{service.icon}</span>
                                        </div>

                                        <h3 className={`text-base font-extrabold text-[#0b1d3d] mb-3 transition-colors duration-300 ${activeService === serviceKey ? 'text-[#ff5c23]' : 'group-hover:text-[#ff5c23]'}`}>
                                            {service.title}
                                        </h3>
                                        
                                        {activeService !== serviceKey && (
                                            <p className="text-gray-500 text-[12px] leading-relaxed mb-4 line-clamp-2">
                                                {service.description.substring(0, 80)}...
                                            </p>
                                        )}

                                        {/* Interaction Indicator */}
                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-[#ff5c23] font-bold text-[10px] uppercase tracking-widest">
                                                {activeService === serviceKey ? "Close" : "Learn More"}
                                            </span>
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${activeService === serviceKey ? 'bg-[#ff5c23] text-white rotate-180' : 'bg-gray-50 text-[#ff5c23] group-hover:bg-[#ff5c23] group-hover:text-white'}`}>
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Expandable Content Area */}
                                        <div
                                            className={`transition-all duration-500 ease-in-out overflow-hidden ${activeService === serviceKey ? "max-h-[500px] mt-6 opacity-100" : "max-h-0 opacity-0"}`}
                                        >
                                            <div className="pt-6 border-t border-gray-50 text-gray-600 text-[12px] leading-relaxed">
                                                {service.description}
                                                <div className="mt-6">
                                                    <Link
                                                        href={service.href}
                                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0b1d3d] hover:bg-[#ff5c23] text-white font-bold rounded-lg transition-all duration-300 shadow-lg text-[11px]"
                                                    >
                                                        Visit Service
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );})}
                    </div>
                </div>
            </div>


            {/* Why Choose Us Section - Premium Modern */}
            <div className="relative py-32 bg-[#050c1a] overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff5c23]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="flex flex-col items-center text-center mb-20">
                        <span className="text-[#ff5c23] font-bold uppercase tracking-[0.3em] mb-4 text-xs">
                            Unrivaled Excellence
                        </span>
                        <h2 className="text-white text-3xl md:text-5xl font-black mb-6">
                            Setting the Standard in <br /> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5c23] to-orange-400">Battery Innovation</span>
                        </h2>
                        <div className="w-20 h-1 bg-white/20 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: "🏆", title: "Industry Leader", desc: "Over a decade of excellence in the advanced power storage sector worldwide." },
                            { icon: "🛡️", title: "Safety First", desc: "Rigorous ISO-certified quality control and safety mechanisms in every product." },
                            { icon: "⚡", title: "Rapid Deployment", desc: "Proprietary logistics network ensuring timely global delivery and setup." },
                            { icon: "🌐", title: "Global Footprint", desc: "Strategic operations and support across 4 major continents and 20+ countries." },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group relative p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500"
                            >
                                <div className="text-5xl mb-8 transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 inline-block filter drop-shadow-lg">
                                    {item.icon}
                                </div>
                                <h3 className="text-white font-extrabold text-xl mb-4 group-hover:text-[#ff5c23] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Final CTA Section - High Impact Glassmorphism */}
            <div className="relative py-32 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="relative rounded-[4rem] p-12 lg:p-24 overflow-hidden border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                        {/* Background Accents */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-50/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-50/30 to-transparent" />
                        
                        <div className="relative z-10 text-center max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-black text-[#0b1d3d] mb-8 leading-tight">
                                Ready to Power Your <br /> 
                                <span className="text-[#ff5c23]">Next Big Innovation?</span>
                            </h2>
                            <p className="text-gray-500 text-xl mb-12 font-medium">
                                Partner with PowerQ for bespoke battery solutions that drive efficiency and growth for your enterprise.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Link
                                    href="/request-a-quote"
                                    className="px-12 py-5 bg-[#ff5c23] hover:bg-[#0b1d3d] text-white font-black rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                                >
                                    Get Priority Quote
                                </Link>
                                <Link
                                    href="/contact-us"
                                    className="px-12 py-5 border-2 border-gray-200 hover:border-[#ff5c23] text-[#0b1d3d] hover:text-[#ff5c23] font-black rounded-full transition-all duration-300 transform hover:scale-105 bg-white/50 backdrop-blur-sm"
                                >
                                    Contact Support
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ServicesPage;
