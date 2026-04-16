import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiInfo, FiTag, FiShoppingCart, FiSettings } from 'react-icons/fi';
import ServiceServices from '@services/ServiceServices';
import ProductServices from '@services/ProductServices';
import useUtilsFunction from '@hooks/useUtilsFunction';
import MainModal from '@components/modal/MainModal';
import ProductCard from '@components/product/ProductCard';
import ProductEnquiryModal from '@components/modal/ProductEnquiryModal';

const ServicesSection = () => {
    const [services, setServices] = useState([]);
    const [activeService, setActiveService] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { showingTranslateValue, currency, getNumber } = useUtilsFunction();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await ServiceServices.getShowingServices();
                setServices(data || []);
                if (data && data.length > 0) {
                    setActiveService(data[0]);
                }
            } catch (err) {
                console.error("Error fetching services:", err);
            }
        };
        fetchServices();
    }, []);

    useEffect(() => {
        if (activeService) {
            const fetchProducts = async () => {
                try {
                    setLoading(true);
                    const data = await ProductServices.getProductsByService({ serviceSlug: activeService.slug });
                    setProducts(data || []);
                } catch (err) {
                    console.error("Error fetching products:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchProducts();
        }
    }, [activeService]);

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <section className="bg-[#0b1d3d] py-16 md:py-24 overflow-hidden relative">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-red-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-3xl md:text-3xl font-black text-white mb-6 uppercase tracking-tight">
                            Explore Our Services
                        </h2>
                        <div className="w-24 h-1.5 bg-[#ED1C24] rounded-full mb-10"></div>
                    </motion.div>
                    
                    {/* Service Tabs - Fixed to show correctly */}
                    <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-16">
                        {services.map((service) => (
                            <button
                                key={service._id}
                                onClick={() => setActiveService(service)}
                                className={`px-6 md:px-10 py-3 md:py-2 rounded font-bold text-sm md:text-base transition-all duration-300 transform active:scale-95 border-2 ${
                                    activeService?._id === service._id
                                        ? "bg-white text-[#0b1d3d] border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                        : "bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/40"
                                }`}
                            >
                                {showingTranslateValue(service.name)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid - Using standard ProductCard UI */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <div key={`skeleton-${i}`} className="bg-white/5 rounded-xl h-[320px] animate-pulse"></div>
                            ))
                        ) : (
                            products.map((product, index) => (
                                <motion.div
                                    key={product._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="h-full"
                                >
                                    <ProductCard 
                                        product={product} 
                                        onEnquire={(p) => handleViewDetails(p)} 
                                        overrideCategoryName={showingTranslateValue(activeService?.name)}
                                        hideHoverActions={true}
                                        hideAddToCart={true}
                                        forceEnquiry={true}
                                    />
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {products.length === 0 && !loading && (
                    <div className="text-center py-24 bg-white/5 rounded-3xl border border-white/10">
                        <FiSettings className="w-16 h-16 mx-auto mb-6 text-white/20 animate-spin-slow" />
                        <h3 className="text-2xl font-bold text-white mb-2">No Products Found</h3>
                        <p className="text-white/50">We are currently updating our products for {showingTranslateValue(activeService?.name)}. Please check back soon!</p>
                    </div>
                )}
            </div>

            {/* Product Enquiry Modal - Reusable */}
            <ProductEnquiryModal
                modalOpen={isModalOpen}
                setModalOpen={setIsModalOpen}
                product={selectedProduct}
                selectedVariant={selectedProduct?.variants?.[0]}
            />


            <style jsx>{`
                .custom-modal-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: #cbd5e1 transparent;
                }
                .custom-modal-scroll::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-modal-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-modal-scroll::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #ccc;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #999;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>

        </section>
    );
};

export default ServicesSection;


