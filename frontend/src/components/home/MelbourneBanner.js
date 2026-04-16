import React from 'react';
import { FaUsers, FaShieldAlt } from 'react-icons/fa';

const MelbourneBanner = () => {
  return (
    <section className="relative py-24 bg-[#051124] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ED1C24] rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ED1C24] rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
          Serving All Over <span className="text-[#ED1C24]">Melbourne</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 font-medium italic">
          From Northern Suburbs to the Mornington Peninsula, we bring safety directly to your doorstep. Same-day service available in most areas.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <div className="flex items-center justify-center text-white font-bold bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20">
            <FaUsers className="mr-3 text-[#ED1C24] text-2xl" /> 5000+ Clients
          </div>
          <div className="flex items-center justify-center text-white font-bold bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20">
            <FaShieldAlt className="mr-3 text-[#ED1C24] text-2xl" /> 100% Certified
          </div>
        </div>
      </div>
    </section>
  );
};

export default MelbourneBanner;
