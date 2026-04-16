import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@layout/Layout";
import { FiCheckCircle, FiZap, FiShield, FiTrendingUp, FiGlobe } from "react-icons/fi";

const EnergyStorageSystem = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        {
            icon: <FiZap className="w-8 h-8" />,
            title: "High Energy Density",
            desc: "Our ESS solutions deliver industry-leading energy density, enabling more power storage in compact designs.",
            color: "text-[#ff5c23]",
            bg: "bg-orange-50",
        },
        {
            icon: <FiShield className="w-8 h-8" />,
            title: "Advanced BMS Protection",
            desc: "Integrated Battery Management System with multi-level protection against overcharge, over-discharge, and short-circuit.",
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            icon: <FiTrendingUp className="w-8 h-8" />,
            title: "Long Cycle Life",
            desc: "Engineered for 3000+ charge cycles with minimal capacity degradation, ensuring long-term ROI.",
            color: "text-green-600",
            bg: "bg-green-50",
        },
        {
            icon: <FiGlobe className="w-8 h-8" />,
            title: "Scalable Architecture",
            desc: "Modular design allows seamless scaling from kWh to MWh depending on your application requirements.",
            color: "text-purple-600",
            bg: "bg-purple-50",
        },
    ];

    const types = [
        {
            title: "Residential ESS",
            description:
                "Compact home energy storage systems designed to work with solar panels. Store excess solar energy during the day and use it at night, reducing your electricity bills significantly.",
            specs: ["Capacity: 5 kWh – 20 kWh", "Voltage: 48V / 96V", "Compatibility: All Major Solar Inverters", "Warranty: 5 Years"],
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
        },
        {
            title: "Commercial ESS",
            description:
                "Medium-scale energy storage solutions for offices, retail spaces, and commercial facilities. Optimize peak demand management and reduce energy costs with intelligent load balancing.",
            specs: ["Capacity: 50 kWh – 500 kWh", "Voltage: 100V – 600V DC", "Peak Shaving Capability", "Remote Monitoring Included"],
            image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80",
        },
        {
            title: "Industrial ESS",
            description:
                "Large-scale industrial energy storage for manufacturing plants, data centers, and utility-scale applications. Ensure uninterrupted operations with our grid-scale battery systems.",
            specs: ["Capacity: 500 kWh – 10+ MWh", "Grid-tie & Off-grid Modes", "IP55 Protection Rating", "24/7 Remote Management"],
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
        },
    ];

    const applications = [
        "Solar Energy Storage",
        "Grid Stabilization",
        "Backup Power / UPS",
        "EV Charging Stations",
        "Telecom Power Backup",
        "Industrial Peak Shaving",
        "Microgrids",
        "Off-Grid Applications",
    ];

    return (
        <Layout
            title="Energy Storage System | PowerQ"
            description="Explore PowerQ's advanced Energy Storage Systems — residential, commercial, and industrial battery storage solutions with high energy density and long cycle life."
        >
            {/* Hero Section */}
            <div className="relative bg-[#0b1d3d] text-white min-h-[420px] flex items-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1600&q=80"
                    alt="Energy Storage System"
                    fill
                    className="object-cover opacity-25"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b1d3d]/95 to-[#0b1d3d]/50" />
                <div className="relative max-w-screen-xl mx-auto px-4 sm:px-10 py-16">
                    <div
                        className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        <p className="text-[#ff5c23] font-bold uppercase tracking-widest text-sm mb-3">
                            Products / Lithium-ion Battery
                        </p>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 max-w-3xl">
                            Energy Storage System
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl leading-8 mb-8">
                            Let us see exactly what these energy storage systems are and their operation. Our advanced lithium-ion based ESS solutions are designed for residential, commercial, and utility-scale applications.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/request-a-quote"
                                className="px-8 py-3 bg-[#ff5c23] hover:bg-[#e04d18] text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Get a Quote
                            </Link>
                            <Link
                                href="/contact-us"
                                className="px-8 py-3 border-2 border-white/60 hover:border-white text-white font-bold rounded-full transition-all duration-300"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Intro Section */}
            <div className="bg-white py-16">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-10">
                    <div className="text-center mb-12">
                        <p className="text-[#ff5c23] font-bold uppercase tracking-widest text-sm mb-2">What Is ESS?</p>
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0b1d3d] mb-4">
                            LET US SEE EXACTLY WHAT THESE ENERGY STORAGE SYSTEMS AND THEIR OPERATION...
                        </h2>
                        <div className="w-24 h-1 bg-[#ff5c23] mx-auto mb-6" />
                        <p className="text-gray-600 text-lg leading-8 max-w-4xl mx-auto">
                            An Energy Storage System (ESS) is a device or group of devices assembled to store energy and release it on demand.
                            They are used to balance electricity supply and demand, improve power quality, and enable integration of renewable energy sources.
                            Our lithium-ion based systems offer superior performance, long life, and intelligent management.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className={`bg-white border border-gray-100 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                <div className={`${f.bg} ${f.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                    {f.icon}
                                </div>
                                <h3 className="text-[#0b1d3d] font-bold text-lg mb-2">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-6">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Types */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-10">
                    <div className="text-center mb-12">
                        <p className="text-[#ff5c23] font-bold uppercase tracking-widest text-sm mb-2">Our Product Range</p>
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0b1d3d]">Energy Storage Solutions</h2>
                    </div>

                    <div className="space-y-12">
                        {types.map((type, i) => (
                            <div
                                key={i}
                                className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                            >
                                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                                    <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                                        <Image
                                            src={type.image}
                                            alt={type.title}
                                            width={700}
                                            height={450}
                                            className="w-full object-cover h-72 group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d3d]/50 to-transparent" />
                                    </div>
                                </div>
                                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                                    <h3 className="text-2xl font-extrabold text-[#0b1d3d] mb-3">{type.title}</h3>
                                    <div className="w-12 h-1 bg-[#ff5c23] mb-4" />
                                    <p className="text-gray-600 leading-8 mb-6">{type.description}</p>
                                    <ul className="space-y-2">
                                        {type.specs.map((spec, j) => (
                                            <li key={j} className="flex items-center gap-3 text-gray-700 text-sm">
                                                <FiCheckCircle className="text-[#ff5c23] flex-shrink-0" />
                                                {spec}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href="/request-a-quote"
                                        className="inline-block mt-6 px-6 py-3 bg-[#0b1d3d] hover:bg-[#0e2550] text-white font-bold rounded-full transition-all duration-300 text-sm"
                                    >
                                        Enquire Now →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Applications */}
            <div className="bg-[#0b1d3d] py-14">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-10">
                    <p className="text-center text-[#ff5c23] font-bold uppercase tracking-widest text-sm mb-3">Use Cases</p>
                    <h2 className="text-center text-white text-3xl font-extrabold mb-10">Applications of Energy Storage Systems</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {applications.map((app, i) => (
                            <div
                                key={i}
                                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-center font-semibold text-sm hover:bg-[#ff5c23]/20 hover:border-[#ff5c23]/40 transition-all duration-300 cursor-default"
                            >
                                {app}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-white py-16">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <p className="text-[#ff5c23] font-bold uppercase tracking-widest text-sm mb-3">Ready to Get Started?</p>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0b1d3d] mb-5">
                        Get the Best Energy Storage Solution for Your Needs
                    </h2>
                    <p className="text-gray-600 text-lg mb-8">
                        Contact our experts today for a customized ESS solution tailored to your residential, commercial, or industrial requirements.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/request-a-quote"
                            className="px-8 py-3 bg-[#ff5c23] hover:bg-[#e04d18] text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Request a Free Quote
                        </Link>
                        <Link
                            href="/contact-us"
                            className="px-8 py-3 border-2 border-[#0b1d3d] hover:bg-[#0b1d3d] hover:text-white text-[#0b1d3d] font-bold rounded-full transition-all duration-300"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default EnergyStorageSystem;
