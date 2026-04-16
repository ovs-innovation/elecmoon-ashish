import React from "react";
import { TableBody, TableRow, TableCell, Badge } from "@windmill/react-ui";
import { FiEdit, FiTrash2 } from "react-icons/fi";

// internal import
import Status from "@/components/table/Status";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const ShortVideoTable = ({ shortVideos, lang, handleUpdate, handleModalOpen }) => {
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <TableBody>
      {shortVideos.map((item, i) => (
        <TableRow key={i + 1}>
          <TableCell>
            <span className="font-semibold text-xs">{item.order}</span>
          </TableCell>
          <TableCell>
            <div className="flex items-center">
              <span className="text-sm font-medium">
                {showingTranslateValue(item.title)}
              </span>
            </div>
          </TableCell>
          <TableCell>
            <span className="text-xs text-blue-500 truncate max-w-[200px] block">
              {item.videoUrl}
            </span>
          </TableCell>
          <TableCell>
            <span className="text-xs font-semibold">
              {item.product ? showingTranslateValue(item.product.title) : "N/A"}
            </span>
          </TableCell>
          <TableCell className="text-center">
            <Status status={item.status} />
          </TableCell>
          <TableCell className="text-right">
            <EditDeleteButton
              id={item._id}
              isUnit={true}
              handleUpdate={handleUpdate}
              handleModalOpen={handleModalOpen}
              title={showingTranslateValue(item.title)}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ShortVideoTable;
