import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: "ALTERA", style: "font-serif italic" },
  { name: "ANALOG DEVICES", style: "font-sans font-bold" },
  { name: "ATMEL", style: "font-mono font-black" },
  { name: "AVAGO", style: "font-sans uppercase tracking-[0.2em]" },
  { name: "BCD", style: "font-serif font-black underline decoration-red-500" },
  { name: "GALAXY ELECTRICAL", style: "font-sans font-extrabold" },
  { name: "BOURNS", style: "font-mono font-bold italic" },
  { name: "BURR-BROWN", style: "font-sans uppercase font-black" },
  { name: "CATALYST", style: "font-serif italic font-bold" },
  { name: "CENTRAL", style: "font-sans font-black text-red-700" },
  { name: "CYPRESS", style: "font-mono font-black text-blue-800" },
  { name: "ST MICRO", style: "font-sans font-black italic" },
  { name: "TEXAS INSTRUMENTS", style: "font-serif font-black" },
  { name: "NXP", style: "font-sans font-bold tracking-tighter" },
];

const BrandSlider = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 my-10 lg:my-16">
      {/* Title above the slider */}
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-black text-[#0b1d3d] tracking-tight">
          Popular Brands
        </h2>
      </div>

      <div className="flex h-16 lg:h-24 border-2 border-[#f39c12]/40 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(243,156,18,0.08)] bg-white relative">
        
        {/* Infinite Scrolling Container */}
        <div className="flex-grow relative overflow-hidden flex items-center bg-white">
          <motion.div 
            className="flex items-center gap-16 lg:gap-28 whitespace-nowrap px-10"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ 
                duration: 40, 
                repeat: Infinity, 
                ease: "linear" 
            }}
          >
            {/* Row 1: Triple elements for seamless loop */}
            {[...brands, ...brands, ...brands].map((brand, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-3 lg:gap-4 group cursor-default select-none grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105`}
              >
                <span className={`text-xl lg:text-3xl font-black text-gray-400 group-hover:text-gray-800 transition-colors ${brand.style}`}>
                  {brand.name}
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#f39c12] to-yellow-300 opacity-20 group-hover:opacity-100 transition-opacity shadow-sm" />
              </div>
            ))}
          </motion.div>
          
          {/* Subtle Glassmorphism Gradient Fades for Depth */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;
