import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiPhoneCall, FiMail, FiMapPin } from "react-icons/fi";

import useGetSetting from "@hooks/useGetSetting";
import CategoryServices from "@services/CategoryServices";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Footer = () => {
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await CategoryServices.getShowingCategory();
        let catList = res || [];

        // Recursive function to find the first level that has multiple categories or isn't "Home"
        const findMainCategories = (list) => {
          if (list.length === 1) {
            const name = showingTranslateValue(list[0].name)?.toLowerCase()?.trim();
            if (name === "home" || name === "all categories" || name === "all departments" || !list[0].parentId) {
              if (list[0].children && list[0].children.length > 0) {
                return findMainCategories(list[0].children);
              }
            }
          }
          return list;
        };

        const finalCategories = findMainCategories(catList);

        // Filter out any specific "Home" label items strictly
        const filtered = finalCategories.filter((cat) => {
          const name = showingTranslateValue(cat.name)?.toLowerCase()?.trim();
          return name !== "home" && name !== "all categories" && name !== "all departments" && name !== "";
        });

        setCategories(filtered);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className="bg-gray-100 text-gray-900 pt-10 pb-16 relative">
      {/* Red vertical bar on the right */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#ED1C24]"></div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo/elecmoon-transparent.png"
                alt="PowerQ"
                width={260}
                height={90}
                className="w-auto h-24 object-contain origin-left"
                priority
              />
            </div>
            <p className="text-sm leading-7 text-gray-700">
              {showingTranslateValue(storeCustomizationSetting?.footer?.shipping_card) || 
              "At PowerQ, we specialize in providing top-quality electrical testing, tagging, and fire safety services. Our mission is to ensure your workplace is safe and compliant."}
            </p>

            <div className="flex gap-3 pt-2">
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-[#000435] text-white flex items-center justify-center hover:bg-[#C53030] transition"
              >
                <FaFacebookF />
              </Link>
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#000435] text-white flex items-center justify-center hover:bg-[#C53030] transition"
              >
                <FaInstagram />
              </Link>
              <Link
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-[#000435] text-white flex items-center justify-center hover:bg-[#C53030] transition"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-black">Contact Info</h3>
            <div className="text-sm space-y-3 text-gray-700">
              <div className="flex items-start gap-2">
                <FiPhoneCall className="text-[#ED1C24] mt-1 flex-shrink-0" />
                <a href={`tel:${storeCustomizationSetting?.navbar?.phone}`} className="font-medium hover:text-[#ED1C24] transition">
                  {storeCustomizationSetting?.navbar?.phone || "0433723389"}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <FiMail className="text-[#ED1C24] mt-1 flex-shrink-0" />
                <p className="font-medium">{storeCustomizationSetting?.contact_us?.email_box_email?.en || "info@powerq.com.au"}</p>
              </div>
              <div className="flex items-start gap-2">
                <FiMapPin className="text-[#ED1C24] mt-1 flex-shrink-0" />
                <p>
                  {showingTranslateValue(storeCustomizationSetting?.contact_us?.address_box_address_one) || "43 Wonnangatta Crescent, Weir Views VIC 3338"}
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-black">Services</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {categories.slice(0, 7).map((cat) => (
                <li key={cat._id}>
                  <Link href={`/search?category=${cat.slug}`} className="hover:text-[#ED1C24] transition">
                    {showingTranslateValue(cat.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* General Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-black">General Links</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link href="/" className="hover:text-[#ED1C24] transition">Home</Link></li>
              <li><Link href="/about-us" className="hover:text-[#ED1C24] transition">About Us</Link></li>
              <li><Link href="/pricing" className="hover:text-[#ED1C24] transition">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-[#ED1C24] transition">Blog</Link></li>
            
            </ul>
          </div>

          {/* Useful Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-black">Useful Links</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link href="/privacy-policy" className="hover:text-[#ED1C24] transition">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-[#ED1C24] transition">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

