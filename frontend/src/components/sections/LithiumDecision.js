import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const LithiumDecision = () => {
    const { storeCustomizationSetting } = useGetSetting();
    const { showingTranslateValue } = useUtilsFunction();
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl box-glow">
                        <img
                            src={storeCustomizationSetting?.home?.quick_section_image || "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80"}
                            alt="Lithium Technology"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                            {showingTranslateValue(storeCustomizationSetting?.home?.popular_title) || "Transforming Your Energy Future"}
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {showingTranslateValue(storeCustomizationSetting?.home?.popular_description) || "Unlock the potential of cutting-edge technology. From residential safety to industrial reliability, our solutions are designed for longevity, performance, and peace of mind."}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2">High Efficiency</h3>
                                <p className="text-sm text-gray-500">Maximum energy retention and ultra-fast capabilities.</p>
                            </div>
                            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2">Built to Last</h3>
                                <p className="text-sm text-gray-500">Engineered for thousands of cycles with minimal degradation.</p>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Link
                                href="/search"
                                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                EXPLORE SOLUTIONS
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LithiumDecision;
