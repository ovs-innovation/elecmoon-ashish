import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import {
  FiMenu, FiX, FiChevronDown, FiChevronRight, FiUser,
  FiShoppingBag, FiSearch, FiHeart, FiPhoneCall,
  FiMail, FiMapPin, FiCheckCircle
} from "react-icons/fi";
import { useCart } from "react-use-cart";

import CategoryServices from "@services/CategoryServices";
import ServiceServices from "@services/ServiceServices";
import useUtilsFunction from "@hooks/useUtilsFunction";
import useGetSetting from "@hooks/useGetSetting";
import { UserContext } from "@context/UserContext";
import { SidebarContext } from "@context/SidebarContext";
import { WishlistContext } from "@context/WishlistContext";

const Navbar = () => {
  const router = useRouter();
  const [openProduct, setOpenProduct] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { state: { userInfo } } = useContext(UserContext);
  const { storeCustomizationSetting } = useGetSetting();
  const { toggleCartDrawer, categories, services, isCategoriesLoading } = useContext(SidebarContext);
  const { items, emptyCart, cartTotal } = useCart();
  const { totalWishlistItems, clearWishlist } = useContext(WishlistContext);
  const { showingTranslateValue, getNumberTwo, currency, lang } = useUtilsFunction();

  const handleLogOut = () => {
    signOut();
    Cookies.remove("userInfo");
    Cookies.remove("couponInfo");
    Cookies.remove("shippingAddress");
    // Clear cart and wishlist locally
    emptyCart();
    if (typeof clearWishlist === 'function') clearWishlist();
    router.push("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setHoveredItem(null);
    setMobileMenuOpen(false);
  }, [router.asPath]);

  const phone = storeCustomizationSetting?.navbar?.phone || "0433723389";
  const email = storeCustomizationSetting?.contact_us?.email_box_email?.en || "info@powerq.com.au";
  const address = showingTranslateValue(storeCustomizationSetting?.contact_us?.address_box_address_one) || "43 Wonnangatta Crescent, Weir Views VIC 3338";

  return (
    <>
      <div className="sticky top-0 z-50 shadow-sm transition-all duration-300">

        {/* Row 0: Top Bar with Address/Contact */}
        <div className="bg-[#051124] border-b border-white/5 py-1.5 lg:py-2.5">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 flex justify-between items-center text-white/70">
            <div className="flex items-center gap-4 lg:gap-10 text-[9px] lg:text-[10px] font-bold tracking-[0.1em] lg:tracking-[0.15em] uppercase">
              <div className="flex items-center gap-1.5 lg:gap-2.5 group cursor-default">
                <FiPhoneCall className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#ED1C24]" />
                <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </div>

              <div className="hidden sm:flex items-center gap-2 group cursor-default lg:border-l border-white/5 lg:pl-10">
                <FiMail className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#ED1C24]" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors normal-case tracking-normal">
                  {email}
                </a>
              </div>

              <div className="hidden lg:flex items-center gap-2.5 group cursor-default border-l border-white/5 pl-10">
                <FiMapPin className="w-3.5 h-3.5 text-[#ED1C24]" />
                <span className="text-white/50 group-hover:text-white transition-colors truncate max-w-[300px]">
                  {address}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-8">
              <div className="flex items-center gap-4 lg:gap-6 text-[9px] lg:text-[10px] font-black tracking-[0.1em] lg:tracking-[0.2em] uppercase">
                <a
                  href="https://www.shiprocket.in/shipment-tracking/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ED1C24] transition-colors"
                >
                  Track Order
                </a>
                <span className="hidden lg:inline opacity-10">|</span>
                <div className="flex items-center gap-1.5 text-[#ED1C24]">
                  <FiCheckCircle className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                  <span className="text-white/40 hidden md:inline tracking-widest font-black uppercase">Authorized Partner</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 1: Original Logo | Search | Actions (RESTORED EXACTLY) */}
        <div className="bg-white">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 border-b border-gray-100">
            <div className="h-24 flex items-center justify-between lg:gap-8">
              <Link href="/" className="flex-shrink-0 lg:-ml-4 xl:-ml-2 z-[30]">
                <div className="relative w-[220px] lg:w-[380px] xl:w-[420px] h-24 flex items-center overflow-hidden">
                  <img
                    src="/logo/elecmoon-transparent.png"
                    alt="ELECMOON"
                    className="h-full w-full object-contain object-left scale-[2.0] origin-left"
                  />
                </div>
              </Link>

              {/* Search Bar - Perfectly Centered in Navbar */}
              <div className="hidden md:flex flex-grow justify-center px-4">
                <div className="w-full max-w-2xl relative group">
                  <input
                    type="text"
                    placeholder="Search products or services..."
                    className="w-full h-11 pl-5 pr-12 rounded-sm border-2 border-gray-200 focus:border-[#0b1d3d] outline-none transition-all"
                  />
                  <button className="absolute right-0 top-0 h-full px-5 bg-[#0b1d3d] text-white rounded-r-sm hover:bg-[#162542] transition-colors font-bold text-sm">
                    Search
                  </button>
                </div>
              </div>

              {/* Icons area - Right aligned */}
              <div className="flex items-center gap-6 text-gray-700 min-w-fit pr-4 relative z-40">
                <Link href="/user/wishlist" className="hidden sm:flex relative hover:text-[#0b1d3d] transition-colors">
                  <FiHeart className="w-6 h-6" />
                  {totalWishlistItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {totalWishlistItems}
                    </span>
                  )}
                </Link>
                <button onClick={toggleCartDrawer} className="relative flex items-center gap-1 hover:text-[#0b1d3d] transition-colors">
                  <div className="relative">
                    <FiShoppingBag className="w-6 h-6" />
                    {items?.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                        {items.length}
                      </span>
                    )}
                  </div>
                  <span className="hidden lg:block font-bold text-sm">
                    {currency}
                    {getNumberTwo(cartTotal)}
                  </span>
                </button>

                <Link href={userInfo ? "/user/dashboard" : "/auth/login"} className="flex flex-col sm:flex-row items-center gap-2 hover:text-[#0b1d3d] transition-colors">
                  {userInfo?.image ? (
                    <img
                      src={userInfo.image}
                      alt="user"
                      width={24}
                      height={24}
                      className="w-8 h-8 rounded-full object-cover border-2 border-transparent hover:border-[#0b1d3d] transition-all"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                      <FiUser className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                  {userInfo && (
                    <span className="hidden font-bold text-sm text-[#0b1d3d] whitespace-nowrap lg:block">
                      {userInfo.name}
                    </span>
                  )}
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                  type="button"
                  className="lg:hidden text-gray-700 relative z-50 p-2 -mr-2"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <FiX className="w-7 h-7" /> : <FiMenu className="w-7 h-7" />}
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: All Departments | Nav Links (RESTORED EXACTLY) */}
          <div
            className="hidden lg:block shadow-md"
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="max-w-screen-2xl mx-auto flex h-14">
              {/* All Departments Section - Red */}
              <div
                className="relative w-[240px] bg-[#0b1d3d] flex items-center px-6 gap-3 text-white font-bold cursor-pointer hover:bg-[#162542] transition-colors group/cat"
                onMouseEnter={() => setHoveredItem('categories')}
              >
                <FiMenu className="w-5 h-5 text-white" />
                <span className="text-sm tracking-wide uppercase">All Categories</span>

                {/* Vertical Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 w-full bg-white shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-x border-b border-gray-100 transition-all duration-300 origin-top z-[60] overflow-y-auto max-h-[80vh] custom-scrollbar ${hoveredItem === 'categories' ? 'scale-y-100 opacity-100 visible' : 'scale-y-95 opacity-0 invisible pointer-events-none'}`}
                >
                  <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                      width: 5px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                      background: #f1f1f1;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                      background: #0b1d3d;
                      border-radius: 10px;
                    }
                  `}</style>
                  <div className="flex flex-col py-2">
                    {isCategoriesLoading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="px-6 py-4 border-b border-gray-50 flex items-center justify-between animate-pulse">
                          <div className="h-4 bg-gray-100 rounded w-1/2" />
                          <div className="h-4 bg-gray-100 rounded-full w-4" />
                        </div>
                      ))
                    ) : categories.length > 0 ? (
                      categories.map((cat) => (
                        <Link
                          key={cat._id}
                          href={`/search?_id=${cat._id}`}
                          onClick={() => setHoveredItem(null)}
                          className="px-6 py-2 text-gray-700 hover:text-white hover:bg-[#0b1d3d] border-b border-gray-50 last:border-0 transition-all flex items-center justify-between group/item"
                        >
                          <span className="text-[13px] font-bold uppercase tracking-tight">
                            {showingTranslateValue(cat.name)}
                          </span>
                          <FiChevronRight className="w-4 h-4 text-gray-300 group-hover/item:text-white transition-transform group-hover/item:translate-x-1" />
                        </Link>
                      ))
                    ) : (
                      <div className="px-6 py-4 text-gray-400 text-xs italic">No categories found.</div>
                    )}
                    <Link
                      href="/search"
                      onClick={() => setHoveredItem(null)}
                      className="px-6 py-4 text-center text-[#0b1d3d] text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-colors border-t border-gray-100"
                    >
                      View All Categories
                    </Link>
                  </div>
                </div>
              </div>

              {/* Nav Links - Navy area */}
              <div className="flex-grow bg-slate-900 flex items-center px-8 border-l border-white/10 relative">
                <div className={`flex items-center gap-8 text-[14px] font-bold text-white uppercase tracking-tight transition-all duration-300 ${hoveredItem === 'categories' ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                  <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>

                  <div className="relative group/serv h-full flex items-center">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-blue-400 transition-colors py-4 px-2">
                      Services <FiChevronDown className="w-4 h-4 transition-transform group-hover/serv:rotate-180" />
                    </div>
                    <div className={`absolute top-full left-0 w-64 bg-white rounded shadow-[0_15px_35px_rgba(0,0,0,0.15)] transition-all duration-300 z-[70] flex flex-col py-3 border-t-2 border-[#0b1d3d] transform 
                      ${mobileProductOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2 group-hover/serv:opacity-100 group-hover/serv:visible group-hover/serv:translate-y-0"} 
                      text-left`}>
                      {services.length > 0 ? (
                        Object.entries(
                          services.reduce((acc, service) => {
                            const group = (service.group || "Other").trim();
                            if (!acc[group]) acc[group] = [];
                            acc[group].push(service);
                            return acc;
                          }, {})
                        ).map(([group, groupServices]) => (
                          <div key={group}>
                            <div className="px-5 py-2 text-[11px] font-black text-[#0b1d3d] uppercase tracking-[0.2em] border-b border-gray-50 mb-1">
                              {group}
                            </div>
                            {groupServices.map((service) => {
                              const name = showingTranslateValue(service.name);
                              if (!name) return null;
                              const href = service.slug ? `/service/${service.slug}` : `/services`;
                              return (
                                <Link
                                  key={service._id}
                                  href={href}
                                  className="px-5 py-3 text-[13px] text-gray-700 hover:text-[#0b1d3d] hover:bg-gray-50 uppercase tracking-tight font-bold transition-colors block border-b border-gray-50 last:border-0"
                                  onClick={() => setMobileProductOpen(false)}
                                >
                                  {name}
                                </Link>
                              );
                            })}
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="px-5 py-2 text-[11px] font-black text-[#0b1d3d] uppercase tracking-[0.2em] border-b border-gray-50 mb-1">Electronics</div>
                          <Link href="/search?category=servo-stabilizers" className="px-5 py-3 text-[13px] text-gray-700 hover:text-[#0b1d3d] hover:bg-gray-50 uppercase tracking-tight font-bold transition-colors block border-b border-gray-50" onClick={() => setMobileProductOpen(false)}>Servo Stabilizers</Link>
                          <Link href="/search?category=avr" className="px-5 py-3 text-[13px] text-gray-700 hover:text-[#0b1d3d] hover:bg-gray-50 uppercase tracking-tight font-bold transition-colors block" onClick={() => setMobileProductOpen(false)}>AVR</Link>
                        </>
                      )}
                    </div>
                  </div>

                  <Link href="/about-us" className="hover:text-blue-400 transition-colors py-4">About Us</Link>
                  <Link href="/blog" className="hover:text-blue-400 transition-colors py-4">Blog</Link>
                  <Link href="/faq" className="hover:text-blue-400 transition-colors py-4">FAQ</Link>
                  <Link href="/contact-us" className="hover:text-blue-400 transition-colors py-4">Contact Us</Link>
                </div>
                <div className="ml-auto flex items-center gap-1 text-white text-[14px] font-bold cursor-pointer group hover:text-blue-400 uppercase tracking-tight whitespace-nowrap">
                  <span><Link href="/user/dashboard">My Account</Link></span>
                  <FiChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Menu Drawer (RESTORED & IMPROVED) - Moved Outside Sticky */}
      <div
        className={`lg:hidden fixed inset-0 z-[9999] transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`absolute top-0 right-0 w-[85%] max-w-[340px] h-full bg-white shadow-2xl transition-transform duration-500 transform flex flex-col ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#0b1d3d] text-white">
            <h3 className="text-sm font-black uppercase tracking-widest">Navigation Menu</h3>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <FiX className="w-7 h-7" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-grow overflow-y-auto custom-scrollbar p-6 space-y-10">
            {/* Search Bar */}
            <div className="relative group">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full h-12 pl-4 pr-10 border-2 border-gray-100 rounded-xl focus:border-[#0b1d3d] outline-none transition-all text-sm font-medium bg-gray-50/50"
              />
              <FiSearch className="absolute right-4 top-4 text-gray-400" />
            </div>

            {/* All Categories Section (MOBILE) */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-[#0b1d3d]">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                  <FiMenu className="w-4 h-4 text-[#ED1C24]" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em]">All Categories</span>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {isCategoriesLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-12 bg-gray-50 animate-pulse rounded-xl" />
                  ))
                ) : categories.length > 0 ? (
                  categories.slice(0, 10).map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/search?_id=${cat._id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-[#0b1d3d] hover:text-white transition-all group border border-gray-100/50"
                    >
                      <span className="text-[14px] font-bold uppercase tracking-tight">{showingTranslateValue(cat.name)}</span>
                      <FiChevronRight className="w-4 h-4 text-[#ED1C24] transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))
                ) : null}
                <Link
                  href="/search"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 text-[12px] font-black uppercase tracking-[0.2em] text-[#0b1d3d] hover:bg-gray-50 transition-colors border-2 border-gray-100 rounded-xl flex items-center justify-center"
                >
                  View All Categories
                </Link>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-[#0b1d3d] mb-4">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-[#ED1C24]">
                  <FiChevronDown className="w-4 h-4" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em]">Quick Links</span>
              </div>
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about-us" },
                { name: "Blog", href: "/blog" },
                { name: "FAQ", href: "/faq" },
                { name: "Contact Us", href: "/contact-us" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-4 text-[15px] font-bold text-gray-700 hover:text-[#0b1d3d] transition-colors border-b border-gray-50 last:border-0 hover:bg-gray-50/50 rounded-lg"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* My Account Area */}
            <div className="pt-6 mt-6 border-t border-gray-100">
              <Link
                href={userInfo ? "/user/dashboard" : "/auth/login"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-5 bg-[#0b1d3d] text-white rounded-2xl shadow-xl hover:bg-[#162542] transition-all hover:scale-[1.02] active:scale-95"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <FiUser className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Account</p>
                    <p className="font-bold text-sm tracking-wide">{userInfo ? userInfo.name : "Sign In / Register"}</p>
                  </div>
                </div>
                <FiChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Contact Bar */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md border border-gray-100">
                <FiPhoneCall className="w-6 h-6 text-[#ED1C24]" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase text-gray-400 tracking-widest leading-none mb-1">Direct Hotline</p>
                <a href={`tel:${phone}`} className="text-base font-black text-[#0b1d3d] hover:text-[#ED1C24] transition-colors">{phone}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
