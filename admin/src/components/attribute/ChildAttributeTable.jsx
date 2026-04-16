import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";

//internal import
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import MainDrawer from "@/components/drawer/MainDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import AttributeChildDrawer from "@/components/drawer/AttributeChildDrawer";

const ChildAttributeTable = ({
  att,
  loading,
  isCheck,
  setIsCheck,
  childAttributes,
}) => {
  // console.log(lang);
  // console.log("att", childAttributes);

  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { showingTranslateValue } = useUtilsFunction();

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  // Check if this is a color attribute
  const isColorAttribute = att?.title?.en?.toLowerCase() === "color" || 
                          att?.name?.en?.toLowerCase() === "color";

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck.length < 2 && (
        <MainDrawer>
          <AttributeChildDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {childAttributes?.map((attribute, index) => (
          <TableRow key={index + 1}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name="child-attribute"
                id={attribute._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(attribute._id)}
              />
            </TableCell>
            <TableCell className="font-semibold uppercase text-xs">
              {attribute?._id?.substring(20, 24)}
            </TableCell>

            <TableCell className="font-medium text-sm">
              {showingTranslateValue(attribute?.name)}
            </TableCell>

            <TableCell className="font-medium text-sm">{att?.option}</TableCell>

            {/* Hex Color Column - Only show for Color attributes */}
            {isColorAttribute && (
              <TableCell className="font-medium text-sm">
                {attribute?.hexColor ? (
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-6 h-6 rounded border border-gray-300"
                      style={{ backgroundColor: attribute.hexColor }}
                    />
                    <span className="text-xs font-mono text-gray-600">
                      {attribute.hexColor}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs">No color</span>
                )}
              </TableCell>
            )}

            <TableCell className="text-center">
              <ShowHideButton id={attribute._id} status={attribute.status} />
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={attribute._id}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(attribute.name)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ChildAttributeTable;
