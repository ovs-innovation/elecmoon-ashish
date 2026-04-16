import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiPlayCircle, FiExternalLink, FiChevronRight } from "react-icons/fi";
import ShortVideoServices from "@services/ShortVideoServices";
import useUtilsFunction from "@hooks/useUtilsFunction";

const ShortVideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showingTranslateValue } = useUtilsFunction();

  useEffect(() => {
    (async () => {
      try {
        const res = await ShortVideoServices.getShowingShortVideos();
        setVideos(res || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    })();
  }, []);

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("/shorts/")) {
      videoId = url.split("/shorts/")[1].split("?")[0];
    } else if (url.includes("v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("be/")) {
      videoId = url.split("be/")[1].split("?")[0];
    }
    return `https://www.youtube.com/embed/${videoId}?loop=1&playlist=${videoId}&modestbranding=1&rel=0`;
  };

  if (loading) return null;
  if (videos.length === 0) return null;

  return (
    <div className="bg-white py-12 border-t border-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0b1d3d] uppercase tracking-tighter">
              Product Shorts
            </h2>
            <p className="text-gray-500 text-sm mt-1 font-medium tracking-tight">
              Watch our products in action
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
              Interactive Demos
            </span>
          </div>
        </div>

        <div className="relative group">
          {/* Draggable/Scrollable Container */}
          <div className="flex overflow-x-auto gap-4 md:gap-6 pb-6 no-scrollbar snap-x scroll-smooth">
            {videos.map((video) => (
              <div 
                key={video._id} 
                className="flex-shrink-0 w-[240px] md:w-[240px] snap-start"
              >
                {/* Video Card */}
                <div className="relative aspect-[9/12] bg-black rounded-xl overflow-hidden shadow-xl border-4 border-slate-100 group/card transition-transform duration-500 hover:-translate-y-2">
                  <iframe
                    className="w-full h-full pointer-events-auto"
                    src={getYoutubeEmbedUrl(video.videoUrl)}
                    title={showingTranslateValue(video.title)}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  
                  {/* Subtle Overlay Title */}
                  <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
                    <h3 className="text-white text-xs font-black uppercase tracking-tighter drop-shadow-md">
                      {showingTranslateValue(video.title)}
                    </h3>
                  </div>
                </div>

                {/* View Product Button - Industrial Style */}
                {video.product && (
                  <div className="mt-4">
                    <Link href={`/product/${video.product.slug}`} legacyBehavior>
                      <a className="flex items-center justify-between w-full bg-[#0b1d3d] hover:bg-[#c4a159] text-white py-3 px-4 rounded-xl transition-all duration-300 group/btn shadow-lg">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-white/60 uppercase tracking-widest leading-none mb-1">Explore</span>
                          <span className="text-[11px] font-black uppercase tracking-tight truncate max-w-[150px]">
                            {showingTranslateValue(video.product.title)}
                          </span>
                        </div>
                        <div className="bg-white/10 p-2 rounded-lg group-hover/btn:bg-white/20 transition-colors">
                          <FiChevronRight className="w-4 h-4" />
                        </div>
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Scroll Indicators if many */}
          {videos.length > 4 && (
             <div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur shadow-xl p-3 rounded-full hidden lg:block cursor-pointer border border-gray-100 hover:bg-[#0b1d3d] hover:text-white transition-all animate-pulse">
                <FiChevronRight />
             </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ShortVideoSection;
