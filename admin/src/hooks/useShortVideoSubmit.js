import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// internal import
import { SidebarContext } from "@/context/SidebarContext";
import ShortVideoServices from "@/services/ShortVideoServices";
import ProductServices from "@/services/ProductServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import useTranslationValue from "./useTranslationValue";

const useShortVideoSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } = useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [language, setLanguage] = useState("en");
  const [published, setPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState([]);

  const { handlerTextTranslateHandler } = useTranslationValue();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      try {
        const res = await ProductServices.getAllProducts({ page: 1, limit: 1000, category: "", title: "", price: "" });
        setProducts(res.products || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const onSubmit = async ({ title, videoUrl, product, order }) => {
    try {
      setIsSubmitting(true);
      const titleTranslates = await handlerTextTranslateHandler(
        title,
        language,
        resData?.title
      );

      const shortVideoData = {
        title: {
          ...titleTranslates,
          [language]: title,
        },
        videoUrl,
        product: product || null,
        order: parseInt(order) || 0,
        status: published ? "show" : "hide",
      };

      if (id) {
        const res = await ShortVideoServices.updateShortVideo(id, shortVideoData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        reset();
      } else {
        const res = await ShortVideoServices.addShortVideo(shortVideoData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      setIsSubmitting(false);
      notifyError(err ? err?.response?.data?.message : err?.message);
    }
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    if (Object.keys(resData).length > 0) {
      setValue("title", resData.title[lang ? lang : "en"]);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      reset({
        title: "",
        videoUrl: "",
        product: "",
        order: 0,
      });
      setPublished(true);
      clearErrors("title");
      setLanguage(lang);
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await ShortVideoServices.getShortVideoById(id);
          if (res) {
            setResData(res);
            setValue("title", res.title[language ? language : "en"]);
            setValue("videoUrl", res.videoUrl);
            setValue("product", res.product?._id);
            setValue("order", res.order);
            setPublished(res.status === "show");
          }
        } catch (err) {
          notifyError(err ? err.response.data.message : err.message);
        }
      })();
    }
  }, [id, setValue, isDrawerOpen, language, clearErrors, lang]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    published,
    setPublished,
    isSubmitting,
    handleSelectLanguage,
    products,
  };
};

export default useShortVideoSubmit;
