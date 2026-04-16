import { useRouter } from "next/router";

const FeatureCategory = () => {
  const router = useRouter();

  // Hardcoded services so this section no longer depends on admin data
  const services = [
    {
      name: "Electrical Test & Tag",
      icon: "https://www.powerq.com.au/wp-content/uploads/al_opt_content/IMAGE/www.powerq.com.au/wp-content/uploads/2025/03/1-2.png.bv.webp?bv_host=www.powerq.com.au",
      slug: "/service/electrical-testing-tagging",
    },
    {
      name: "Exit & Emergency Light Testing",
      icon: "https://www.powerq.com.au/wp-content/uploads/al_opt_content/IMAGE/www.powerq.com.au/wp-content/uploads/elementor/thumbs/3-2-r3psejnq4zym5gmsmwwxl7iar2gcvkqvjma5is6drg.png.bv.webp?bv_host=www.powerq.com.au",
      slug: "/service/fire-extinguishers",
    },
    {
      name: "Extinguisher Testing",
      icon: "https://www.powerq.com.au/wp-content/uploads/al_opt_content/IMAGE/www.powerq.com.au/wp-content/uploads/2025/03/2-2.png.bv.webp?bv_host=www.powerq.com.au",

      slug: "/service/emergency-exit-light-testing",
    },
    {
      name: "RCD Testing",
      icon: "https://www.powerq.com.au/wp-content/uploads/al_opt_content/IMAGE/www.powerq.com.au/wp-content/uploads/2025/03/download-4.png.bv.webp?bv_host=www.powerq.com.au",
      slug: "/service/rcd-safety-switches",
    },
  ];

  // Color variations for icon backgrounds
  const iconBgColors = [
    "bg-blue-50",
    "bg-blue-50", // Changed from bg-red-50 for Exit & Emergency Light Testing
    "bg-green-50",
    "bg-yellow-50",
    "bg-purple-50",
    "bg-pink-50",
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, i) => {
          const bgColorIndex = i % iconBgColors.length;
          const iconBgColor = iconBgColors[bgColorIndex];
          const isExitEmergency = service.name.includes("Exit") || service.name.includes("Emergency");

          return (
            <div
              key={service.slug}
              className={`bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 ${isExitEmergency ? 'hover:border-gray-300' : 'hover:border-[#EF4036]/30'} group`}
            >
              <div className={`w-36 h-36 lg:w-40 lg:h-40 mb-4 flex items-center justify-center ${iconBgColor} rounded-full p-4 transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={service.icon}
                    alt={service.name}
                    className="object-contain transition-transform duration-300 group-hover:scale-110 max-h-full"
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 min-h-[56px] flex items-center justify-center group-hover:text-[#0b1d3d] transition-colors duration-300">
                {service.name}
              </h3>
              <button
                onClick={() =>
                  router.push(service.slug)
                }
                className="w-full bg-gradient-to-r from-[#051124] to-[#0b1d3d] hover:from-[#0b1d3d] hover:to-[#162542] text-white py-2.5 px-4 rounded-lg transition-all duration-300 font-medium transform hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-lg"
              >
                Learn More
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FeatureCategory;
