import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PromotionalBanners = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Banner 1 */}
          <div className="relative group overflow-hidden rounded-2xl bg-[#0b1d3d] h-[220px] lg:h-[260px] flex items-center">
            <div className="absolute inset-0 opacity-40 group-hover:scale-110 transition-transform duration-700">
               <Image 
                src="https://images.unsplash.com/photo-1590235246717-083d8198d28c?w=800&q=80"
                alt="Electrical Security"
                fill
                className="object-cover"
               />
            </div>
            <div className="relative z-10 p-8 lg:p-12 text-white max-w-[60%]">
              <span className="inline-block px-3 py-1 bg-red-600 rounded-md font-bold text-[10px] uppercase tracking-widest mb-3">Professional Grade</span>
              <h3 className="text-2xl lg:text-3xl font-extrabold mb-3 leading-tight">Workplace Test & Tag Packages</h3>
              <p className="text-white/80 text-sm mb-6 hidden sm:block font-medium">Bulk testing discounts for offices, factories and construction sites.</p>
              <Link href="/request-a-quote" className="inline-flex items-center gap-2 text-white font-bold text-sm bg-white/20 hover:bg-white/30 px-5 py-2.5 rounded-full transition-all backdrop-blur-md border border-white/10 group/btn">
                Book a Test
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative group overflow-hidden rounded-2xl bg-[#ED1C24] h-[220px] lg:h-[260px] flex items-center">
             <div className="absolute inset-0 opacity-30 group-hover:scale-110 transition-transform duration-700">
               <Image 
                src="https://images.unsplash.com/photo-1617788130335-53a5c2020227?w=800&q=80"
                alt="Fire Protection"
                fill
                className="object-cover"
               />
            </div>
            <div className="relative z-10 p-8 lg:p-12 text-white max-w-[60%]">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-md font-bold text-[10px] uppercase tracking-widest mb-3">Compliance Ready</span>
              <h3 className="text-2xl lg:text-3xl font-extrabold mb-3 leading-tight">Fire Safety Compliance Audit</h3>
              <p className="text-white/80 text-sm mb-6 hidden sm:block font-medium">Expert inspection for extinguishers, hoses, and fire blankets.</p>
              <Link href="/request-a-quote" className="inline-flex items-center gap-2 text-[#ED1C24] font-bold text-sm bg-white hover:bg-white/90 px-5 py-2.5 rounded-full transition-all shadow-lg group/btn">
                Free Assessment
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanners;
