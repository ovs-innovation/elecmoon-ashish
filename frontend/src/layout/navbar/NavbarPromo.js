import React, { useState } from "react";
import Link from "next/link";
import { FiUser, FiShoppingCart } from "react-icons/fi";

const services = [
  { label: "Electrical Testing & Tagging", href: "/service/electrical-testing-tagging" },
  { label: "Fire Extinguishers", href: "/service/fire-extinguishers" },
  { label: "RCD/Safety Switches", href: "/service/rcd-safety-switches" },
  { label: "Three Phase Testing", href: "/service/three-phase-testing" },
  { label: "Microwave Testing", href: "/service/microwave-testing" },
  { label: "Emergency Exit Light Testing", href: "/service/emergency-exit-light-testing" },
  { label: "Smoke Alarm Service", href: "/service/smoke-alarm-service" },
];

const NavbarPromo = () => {
  const [openService, setOpenService] = useState(false);

  return (
    <div className="hidden lg:block bg-white text-black border-b">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-10 h-14 flex items-center justify-between">
        <nav className="flex items-center gap-6 text-[15px] font-semibold">
          <Link href="/" className="hover:text-red-500 transition">
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setOpenService(true)}
            onMouseLeave={() => setOpenService(false)}
          >
            <button
              className="flex items-center gap-1 hover:text-red-500 transition"
              onClick={() => setOpenService((prev) => !prev)}
            >
              Service <span className="text-xs">▼</span>
            </button>
            {openService && (
              <div
                className="absolute left-0 top-full w-72 bg-white text-gray-900 shadow-xl rounded-md overflow-hidden z-30"
              >
                {services.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-3 text-sm hover:bg-gray-100"
                    onClick={() => setOpenService(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/faq" className="hover:text-red-500 transition">
            Faq
          </Link>
          <Link href="/request-a-quote" className="hover:text-red-500 transition">
            Request A Quote
          </Link>
          <Link href="/blog" className="hover:text-red-500 transition">
            Blog
          </Link>
        </nav>

       
      </div>
    </div>
  );
};

export default NavbarPromo;

