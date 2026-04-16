import React, { useState, useMemo, createContext, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import CategoryServices from "@services/CategoryServices";
import ServiceServices from "@services/ServiceServices";
import Cookies from "js-cookie";

// create context
export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const router = useRouter();
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  const lang = Cookies.get("_lang") || "en";

  // Moved filtering logic here for reusability
  const showingTranslateValue = useCallback((data) => {
    if (!data || typeof data !== "object") return "";
    return data[lang] || data?.en || Object.values(data).find(v => v) || "";
  }, [lang]);

  const fetchCategories = async () => {
    try {
      setIsCategoriesLoading(true);
      const res = await CategoryServices.getShowingCategory();
      let catList = res || [];

      // Logic to find first-level meaningful categories
      const findMainCategories = (list) => {
        if (list.length === 1) {
          const name = showingTranslateValue(list[0].name)?.toLowerCase()?.trim();
          if (name === 'home' || name === 'all categories' || name === 'all departments' || !list[0].parentId) {
            if (list[0].children && list[0].children.length > 0) {
              return findMainCategories(list[0].children);
            }
          }
        }
        return list;
      };

      const finalCategories = findMainCategories(catList);

      // Filter out Home/All Categories placeholders
      const filtered = finalCategories.filter(cat => {
        const name = showingTranslateValue(cat.name)?.toLowerCase()?.trim();
        return name !== 'home' && name !== 'all categories' && name !== 'all departments' && name !== '';
      });

      setCategories(filtered);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await ServiceServices.getShowingServices();
      setServices(res || []);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, [lang]); // Re-fetch or re-filter on language change

  // Global route loading indicator to avoid "double click" feel.
  useEffect(() => {
    const start = () => setIsLoading(true);
    const done = () => setIsLoading(false);

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
    };
  }, [router.events]);

  const toggleCategoryDrawer = () => setCategoryDrawerOpen(!categoryDrawerOpen);
  const closeCategoryDrawer = () => setCategoryDrawerOpen(false);

  const toggleCartDrawer = () => setCartDrawerOpen(!cartDrawerOpen);
  const closeCartDrawer = () => setCartDrawerOpen(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  const handleChangePage = (p) => {
    setCurrentPage(p);
  };

  const value = useMemo(
    () => ({
      categoryDrawerOpen,
      toggleCategoryDrawer,
      closeCategoryDrawer,
      cartDrawerOpen,
      toggleCartDrawer,
      closeCartDrawer,
      isModalOpen,
      toggleModal,
      closeModal,
      currentPage,
      setCurrentPage,
      handleChangePage,
      isLoading,
      setIsLoading,
      categories,
      services,
      isCategoriesLoading
    }),

    [categoryDrawerOpen, cartDrawerOpen, isModalOpen, currentPage, isLoading, categories, services, isCategoriesLoading]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
