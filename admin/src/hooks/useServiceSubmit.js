import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// internal import
import { SidebarContext } from "@/context/SidebarContext";
import ServiceServices from "@/services/ServiceServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import useTranslationValue from "./useTranslationValue";

const useServiceSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } = useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [language, setLanguage] = useState("en");
  const [published, setPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handlerTextTranslateHandler } = useTranslationValue();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ name, description, group }) => {
    try {
      setIsSubmitting(true);
      const nameTranslates = await handlerTextTranslateHandler(
        name,
        language,
        resData?.name
      );
      const descriptionTranslates = await handlerTextTranslateHandler(
        description,
        language,
        resData?.description
      );

      const serviceData = {
        name: {
          ...nameTranslates,
          [language]: name,
        },
        description: {
          ...descriptionTranslates,
          [language]: description || "",
        },
        slug: name.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"),
        group: group || "Other",
        icon: imageUrl,
        status: published ? "show" : "hide",
      };

      if (id) {
        const res = await ServiceServices.updateService(id, serviceData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        reset();
      } else {
        const res = await ServiceServices.addService(serviceData);
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
      setValue("name", resData.name[lang ? lang : "en"]);
      setValue("description", resData.description[lang ? lang : "en"]);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      reset({
        name: "",
        description: "",
        group: "",
      });
      setImageUrl("");
      setPublished(true);
      clearErrors("name");
      setLanguage(lang);
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await ServiceServices.getServiceById(id);
          if (res) {
            setResData(res);
            setValue("name", res.name[language ? language : "en"]);
            setValue("description", res.description[language ? language : "en"]);
            setValue("group", res.group);
            setImageUrl(res.icon);
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
    imageUrl,
    setImageUrl,
    published,
    setPublished,
    isSubmitting,
    handleSelectLanguage,
  };
};

export default useServiceSubmit;
