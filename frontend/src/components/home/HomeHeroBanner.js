import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useGetSetting from "@hooks/useGetSetting";
import "swiper/css";

/*
 ┌──────────────────────────────────────────────────────────────┐
 │  GadgetFix-exact Hero Slider                                 │
 │                                                              │
 │  [  image (55%)  │  divider  │  content (45%) white  ]      │
 │  grey bg────────────────────│white─────────────────────     │
 │                                                              │
 │  Height is driven by the ROW div (SLIDER_H px).             │
 │  Image uses position:absolute inset:0 inside the left       │
 │  panel which also has a fixed height — 100% guaranteed.     │
 └──────────────────────────────────────────────────────────────┘
*/

const SLIDER_H = 410;          // total slider height  (px) — change one place
// const PANEL_BG   = "#eef0f4";    // left grey (same as GadgetFix)
const PANEL_BG = "#f7f7f7ff";
const CONTENT_BG = "#ffffff";    // right white

const HomeHeroBanner = () => {
  const { storeCustomizationSetting } = useGetSetting();
  const sd = storeCustomizationSetting?.slider;
  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);

  const slides = [
    {
      id: 1,
      image: sd?.first_img || "/slider/hero/battery.png",
      badge: "POWER SOLUTIONS",
      title: sd?.first_title?.en || "High Performance Industrial Batteries",
      body: sd?.first_description?.en || "Reliable energy storage solutions for your critical infrastructure and industrial needs.",
      href: sd?.first_link || "/search?category=batteries",
      cta: sd?.first_button?.en || "Discover Products",
    },
    {
      id: 2,
      image: sd?.second_img || "/slider/hero/transformer.png",
      badge: "GRID INFRASTRUCTURE",
      title: sd?.second_title?.en || "Precision Engineering Power Transformers",
      body: sd?.second_description?.en || "Advanced transformer technology designed for maximum efficiency and long-term durability.",
      href: sd?.second_link || "/search?category=transformers",
      cta: sd?.second_button?.en || "Discover Products",
    },
    {
      id: 3,
      image: sd?.third_img || "/slider/hero/electronics.png",
      badge: "ADVANCED ELECTRONICS",
      title: sd?.third_title?.en || "Cutting-edge Power Control Systems",
      body: sd?.third_description?.en || "Integrated electronic solutions for seamless power management and system monitoring.",
      href: sd?.third_link || "/search?category=electronics",
      cta: sd?.third_button?.en || "Discover Products",
    },
  ];

  const onSwiper = useCallback((s) => { swiperRef.current = s; }, []);
  const onChange = useCallback((s) => { setActive(s.realIndex); }, []);
  const isActive = (idx) => active === idx % slides.length;

  return (
    <div style={{ position: "relative", width: "100%", background: PANEL_BG }}>

      {/*
        Swiper has NO height style.
        Height comes purely from the row div inside each slide (SLIDER_H).
        This is the only 100%-reliable way — no cascading height issues.
      */}
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        speed={850}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        onSwiper={onSwiper}
        onSlideChange={onChange}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.id}>

            {/* ─────────────────────────────────────────────────
                ROW — this single div defines the slider height.
                display:flex so left + divider + right sit side by side.
            ───────────────────────────────────────────────── */}
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                width: "100%",
                height: SLIDER_H,   /* ← SINGLE SOURCE OF HEIGHT TRUTH */
                background: PANEL_BG,
              }}
            >

              {/* ══════════════════════════════════════════════
                  LEFT PANEL — grey background, image fills it

                  position:relative gives the absolute img an anchor.
                  height:100% = SLIDER_H (parent is flex + has explicit height).
                  overflow:hidden clips any image that slightly overflows.
              ══════════════════════════════════════════════ */}
              <div
                style={{
                  width: "55%",
                  height: "100%",           /* 100% of SLIDER_H */
                  flexShrink: 0,
                  background: PANEL_BG,
                  display: "flex",          /* Use flex to center the image naturally */
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <motion.img
                  key={`img-${slide.id}`}
                  src={slide.image}
                  alt={slide.title}
                  loading={idx === 0 ? "eager" : "lazy"}
                  /*
                   * To completely prevent the image from looking "compressed" or squished:
                   * We use max-height and max-width.
                   * width/height: 'auto' keeps the exact original aspect ratio.
                   */
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isActive(idx) ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>

              {/* ── VERTICAL DIVIDER ── */}
              <div
                style={{
                  width: 1,
                  background: "#c5c9d0",
                  alignSelf: "stretch",
                  marginTop: 36,
                  marginBottom: 36,
                  opacity: 0.6,
                  flexShrink: 0,
                }}
              />

              {/* ══════════════════════════════════════════════
                  RIGHT PANEL — white, content vertically centred
              ══════════════════════════════════════════════ */}
              <div
                style={{
                  flex: 1,
                  height: "100%",
                  background: CONTENT_BG,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "40px 52px 52px 44px",
                  position: "relative",
                  minWidth: 0,
                }}
              >
                {/* ── animated content block ── */}
                <AnimatePresence mode="wait">
                  {isActive(idx) && (
                    <motion.div
                      key={`c-${slide.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >

                      {/* badge */}
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                        <span style={{ display: "inline-block", width: 34, height: 2, background: "#374151", flexShrink: 0 }} />
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.26em", color: "#374151", textTransform: "uppercase" }}>
                          {slide.badge}
                        </span>
                      </div>

                      {/* heading */}
                      <h2 style={{
                        fontSize: "clamp(26px,3vw,50px)",
                        fontWeight: 800,
                        lineHeight: 1.1,
                        color: "#111827",
                        letterSpacing: "-0.02em",
                        marginBottom: 18,
                      }}>
                        {slide.title}
                      </h2>

                      {/* description */}
                      <p style={{
                        fontSize: "clamp(13px,1.05vw,16px)",
                        color: "#6b7280",
                        lineHeight: 1.75,
                        marginBottom: 32,
                        maxWidth: 400,
                      }}>
                        {slide.body}
                      </p>

                      {/* CTA button */}
                      <div>
                        <Link
                          href={slide.href}
                          className="hb-cta-btn"
                          style={{
                            display: "inline-block",
                            background: "#374151",
                            color: "#fff",
                            padding: "13px 32px",
                            borderRadius: 9999,
                            fontSize: 13,
                            fontWeight: 600,
                            letterSpacing: "0.04em",
                            textDecoration: "none",
                          }}
                        >
                          {slide.cta}
                        </Link>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

                {/* fraction counter — bottom-right of white panel */}
                <div style={{
                  position: "absolute",
                  bottom: 18,
                  right: 24,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#d1d5db",
                  letterSpacing: "0.12em",
                  userSelect: "none",
                }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={active}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18 }}
                    >
                      {active + 1} / {slides.length}
                    </motion.span>
                  </AnimatePresence>
                </div>

              </div>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Left arrow ── */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous slide"
        className="hb-arr hb-arr-l"
      >
        <FiChevronLeft style={{ width: 34, height: 34, strokeWidth: 1.2 }} />
      </button>

      {/* ── Right arrow ── */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next slide"
        className="hb-arr hb-arr-r"
      >
        <FiChevronRight style={{ width: 34, height: 34, strokeWidth: 1.2 }} />
      </button>

      <style>{`
        .hb-arr {
          position  : absolute;
          top       : 50%;
          transform : translateY(-50%);
          z-index   : 20;
          background: none;
          border    : none;
          cursor    : pointer;
          color     : #9ca3af;
          padding   : 4px;
          line-height: 0;
          transition: color .2s;
        }
        .hb-arr:hover  { color: #111827; }
        .hb-arr-l      { left : 12px; }
        .hb-arr-r      { right: 12px; }
        .hb-cta-btn:hover { background: #1f2937 !important; }
      `}</style>
    </div>
  );
};

export default HomeHeroBanner;
