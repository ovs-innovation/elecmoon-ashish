import { FiTrash2 } from "react-icons/fi";
//internal import
import Tooltip from "@/components/tooltip/Tooltip";

const EditDeleteButtonTwo = ({
  extra,
  variant,
  handleRemoveVariant,
  attribute,
}) => {
  return (
    <>
      <div className="flex justify-end text-right space-x-1">


        <button
          onClick={() => handleRemoveVariant(variant, extra)}
          className="p-2 cursor-pointer text-gray-400 hover:text-red-600 transition-colors"
          title="Delete Variant"
        >
          <Tooltip
            id="delete"
            Icon={FiTrash2}
            title="Delete Variant"
            bgColor="#EF4444"
          />
        </button>
      </div>
    </>
  );
};

export default EditDeleteButtonTwo;
