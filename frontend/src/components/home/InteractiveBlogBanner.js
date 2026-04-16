import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiArrowRight } from 'react-icons/fi';

const InteractiveBlogBanner = () => {
  return (
    <section className="py-6 bg-white overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12">
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="bg-[#0b1d3d] rounded p-8 md:p-14 relative overflow-hidden shadow-sm"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-3/5 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                Get the Latest <span className="text-[#ED1C24]">Updates</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-lg mb-8">
                Subscribe to our newsletter to receive the latest electrical safety tips and industry news directly in your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto md:mx-0">
                <input 
                   type="email" 
                   placeholder="Enter your email address" 
                   className="flex-grow bg-white/10 border border-white/20 rounded-xl py-3.5 px-5 text-white focus:outline-none focus:border-white transition-all text-sm font-medium"
                />
                <button className="bg-white  hover:bg-white hover:text-slate-900 text-slate-800 px-7 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg">
                  Subscribe Now <FiArrowRight />
                </button>
              </div>
            </div>

            <div className="hidden md:block md:w-1/3">
              <motion.div
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="w-40 h-40 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 mx-auto"
              >
                 <span className="text-7xl">📬</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveBlogBanner;
