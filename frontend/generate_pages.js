const fs = require('fs');
const path = require('path');

const pages = [
    { path: 'products/lithium-ion-battery.js', title: 'Lithium-ion Battery', parent: 'Products' },
    { path: 'products/ev-battery.js', title: 'EV Battery', parent: 'Lithium-ion Battery' },
    { path: 'products/solar-application-battery.js', title: 'Solar Application Battery', parent: 'Lithium-ion Battery' },
    { path: 'products/consumer-electronics.js', title: 'Consumer Electronics Battery', parent: 'Lithium-ion Battery' },
    { path: 'products/lithium-ion-battery-raw-material.js', title: 'Lithium-ion Battery Raw Material', parent: 'Products' },
    { path: 'products/raw-material/cell.js', title: 'Battery Cell', parent: 'Raw Material' },
    { path: 'products/raw-material/bms.js', title: 'Battery Management System (BMS)', parent: 'Raw Material' },
    { path: 'products/raw-material/nickle-strip.js', title: 'Nickle Strip', parent: 'Raw Material' },
    { path: 'products/raw-material/battery-case.js', title: 'Battery Case', parent: 'Raw Material' },
    { path: 'products/raw-material/cell-holder.js', title: 'Cell Holder', parent: 'Raw Material' },
    { path: 'products/raw-material/barley-insulation-paper.js', title: 'Barley and Insulation Paper', parent: 'Raw Material' },
    { path: 'products/raw-material/epoxy-sheet.js', title: 'Epoxy Sheet', parent: 'Raw Material' },
    { path: 'products/raw-material/tape.js', title: 'Battery Tape', parent: 'Raw Material' },
    { path: 'products/raw-material/pvc-tube-heat-shrink.js', title: 'PVC Tube & Heat Shrink', parent: 'Raw Material' },
    { path: 'products/raw-material/spot-welding-needle.js', title: 'Spot Welding Needle', parent: 'Raw Material' },
    { path: 'products/ev-battery-charger.js', title: 'EV Battery Charger', parent: 'Products' },
    { path: 'products/assembly-testing-machine.js', title: 'Assembly And Testing Machine', parent: 'Products' }
];

const template = (title, parent) => `import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@layout/Layout";
import { FiCheckCircle } from "react-icons/fi";

const ProductPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Layout
      title="${title} | PowerQ"
      description="Explore our high-quality ${title} solutions for your business needs."
    >
      {/* Hero Section */}
      <div className="relative bg-[#0b1d3d] text-white min-h-[350px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1d3d] to-[#0b1d3d]/80 z-10" />
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80')] bg-cover bg-center" />
        
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-10 py-16 z-20 w-full">
          <div className={\`transition-all duration-700 \${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}\`}>
            <p className="text-[#ff5c23] font-bold uppercase tracking-widest text-sm mb-3">
              ${parent} / ${title}
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 max-w-3xl">
              ${title}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-8 mb-8">
              We provide industry-leading ${title.toLowerCase()} with uncompromising quality, 
              reliability, and performance to meet all your project requirements.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/request-a-quote"
                className="px-8 py-3 bg-[#ff5c23] hover:bg-[#e04d18] text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-10 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-extrabold text-[#0b1d3d] mb-4">
              Premium ${title} Solutions
            </h2>
            <div className="w-20 h-1 bg-[#ff5c23] mb-6" />
            <p className="text-gray-600 text-lg leading-8 mb-6">
              Our ${title.toLowerCase()} is manufactured to the highest standards, ensuring optimal 
              efficiency and safety. Whether you are looking for scalability, precision, or raw power, 
              our products are designed to deliver exceptional results.
            </p>
            <ul className="space-y-4 mb-8">
              {['High Quality & Durability', 'Strict Quality Control', 'Competitive Pricing', 'Global Industry Standards'].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                  <FiCheckCircle className="text-[#ff5c23] w-5 h-5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/contact-us"
              className="inline-block px-8 py-3 border-2 border-[#0b1d3d] hover:bg-[#0b1d3d] hover:text-white text-[#0b1d3d] font-bold rounded-full transition-all duration-300"
            >
              Contact Our Experts
            </Link>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 aspect-[4/3]">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-[#0e2550]">
                <span className="text-xl font-bold text-white opacity-50">${title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
`;

const basePath = path.join(__dirname, 'src', 'pages');

pages.forEach(p => {
    const fullPath = path.join(basePath, ...p.path.split('/'));
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    // Only create if it doesn't already exist to prevent overwriting custom pages like energy-storage-system
    if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, template(p.title, p.parent), 'utf-8');
        console.log('Created:', p.path);
    } else {
        console.log('Skipped (already exists):', p.path);
    }
});

console.log('All pages generated.');
