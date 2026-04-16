import React from 'react';
import { motion } from 'framer-motion';
import {
  FiTruck,
  FiShield,
  FiClock,
  FiUserCheck,
  FiCreditCard,
  FiHeadphones
} from 'react-icons/fi';

const benefits = [
  {
    icon: <FiTruck className="w-8 h-8" />,
    title: "On-Site Service",
    desc: "We come to you",
    color: "bg-blue-50 text-blue-600",
    border: "group-hover:border-blue-200"
  },
  {
    icon: <FiShield className="w-8 h-8" />,
    title: "100% Compliant",
    desc: "AS/NZS standards",
    color: "bg-green-50 text-green-600",
    border: "group-hover:border-green-200"
  },
  {
    icon: <FiClock className="w-8 h-8" />,
    title: "Fast Reporting",
    desc: "Reports in 24h",
    color: "bg-amber-50 text-amber-600",
    border: "group-hover:border-amber-200"
  },
  {
    icon: <FiUserCheck className="w-8 h-8" />,
    title: "Certified Techs",
    desc: "Trained & Insured",
    color: "bg-purple-50 text-purple-600",
    border: "group-hover:border-purple-200"
  },
  {
    icon: <FiCreditCard className="w-8 h-8" />,
    title: "Free Quotation",
    desc: "No obligation",
    color: "bg-red-50 text-red-600",
    border: "group-hover:border-red-200"
  },
  {
    icon: <FiHeadphones className="w-8 h-8" />,
    title: "Local Support",
    desc: "Melbourne team",
    color: "bg-sky-50 text-sky-600",
    border: "group-hover:border-sky-200"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnim = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

const ServiceBenefits = () => {
  return (
    <div className="bg-white py-6 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8"
        >
          {benefits.map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={itemAnim}
              className={`flex flex-col items-center text-center group cursor-default p-6 rounded-3xl border border-transparent transition-all duration-300 ${item.border} hover:bg-white hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]`}
            >
              <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg`}>
                {item.icon}
              </div>
              <h3 className="text-sm font-black text-gray-900 mb-1 tracking-tight">{item.title}</h3>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceBenefits;
