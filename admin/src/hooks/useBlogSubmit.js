import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import BlogServices from "@/services/BlogServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import useTranslationValue from "./useTranslationValue";

const useBlogSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [imageUrl, setImageUrl] = useState("");
  const [language, setLanguage] = useState("en");
  const [resData, setResData] = useState({});
  const [published, setPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [categories] = useState([
    { _id: "1", name: "electrical tagging" },
    { _id: "2", name: "Electrical test and tag melbourne" },
    { _id: "3", name: "Fire Safety" },
    { _id: "4", name: "Safety Compliance" },
    { _id: "5", name: "General" },
  ]);

  const { handlerTextTranslateHandler } = useTranslationValue();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSlugChange = (title) => {
    if (title) {
      const slug = generateSlug(title);
      setValue("slug", slug);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      const title = data?.title;
      const description = data?.description || "";
      const content = data?.content || "";
      
      const titleTranslates = await handlerTextTranslateHandler(
        title,
        language,
        resData?.title
      );
      
      const descriptionTranslates = await handlerTextTranslateHandler(
        description,
        language,
        resData?.description
      );
      
      const contentTranslates = await handlerTextTranslateHandler(
        content,
        language,
        resData?.content
      );

      const slug = data?.slug || generateSlug(title);

      const blogData = {
        title: {
          ...titleTranslates,
          [language]: title,
        },
        description: {
          ...descriptionTranslates,
          [language]: description,
        },
        content: {
          ...contentTranslates,
          [language]: content,
        },
        slug: slug,
        image: imageUrl,
        author: data?.author || "",
        category: data?.category || "",
        tags: tags && tags.length > 0 ? tags : [],
        status: data?.status || "show",
        publishedAt: data?.publishedAt ? new Date(data.publishedAt) : new Date(),
      };

      if (id) {
        const res = await BlogServices.updateBlog(id, blogData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message || "Blog updated successfully!");
        closeDrawer();
      } else {
        const res = await BlogServices.addBlog(blogData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess("Blog added successfully!");
        closeDrawer();
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message);
      setIsSubmitting(false);
      closeDrawer();
    }
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    if (Object.keys(resData).length > 0) {
      setValue("title", resData.title?.[lang] || resData.title?.["en"] || "");
      setValue("description", resData.description?.[lang] || resData.description?.["en"] || "");
      setValue("content", resData.content?.[lang] || resData.content?.["en"] || "");
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setCurrentBlog(null);
      setValue("title", "");
      setValue("description", "");
      setValue("content", "");
      setValue("slug", "");
      setValue("author", "");
      setValue("category", "");
      setValue("status", "show");
      setValue("publishedAt", dayjs().format("YYYY-MM-DD"));
      setTags([]);
      setImageUrl("");
      clearErrors();
      setLanguage(lang);
      setPublished(false);
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await BlogServices.getBlogById(id);
          if (res) {
            setCurrentBlog(res);
            setResData(res);
            setValue("title", res.title?.[language] || res.title?.["en"] || (typeof res.title === "string" ? res.title : ""));
            setValue("description", res.description?.[language] || res.description?.["en"] || (typeof res.description === "string" ? res.description : ""));
            setValue("content", res.content?.[language] || res.content?.["en"] || (typeof res.content === "string" ? res.content : ""));
            setValue("slug", res.slug || "");
            setValue("author", res.author || "");
            setValue("category", res.category || "");
            setValue("status", res.status || "show");
            setTags(res.tags || []);
            setValue("publishedAt", res.publishedAt ? dayjs(res.publishedAt).format("YYYY-MM-DD") : "");
            setPublished(res.status === "show" ? true : false);
            setImageUrl(res.image || "");
          }
        } catch (err) {
          notifyError(err?.response?.data?.message || err?.message);
        }
      })();
    } else {
      // Set default date for new blog
      setValue("publishedAt", dayjs().format("YYYY-MM-DD"));
    }
  }, [id, setValue, isDrawerOpen, clearErrors, language, lang]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setImageUrl,
    imageUrl,
    published,
    setPublished,
    isSubmitting,
    handleSelectLanguage,
    tags,
    setTags,
    categories,
    currentBlog,
    handleSlugChange,
    setValue,
  };
};

export default useBlogSubmit;

