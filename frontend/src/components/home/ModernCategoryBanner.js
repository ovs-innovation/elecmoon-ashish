import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiShield, FiTrendingUp, FiGlobe } from 'react-icons/fi';

const BenefitCard = ({ icon: Icon, title, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="flex items-center gap-4 px-8 py-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl group hover:bg-white/10 transition-colors"
  >
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ED1C24] to-red-600 flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform">
      <Icon />
    </div>
    <span className="text-white font-bold text-sm tracking-wide uppercase">{title}</span>
  </motion.div>
);

const ModernCategoryBanner = () => {
  return (
    <section className="bg-[#051124] py-8 overflow-hidden relative">
      {/* Moving Background Elements */}
      <motion.div 
         animate={{ rotate: 360 }}
         transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
         className="absolute -top-40 -left-40 w-96 h-96 border border-white/5 rounded-full pointer-events-none"
      />
      <motion.div 
         animate={{ rotate: -360 }}
         transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
         className="absolute -bottom-40 -right-40 w-[500px] h-[500px] border border-white/5 rounded-full pointer-events-none"
      />

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
           <div className="lg:w-2/5">
             <motion.h3 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="text-white text-3xl md:text-5xl font-black mb-4 leading-tight"
             >
               The Future of <span className="text-[#ED1C24]">Power</span>
             </motion.h3>
             <div className="w-16 h-1 bg-[#ED1C24] rounded-full" />
           </div>

           <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <BenefitCard icon={FiZap} title="Instant Energy" delay={0.1} />
              <BenefitCard icon={FiShield} title="Certified Safety" delay={0.2} />
              <BenefitCard icon={FiTrendingUp} title="Power Analytics" delay={0.3} />
              <BenefitCard icon={FiGlobe} title="Global Standards" delay={0.4} />
           </div>
        </div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#051124] via-transparent to-[#051124] pointer-events-none opacity-50" />
    </section>
  );
};

export default ModernCategoryBanner;
