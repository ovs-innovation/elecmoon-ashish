import React from 'react';
import { motion } from 'framer-motion';
import { FiPhoneCall, FiSettings, FiCheckCircle } from 'react-icons/fi';

const Step = ({ number, title, desc, icon: Icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="relative flex flex-col items-center text-center p-8 bg-[#0b1d3d] rounded-[32px] border border-white/10 group cursor-default shadow-xl"
    >
      <div className="absolute top-4 right-4 text-white/5 text-6xl font-black">{number}</div>
      <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#ED1C24] to-[#c1151b] flex items-center justify-center text-white shadow-[0_10px_20px_rgba(237,28,36,0.25)] group-hover:-translate-y-1 transition-transform duration-500">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ED1C24] transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-tight px-2">{desc}</p>
    </motion.div>
  );
};

const ProcessSection = () => {
  return (
    <section className="py-10 bg-[#051124] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -left-20 top-0 w-80 h-80 bg-[#ED1C24] rounded-full blur-[120px] opacity-10" />
      <div className="absolute -right-20 bottom-0 w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-5" />

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 relative z-10">
        <div className="text-center mb-10">
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#ED1C24] font-bold tracking-[0.2em] uppercase text-[10px] mb-2"
          >
            How it works
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-black text-white mb-4"
          >
            Three Easy Steps to <span className="text-[#ED1C24]">Safety</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#ED1C24] to-transparent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          <Step
            number="01"
            title="Book a Consultation"
            desc="Schedule a free site assessment with our expert engineers today."
            icon={FiPhoneCall}
            delay={0.1}
          />
          <Step
            number="02"
            title="Site Analysis"
            desc="Our team conducts a thorough audit of your electrical systems."
            icon={FiSettings}
            delay={0.2}
          />
          <Step
            number="03"
            title="Implementation"
            desc="We provide reports and execute necessary safety solutions."
            icon={FiCheckCircle}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
