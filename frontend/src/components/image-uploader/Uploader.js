import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

const Uploader = ({ setImageUrl, imageUrl, isCompact, multiple }) => {
  const [files, setFiles] = useState([]);
  const uploadUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const upload_Preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    multiple: multiple || false,
    maxSize: 2000000, 
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (files.length > 0) {
      setIsUploading(true);
      const uploadFiles = async () => {
        try {
          const uploadedUrls = [];
          for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", upload_Preset);
            
            const res = await axios.post(uploadUrl, formData, {
              onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(progress);
              },
            });
            uploadedUrls.push(res.data.secure_url);
          }
          
          if (multiple) {
            // Merge with existing images if any
            const existing = Array.isArray(imageUrl) ? imageUrl : (imageUrl ? [imageUrl] : []);
            setImageUrl([...existing, ...uploadedUrls]);
          } else {
            setImageUrl(uploadedUrls[0]);
          }
          setIsUploading(false);
          setUploadProgress(100);
          setFiles([]); // Clear local files after upload
        } catch (err) {
          console.error("Upload Error:", err);
          setIsUploading(false);
        }
      };
      uploadFiles();
    }
  }, [files]);

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const removeImage = (index) => {
    if (multiple) {
      const newImages = imageUrl.filter((_, i) => i !== index);
      setImageUrl(newImages);
    } else {
      setImageUrl("");
    }
  };

  if (isCompact) {
    const images = multiple ? (Array.isArray(imageUrl) ? imageUrl : (imageUrl ? [imageUrl] : [])) : (imageUrl ? [imageUrl] : []);
    
    return (
      <div className="flex flex-wrap items-center gap-2">
        <div {...getRootProps()} className="cursor-pointer bg-white/10 hover:bg-white/20 px-3 h-[38px] rounded-lg flex items-center justify-center gap-2 border border-white/10 transition-all group shrink-0">
          <input {...getInputProps()} />
          <FiUploadCloud className="text-white text-base group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">
            {isUploading ? `${uploadProgress}%` : "Add Photo"}
          </span>
        </div>
        
        {images.map((url, i) => (
          <div key={i} className="relative w-[38px] h-[38px] border border-white/20 rounded-lg overflow-hidden shadow-lg group">
             <img src={url} alt="uploaded" className="w-full h-full object-cover" />
             <button 
               onClick={(e) => { e.stopPropagation(); removeImage(i); }}
               className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
             >
               ×
             </button>
          </div>
        ))}
        
        {isUploading && images.length === 0 && (
           <div className="w-[38px] h-[38px] border border-white/20 rounded-lg flex items-center justify-center bg-white/5 animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
           </div>
        )}
      </div>
    );
  }

  // Regular version (if needed, but mostly compact is used in review)
  return (
    <div className="w-full">
      <div className="px-4 py-8 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer hover:border-gray-300 transition-colors bg-gray-50/50" {...getRootProps()}>
        <input {...getInputProps()} />
        <FiUploadCloud className="mx-auto text-2xl text-gray-400 mb-2" />
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Upload Images</p>
      </div>
      
      {imageUrl && (
        <div className="flex flex-wrap gap-2 mt-4">
          {(multiple ? imageUrl : [imageUrl]).map((url, i) => (
            <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-100 group">
              <img src={url} className="w-full h-full object-cover" alt="preview" />
              <button 
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Uploader;
