import {
  Avatar,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

//internal import
import useUtilsFunction from "@/hooks/useUtilsFunction";
import CheckBox from "@/components/form/others/CheckBox";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import MainDrawer from "@/components/drawer/MainDrawer";
import BlogDrawer from "@/components/drawer/BlogDrawer";
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";

const BlogTable = ({ isCheck, blogs, setIsCheck }) => {
  const [updatedBlogs, setUpdatedBlogs] = useState([]);

  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const { showDateFormat, globalSetting, showingTranslateValue } =
    useUtilsFunction();

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    const result = blogs?.map((el) => {
      const newDate = new Date(el?.updatedAt || el?.createdAt).toLocaleString("en-US", {
        timeZone: globalSetting?.default_time_zone,
      });
      const newObj = {
        ...el,
        updatedDate: newDate,
      };
      return newObj;
    });
    setUpdatedBlogs(result);
  }, [blogs, globalSetting?.default_time_zone]);

  const getTitle = (titleObj) => {
    if (typeof titleObj === "string") return titleObj;
    if (typeof titleObj === "object" && titleObj !== null) {
      return titleObj.en || titleObj[Object.keys(titleObj)[0]] || "";
    }
    return "";
  };

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck.length < 2 && (
        <MainDrawer>
          <BlogDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {updatedBlogs?.map((blog, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={getTitle(blog?.title)}
                id={blog._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(blog._id)}
              />
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm font-semibold">
                    {getTitle(blog?.title)}
                  </span>
                </div>
              </div>
            </TableCell>

            <TableCell>
              {blog?.image ? (
                <Avatar
                  className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                  src={blog?.image}
                  alt="blog"
                />
              ) : (
                <Avatar
                  src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                  alt="blog"
                />
              )}
            </TableCell>

            <TableCell>
              <span className="text-sm">{blog?.author || "N/A"}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{blog?.category || "N/A"}</span>
            </TableCell>

            <TableCell className="text-center">
              <ShowHideButton id={blog._id} status={blog.status} />
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {showDateFormat(blog.publishedAt || blog.createdAt)}
              </span>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={blog?._id}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={getTitle(blog?.title)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default BlogTable;

