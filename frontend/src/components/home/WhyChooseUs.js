import React from 'react';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';

const WhyChooseUs = ({ onGetQuote }) => {
  const benefits = [
    "Fully certified and insured professionals",
    "Latest calibrated testing equipment",
    "Same-day electronic reports & certificates",
    "Free automatic re-test reminders",
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#ED1C24]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#0b1d3d]/10 rounded-full blur-3xl"></div>
            <Image
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd373c?auto=format&fit=crop&q=80&w=800"
              alt="Why Choose PowerQ"
              width={600}
              height={600}
              className="rounded-3xl shadow-2xl relative z-10 object-cover border-8 border-white"
            />
          </div>
          <div className="lg:w-1/2">
            <span className="text-[#ED1C24] font-bold tracking-widest uppercase text-sm mb-4 block">Our Commitment</span>
            <h2 className="text-4xl font-extrabold text-[#051124] mb-6">Why Hundreds of Businesses Trust PowerQ</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              With years of experience in the industry, PowerQ is dedicated to providing affordable and high-quality safety testing services. We focus on reliability, professionalism, and customer satisfaction.
            </p>
            <ul className="space-y-4 mb-10">
              {benefits.map((item, idx) => (
                <li key={idx} className="flex items-center text-gray-700 font-medium">
                  <FaCheckCircle className="text-green-500 mr-3 text-xl flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={onGetQuote}
              className="bg-[#0b1d3d] hover:bg-[#162542] text-white px-10 py-4 rounded-xl font-bold transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              GET A FREE QUOTE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
