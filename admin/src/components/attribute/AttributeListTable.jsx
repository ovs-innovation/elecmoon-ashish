import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "@windmill/react-ui";
import { FiEdit } from "react-icons/fi";

//internal import
import useUtilsFunction from "@/hooks/useUtilsFunction";
import SkuBarcodeInput from "@/components/form/selectOption/SkuBarcodeInput";
import EditDeleteButtonTwo from "@/components/table/EditDeleteButtonTwo";
import VariantEditDrawer from "./VariantEditDrawer";

const AttributeListTable = ({
  variants,
  setTapValue,
  variantTitle,
  deleteModalShow,
  handleSkuBarcode,
  handleRemoveVariant,
  handleUpdateVariant,
  language,
  errors,
}) => {
  const { t } = useTranslation();
  const { showingTranslateValue } = useUtilsFunction();
  const [editingVariant, setEditingVariant] = useState(null);

  const handleEditVariant = (variant, index) => {
    setEditingVariant({ variant, index });
  };

  const handleSaveVariant = (updatedVariant) => {
    if (handleUpdateVariant && editingVariant) {
      handleUpdateVariant(updatedVariant, editingVariant.index);
    }
    setEditingVariant(null);
  };

  const handleCloseEdit = () => {
    setEditingVariant(null);
  };

  return (
    <>
      {editingVariant && (
        <VariantEditDrawer
          variant={editingVariant.variant}
          onSave={handleSaveVariant}
          onClose={handleCloseEdit}
          language={language}
          errors={errors}
          variantTitle={variantTitle}
        />
      )}
      <TableBody>
        {variants?.map((variant, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <div className="flex items-center space-x-2">
                {variant.image && variant.image.length > 0 ? (
                  <div className="flex flex-col items-center">
                    <div className="flex space-x-1">
                      {variant.image.slice(0, 3).map((img, imgIndex) => (
                        <Avatar
                          key={imgIndex}
                          className="p-1 bg-gray-50 shadow-none w-8 h-8"
                          src={img}
                          alt="product"
                        />
                      ))}
                      {variant.image.length > 3 && (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600">
                          +{variant.image.length - 3}
                        </div>
                      )}
                    </div>
                    <button
                      className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer mt-1 px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded"
                      onClick={() => handleEditVariant(variant, i)}
                    >
                      {t("Edit")}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Avatar
                      src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                      alt="product"
                      className="p-1 mr-2 bg-gray-50 shadow-none w-12 h-12"
                    />
                    <button
                      className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer mt-1 px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded"
                      onClick={() => handleEditVariant(variant, i)}
                    >
                      {t("Add Images")}
                    </button>
                  </div>
                )}
              </div>
            </TableCell>

            <TableCell>
              <div className="flex flex-col text-sm">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {variant.title?.[language] ||
                    variantTitle
                      ?.map((att) => {
                        const attributeData = att?.variants?.filter(
                          (val) => val?.name !== "All"
                        );

                        const attributeName = attributeData?.find(
                          (v) => v._id === variant[att?._id]
                        )?.name;
                        if (attributeName === undefined) {
                          return attributeName?.en;
                        } else {
                          return showingTranslateValue(attributeName);
                        }
                      })
                      ?.filter(Boolean)
                      .join(" ") ||
                    `Variant ${i + 1}`}
                </div>

                {variant.slug && (
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Slug: {variant.slug}
                  </div>
                )}

                {variant.productId && (
                  <span className="text-xs text-gray-500">
                    ID: {variant.productId}
                  </span>
                )}
              </div>
            </TableCell>

            {/* <TableCell>
              <SkuBarcodeInput
                id={i}
                name="sku"
                placeholder="Sku"
                value={variant.sku}
                handleSkuBarcode={handleSkuBarcode}
              />
            </TableCell> */}

            <TableCell>
              <div className="flex space-x-2">
                <Button
                  size="small"
                  layout="outline"
                  onClick={() => handleEditVariant(variant, i)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FiEdit className="w-4 h-4" />
                </Button>
                <EditDeleteButtonTwo
                  attribute
                  variant={variant}
                  setTapValue={setTapValue}
                  deleteModalShow={deleteModalShow}
                  handleRemoveVariant={handleRemoveVariant}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default AttributeListTable;
