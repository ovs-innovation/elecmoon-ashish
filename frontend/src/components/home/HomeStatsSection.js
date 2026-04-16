import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiCheckCircle, FiShield, FiClock } from 'react-icons/fi';

const StatCard = ({ icon: Icon, count, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="relative p-8 rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center group overflow-hidden"
    >
      {/* Decorative background circle */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
      
      <div className="w-16 h-16 mb-6 rounded-2xl bg-red-50 flex items-center justify-center text-[#ED1C24] transform group-hover:rotate-12 transition-transform duration-300">
        <Icon className="w-8 h-8" />
      </div>
      
      <h3 className="text-4xl font-black text-gray-900 mb-2">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        >
          {count}
        </motion.span>
      </h3>
      <p className="text-gray-500 font-medium tracking-wide uppercase text-xs">
        {label}
      </p>
    </motion.div>
  );
};

const HomeStatsSection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Abstract background elements */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-red-50 rounded-full blur-[120px] opacity-40 pointer-events-none" />
      <div className="absolute -right-20 top-0 w-80 h-80 bg-blue-50 rounded-full blur-[100px] opacity-30 pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-red-50 text-[#ED1C24] text-xs font-bold uppercase tracking-widest border border-red-100 shadow-sm"
          >
            Our Impact
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight"
          >
            Excellence in <span className="text-[#ED1C24]">Power & Safety</span>
          </motion.h2>
          <motion.div
             initial={{ scaleX: 0 }}
             whileInView={{ scaleX: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.2 }}
             className="w-24 h-1.5 bg-[#ED1C24] mx-auto rounded-full mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium"
          >
            We've spent a decade building trust through uncompromising quality and safety standards. See our journey through numbers.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          <StatCard 
            icon={FiUsers} 
            count="2.5k+" 
            label="Satisfied Clients" 
            delay={0.1} 
          />
          <StatCard 
            icon={FiCheckCircle} 
            count="580+" 
            label="Projects Done" 
            delay={0.2} 
          />
          <StatCard 
            icon={FiShield} 
            count="12+" 
            label="Certifications" 
            delay={0.3} 
          />
          <StatCard 
            icon={FiClock} 
            count="15yrs+" 
            label="Experience" 
            delay={0.4} 
          />
        </div>
      </div>
    </section>
  );
};

export default HomeStatsSection;


