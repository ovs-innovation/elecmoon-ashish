import React, { useEffect, useState } from "react";

import {
  Button,
  Input,
  Textarea,
  Select,
  Label,
  Badge,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiX, FiTrash2 } from "react-icons/fi";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, Modifier, SelectionState } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";

// Custom Image Component for rendering images in editor
const ImageComponent = (props) => {
  const { block, contentState, blockProps } = props;
  try {
    const entityKey = block.getEntityAt(0);
    if (!entityKey) return null;
    const entity = contentState.getEntity(entityKey);
    if (!entity) return null;
    const { src, alt, width, height } = entity.getData();
    const handleDelete = () => {
      if (blockProps && blockProps.onDeleteImage) {
        blockProps.onDeleteImage(block.getKey());
      }
    };
    return (
      <div style={{ position: "relative", textAlign: "center", margin: "15px 0" }}>
        <img
          src={src}
          alt={alt || ""}
          style={{
            maxWidth: "100%",
            height: height || "auto",
            width: width || "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
        {blockProps && blockProps.onDeleteImage && (
          <button
            type="button"
            onClick={handleDelete}
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              background: "rgba(255,255,255,0.9)",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
              zIndex: 2,
            }}
            title="Delete Image"
          >
            <FiTrash2 color="#c00" size={18} />
          </button>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error rendering image component:", error);
    return null;
  }
};

const renderImage = (entityData) => {
  if (!entityData || !entityData.src) {
    return null;
  }
  
  const { src, alt = "", width = "auto", height = "auto" } = entityData;
  
  return (
    <div style={{ textAlign: "center", margin: "15px 0" }}>
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: "100%",
          height: height,
          width: width,
          display: "block",
          margin: "0 auto",
        }}
      />
    </div>
  );
};

const blockRendererFn = (contentBlock) => {
  const type = contentBlock.getType();
  
  // Render atomic blocks (images)
  if (type === "atomic") {
    return {
      component: ImageComponent,
      editable: false,
      props: {
        block: contentBlock,
      },
    };
  }
  
  return null;
};

//internal import
import Title from "@/components/form/others/Title";
import Error from "@/components/form/others/Error";
import LabelArea from "@/components/form/selectOption/LabelArea";
import DrawerButton from "@/components/form/button/DrawerButton";
import Uploader from "@/components/image-uploader/Uploader";
import useBlogSubmit from "@/hooks/useBlogSubmit";

const handleDeleteImageBlockFactory = (editorState, setEditorState, setValue) => (blockKey) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap().delete(blockKey);
  const newContentState = contentState.merge({ blockMap });
  const newEditorState = EditorState.push(editorState, newContentState, "remove-range");
  setEditorState(newEditorState);
  setValue("content", draftToHtml(convertToRaw(newEditorState.getCurrentContent())));
};

const BlogDrawer = ({ id }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    isSubmitting,
    imageUrl,
    setImageUrl,
    tags,
    setTags,
    categories,
    currentBlog,
    handleSlugChange,
  } = useBlogSubmit(id);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const uploadImage = (file) =>
    new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = () => resolve({ data: { link: reader.result } });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } catch (e) {
        reject(e);
      }
    });

  function createEditorStateFromHTML(html) {
    if (!html || html.trim() === "") {
      return EditorState.createEmpty();
    }
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const { contentBlocks, entityMap } = contentBlock;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  }

  useEffect(() => {
    if (id && currentBlog?.content) {
      const html = typeof currentBlog.content === "string" 
        ? currentBlog.content 
        : currentBlog.content?.en || currentBlog.content?.[Object.keys(currentBlog.content || {})[0]] || "";
      const state = createEditorStateFromHTML(html);
      setEditorState(state);
      setValue("content", html);
    } else if (!id) {
      setEditorState(EditorState.createEmpty());
      setValue("content", "");
    }
  }, [id, currentBlog, setValue]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    const html = draftToHtml(convertToRaw(state.getCurrentContent()));
    setValue("content", html);
  };

  const handleDeleteImageBlock = handleDeleteImageBlockFactory(editorState, setEditorState, setValue);
  
  const blockRendererFnWithDelete = (contentBlock) => {
    if (contentBlock.getType() === "atomic") {
      return {
        component: ImageComponent,
        editable: false,
        props: {
          onDeleteImage: handleDeleteImageBlock,
        },
      };
    }
    return null;
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title title="Update Blog" description="Update blog information" />
        ) : (
          <Title title="Add Blog" description="Create a new blog post" />
        )}
      </div>

      <div className="px-6 py-4 flex flex-col overflow-y-auto bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-6 gap-4 md:grid-cols-12">
            <div className="col-span-6 md:col-span-12">
              <LabelArea label="Title" />
              <Input
                {...register("title", {
                  required: "Title is required!",
                  onChange: (e) => {
                    if (!id) {
                      handleSlugChange(e.target.value);
                    }
                  },
                })}
                name="title"
                type="text"
                placeholder="Blog Title"
                className="mb-4"
              />
              <Error errorName={errors.title} />
            </div>

            <div className="col-span-6 md:col-span-12">
              <LabelArea label="Slug" />
              <Input
                {...register("slug", {
                  required: "Slug is required!",
                })}
                name="slug"
                type="text"
                placeholder="blog-slug"
                className="mb-4"
              />
              <Error errorName={errors.slug} />
            </div>

            <div className="col-span-6 md:col-span-6">
              <LabelArea label="Category" />
              <Select
                {...register("category", {
                  required: "Category is required!",
                })}
                name="category"
                className="mb-4"
              >
                <option value="">Select Category</option>
                {categories?.map((cat) => (
                  <option key={cat._id || cat} value={cat.name || cat}>
                    {cat.name || cat}
                  </option>
                ))}
              </Select>
              <Error errorName={errors.category} />
            </div>

            <div className="col-span-6 md:col-span-6">
              <LabelArea label="Author" />
              <Input
                {...register("author", {
                  required: "Author is required!",
                })}
                name="author"
                type="text"
                placeholder="Author Name"
                className="mb-4"
              />
              <Error errorName={errors.author} />
            </div>

            <div className="col-span-6 md:col-span-12">
              <LabelArea label="Description" />
              <Textarea
                {...register("description")}
                name="description"
                type="text"
                placeholder="Short description"
                rows="3"
                className="mb-4"
              />
              <Error errorName={errors.description} />
            </div>

            <div className="col-span-6 md:col-span-12">
              <LabelArea label="Content" />
              <div className="mb-4">
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .demo-wrapper .rdw-editor-toolbar {
                      position: sticky !important;
                      top: 0 !important;
                      z-index: 10 !important;
                      background: white !important;
                      border: none !important;
                      border-bottom: 1px solid #F1F1F1 !important;
                      padding: 8px 5px !important;
                      margin-bottom: 0 !important;
                      margin-top: 0 !important;
                    }
                    .demo-wrapper .rdw-editor-wrapper {
                      border: 1px solid #F1F1F1 !important;
                      border-top: none !important;
                    }
                    .demo-wrapper .rdw-editor-toolbar::before,
                    .demo-wrapper .rdw-editor-toolbar::after {
                      display: none !important;
                    }
                    .dark .demo-wrapper .rdw-editor-toolbar {
                      background: #1f2937 !important;
                      border-bottom: 1px solid #374151 !important;
                      border-top: none !important;
                    }
                  `
                }} />
                <Editor
                  editorState={editorState}
                  onEditorStateChange={handleEditorChange}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  blockRendererFn={blockRendererFnWithDelete}
                  toolbar={{
                    options: ["inline", "blockType", "fontSize", "list", "textAlign", "colorPicker", "link", "image", "history"],
                    blockType: {
                      inDropdown: true,
                      options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote", "Code"],
                    },
                    image: {
                      uploadCallback: uploadImage,
                      previewImage: true,
                      alt: { present: true, mandatory: false },
                      inputAccept: "image/*",
                      urlEnabled: true,
                      defaultSize: {
                        height: "auto",
                        width: "auto",
                      },
                    },
                  }}
                  editorStyle={{ border: "1px solid #F1F1F1", padding: "0 15px", minHeight: 200 }}
                />
              </div>
              <input type="hidden" {...register("content")} name="content" />
              <Error errorName={errors.content} />
            </div>

            <div className="col-span-6 md:col-span-12">
              <LabelArea label="Featured Image" />
              <Uploader
                setImageUrl={setImageUrl}
                imageUrl={imageUrl}
                folder="blogs"
              />
              <Error errorName={errors.image} />
            </div>

            <div className="col-span-6 md:col-span-6">
              <LabelArea label="Status" />
              <Select
                {...register("status")}
                name="status"
                className="mb-4"
              >
                <option value="show">Published</option>
                <option value="hide">Draft</option>
              </Select>
              <Error errorName={errors.status} />
            </div>

            <div className="col-span-6 md:col-span-6">
              <LabelArea label="Published Date" />
              <Input
                {...register("publishedAt")}
                name="publishedAt"
                type="date"
                className="mb-4"
              />
              <Error errorName={errors.publishedAt} />
            </div>

            <div className="col-span-6 md:col-span-6">
              <LabelArea label="Tags" />
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Type tag and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim()) {
                      e.preventDefault();
                      const newTag = e.target.value.trim();
                      if (!tags.includes(newTag)) {
                        setTags([...tags, newTag]);
                      }
                      e.target.value = "";
                    }
                  }}
                  className="mb-2"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      type="neutral"
                      className="flex items-center gap-1 px-2 py-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => {
                          setTags(tags.filter((_, i) => i !== index));
                        }}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DrawerButton
            id={id}
            title="Blog"
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </>
  );
};

export default BlogDrawer;
