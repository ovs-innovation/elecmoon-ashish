import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { FiEdit, FiTrash2 } from "react-icons/fi";

// internal import
import useUtilsFunction from "@/hooks/useUtilsFunction";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import Status from "@/components/table/Status";
// Removed unused imports


const ServiceTable = ({ services, lang, handleUpdate, handleModalOpen }) => {
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <>
      <TableBody>
        {services?.map((service) => (
          <TableRow key={service._id}>
            <TableCell>
              <img
                src={service.icon || "https://res.cloudinary.com/ahashim/image/upload/v1647291828/default_icon.png"}
                alt="icon"
                className="w-8 h-8 rounded-full"
              />
            </TableCell>
            <TableCell>
              <span className="text-sm">{showingTranslateValue(service.name) || <span className="text-red-400 italic">Unnamed</span>}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">{service.group || "Other"}</span>
            </TableCell>
            <TableCell className="text-center">
              <Status status={service.status} />
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={service._id}
                service={service}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(service.name)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ServiceTable;
