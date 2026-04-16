import React from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

const CountUp = ({ value, duration = 2.5, suffix = "+" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6 }
      }}
      viewport={{ once: true, amount: 0.5 }}
      onViewportEnter={() => {
        const controls = animate(count, value, {
          duration: duration,
          ease: "easeOut",
          onUpdate: (latest) => setDisplayValue(Math.floor(latest))
        });
        return controls.stop;
      }}
      className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-[#4FC3F7]"
    >
      {displayValue.toLocaleString()}{suffix}
    </motion.div>
  );
};

const StatsBar = () => {
  const stats = [
    { label: "Orders Fulfilled", value: 10000 },
    { label: "Customers", value: 6000 },
    { label: "Total Products", value: 75000 },
    { label: "Industrial Categories", value: 50 },
  ];

  return (
    <div className="w-full bg-white py-12 lg:py-20 border-t border-gray-100 relative overflow-hidden">
      {/* Decorative Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0b1d3d] via-[#1a365d] to-[#0b1d3d]"></div>
      
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center space-y-2">
              <CountUp value={stat.value} />
              <span className="text-gray-500 font-bold text-sm lg:text-lg uppercase tracking-widest opacity-80">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#4FC3F7] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#0b1d3d] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>
    </div>
  );
};

export default StatsBar;
