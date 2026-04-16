import React from "react";
import { Modal, ModalBody, ModalFooter, Button, ModalHeader, Table, TableHeader, TableCell, TableBody, TableRow, TableContainer } from "@windmill/react-ui";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const CustomerProductModal = ({ isOpen, onClose, products, title }) => {
  const { currency, getNumberTwo } = useUtilsFunction();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full px-6 py-4 overflow-visible bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-2xl">
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        {products && products.length > 0 ? (
          <TableContainer className="mb-8 overflow-visible">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  {!title?.includes("Wishlist") && <TableCell>Quantity</TableCell>}
                </tr>
              </TableHeader>
              <TableBody>
                {products.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="relative group cursor-pointer">
                        <img
                          className="w-12 h-12 object-cover rounded shadow-sm border border-gray-100 transition-all duration-300 ease-in-out transform group-hover:scale-[2.5] group-hover:z-50 group-hover:-translate-y-2 group-hover:translate-x-4 relative bg-gray-50"
                          src={Array.isArray(item.image) ? item.image[0] : (item.image || "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_igmacm.svg")}
                          alt={typeof item.title === 'string' ? item.title : (item.title?.en || item.name?.en || "Product")}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {typeof item.title === 'object' ? (item.title?.en || item.name?.en) : (item.title || item.name)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-semibold">{currency}{(item.price)}</span>
                    </TableCell>
                    {!title?.includes("Wishlist") && (
                      <TableCell>
                        <span className="text-sm">{item.quantity || 1}</span>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p className="text-gray-500 mb-4 text-center">No items found.</p>
        )}
      </ModalBody>
      <ModalFooter>
        <Button className="w-full sm:w-auto" layout="outline" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomerProductModal;
