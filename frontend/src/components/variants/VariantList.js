import { useRef, useState, useEffect } from "react";
import useUtilsFunction from "@hooks/useUtilsFunction";

const VariantList = ({
  att,
  option,
  variants,
  setValue,
  varTitle,
  selectVariant,
  setSelectVariant,
  setSelectVa,
  handleVariantSelect,
}) => {
  const { showingTranslateValue } = useUtilsFunction();
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Get unique variants for this attribute
  const uniqueVariants = [
    ...new Map(variants?.map((v) => [v[att], v].filter(Boolean))).values(),
  ].filter(Boolean);

  // Check if we have more than 5 variants
  const hasMoreThanFive = uniqueVariants.length > 5;

  // Check scroll position and update button states
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -120, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 120, behavior: "smooth" });
    }
  };

  // Update scroll state on mount and when variants change
  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, [variants, selectVariant]);

  //update url slug when variant is selected
  const handleChangeVariant = (selectedOptionId) => {
    try {
      // keep form state in sync if provided
      if (typeof setValue === "function") {
        setValue(att, selectedOptionId);
      }

      const attributeIds = Array.isArray(varTitle)
        ? varTitle.map((a) => a?._id).filter(Boolean)
        : [];
      const otherAttributeIds = attributeIds.filter((id) => id !== att);

      // candidates matching the chosen value for this attribute
      let candidates = (variants || []).filter(
        (variant) => variant?.[att] === selectedOptionId
      );

      // further narrow by already-selected other attributes (if any)
      if (selectVariant && otherAttributeIds.length) {
        candidates = candidates.filter((variant) =>
          otherAttributeIds.every((id) => {
            const selectedVal = selectVariant?.[id];
            return selectedVal ? variant?.[id] === selectedVal : true;
          })
        );
      }

      const nextVariant =
        candidates[0] ||
        (variants || []).find((variant) => variant?.[att] === selectedOptionId);

      if (nextVariant) {
        if (typeof handleVariantSelect === "function") {
          handleVariantSelect(nextVariant);
        } else {
          // fallback: update local states if handler not passed
          if (typeof setSelectVariant === "function")
            setSelectVariant(nextVariant);
          if (typeof setSelectVa === "function") setSelectVa(nextVariant);
        }
      }
    } catch (error) {
      console.error("Failed to handle variant change", error);
    }
  };

  // Helper function to get variant details including hex color
  const getVariantDetails = (attributeId, variantId) => {
    const attribute = varTitle?.find((attr) => attr._id === attributeId);
    if (!attribute) return null;

    const variant = attribute.variants?.find((v) => v._id === variantId);
    return variant;
  };

  // Check if this is a color attribute
  const isColorAttribute =
    varTitle?.find((attr) => attr._id === att)?.title?.en?.toLowerCase() ===
      "color" ||
    varTitle?.find((attr) => attr._id === att)?.name?.en?.toLowerCase() ===
      "color";

  return (
    <>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
          overflow: -moz-scrollbars-none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
      {option === "Dropdown" ? (
        <select
          onChange={(e) => handleChangeVariant(e.target.value)}
          className="focus:shadow-none w-3/4 px-2 py-1 form-select outline-none h-10 text-sm focus:outline-none block rounded-md bg-gray-100 border-transparent focus:bg-white border-green-600 focus:border-green-400 focus:ring-0 focus:ring-green-200"
          name="parent"
        >
          {[
            ...new Map(
              variants.map((v) => [v[att], v].filter(Boolean))
            ).values(),
          ]
            .filter(Boolean)
            .map(
              (vl, i) =>
                Object?.values(selectVariant).includes(vl[att]) &&
                varTitle.map((vr) =>
                  vr?.variants?.map(
                    (el) =>
                      vr?._id === att &&
                      el?._id === vl[att] && (
                        <option
                          key={i + 1}
                          value={selectVariant[att]}
                          defaultValue={selectVariant[att]}
                          hidden
                        >
                          {showingTranslateValue(el.name)}
                          {isColorAttribute &&
                            el.hexColor &&
                            ` (${el.hexColor})`}
                        </option>
                      )
                  )
                )
            )}

          {[
            ...new Map(
              variants.map((v) => [v[att], v].filter(Boolean))
            ).values(),
          ]
            .filter(Boolean)
            .map((vl, i) =>
              varTitle.map((vr) =>
                vr?.variants?.map(
                  (el) =>
                    vr?._id === att &&
                    el?._id === vl[att] && (
                      <option key={el._id} value={vl[att]} defaultValue>
                        {showingTranslateValue(el.name)}
                        {isColorAttribute && el.hexColor && ` (${el.hexColor})`}
                      </option>
                    )
                )
              )
            )}
        </select>
      ) : (
        <div className="w-full">
          {isColorAttribute ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-3">
                {[
                  ...new Map(
                    variants?.map((v) => [v[att], v].filter(Boolean))
                  ).values(),
                ]
                  .filter(Boolean)
                  .map((vl, i) =>
                    varTitle
                      .map((vr) =>
                        vr?.variants?.map(
                          (el) =>
                            vr?._id === att &&
                            el?._id === vl[att] && {
                              variant: el,
                              isSelected: Object?.values(
                                selectVariant
                              ).includes(vl[att]),
                              variantId: vl[att],
                            }
                        )
                      )
                      .flat()
                      .filter(Boolean)
                      .map((item, index) => (
                        <div key={index} className="relative group">
                          <button
                            onClick={(e) => handleChangeVariant(item.variantId)}
                            className="focus:outline-none transition-all duration-200"
                          >
                            {/* Color Circle */}
                            <div
                              className={`w-8 h-8 rounded-full transition-all duration-200 ${
                                item.isSelected
                                  ? "border-4 border-green-300 shadow-lg"
                                  : "border-1 border-gray-300 hover:border-gray-400"
                              }`}
                              style={{
                                backgroundColor: item.variant.hexColor,
                                boxShadow: item.isSelected
                                  ? "0 4px 12px rgba(0,0,0,0.3), 0 0 0 2px rgba(34, 197, 94, 0.5)"
                                  : "0 2px 4px rgba(0,0,0,0.1)",
                              }}
                            />
                          </button>

                          {/* Hover Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 shadow-xl">
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-4 h-4 rounded-full border border-white"
                                style={{
                                  backgroundColor: item.variant.hexColor,
                                }}
                              />
                              <div className="flex flex-col">
                                <span className="font-semibold text-white">
                                  {showingTranslateValue(item.variant.name)}
                                </span>
                                <span className="font-mono text-gray-300 text-xs">
                                  {item.variant.hexColor}
                                </span>
                              </div>
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      ))
                  )}
              </div>
            </div>
          ) : (
            /* Responsive Slider Layout */
            <div className="relative w-full">
              <div className="flex items-center gap-2 w-full">
                {/* Left Arrow - Only show if more than 5 variants */}
                {hasMoreThanFive && (
                  <button
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                    className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border transition-all duration-200 flex-shrink-0 ${
                      canScrollLeft
                        ? "border-[#EF4036] text-[#EF4036] hover:border-[#C53030] hover:bg-[#EF4036]/10"
                        : "border-gray-200 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                )}

                {/* Scrollable Container */}
                <div
                  ref={scrollContainerRef}
                  className="flex-1 overflow-x-auto scrollbar-hide min-w-0"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    maxWidth: hasMoreThanFive
                      ? "calc(5 * 120px + 4 * 8px)"
                      : "100%", // 5 buttons + 4 gaps
                  }}
                >
                  <div
                    className="flex gap-2 pb-1"
                    style={{
                      width: hasMoreThanFive ? "max-content" : "100%",
                      display: "flex",
                      flexWrap: hasMoreThanFive ? "nowrap" : "wrap",
                    }}
                  >
                    {[
                      ...new Map(
                        variants?.map((v) => [v[att], v].filter(Boolean))
                      ).values(),
                    ]
                      .filter(Boolean)
                      .map((vl, i) =>
                        varTitle
                          .map((vr) =>
                            vr?.variants?.map(
                              (el) =>
                                vr?._id === att &&
                                el?._id === vl[att] && {
                                  variant: el,
                                  isSelected: Object?.values(
                                    selectVariant
                                  ).includes(vl[att]),
                                  variantId: vl[att],
                                }
                            )
                          )
                          .flat()
                          .filter(Boolean)
                          .map((item, index) => (
                            <div key={index} className="flex-shrink-0">
                              <button
                                onClick={(e) =>
                                  handleChangeVariant(item.variantId)
                                }
                                className={`${
                                  item.isSelected
                                    ? "bg-[#EF4036] text-white border-2 border-[#EF4036] rounded-full inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium focus:outline-none transition-all duration-200 shadow-sm"
                                    : "bg-white border-2 border-gray-300 text-gray-700 rounded-full inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium focus:outline-none hover:border-[#EF4036] hover:bg-[#EF4036]/5 transition-all duration-200"
                                }`}
                                style={{
                                  minWidth: hasMoreThanFive ? "100px" : "auto",
                                  maxWidth: hasMoreThanFive ? "120px" : "auto",
                                }}
                              >
                                {showingTranslateValue(item.variant.name)}
                              </button>
                            </div>
                          ))
                      )}
                  </div>
                </div>

                {/* Right Arrow - Only show if more than 5 variants */}
                {hasMoreThanFive && (
                  <button
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                    className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border transition-all duration-200 flex-shrink-0 ${
                      canScrollRight
                        ? "border-[#EF4036] text-[#EF4036] hover:border-[#C53030] hover:bg-[#EF4036]/10"
                        : "border-gray-200 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default VariantList;
