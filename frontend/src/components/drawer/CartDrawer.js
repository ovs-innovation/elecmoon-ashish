import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FiX, FiShoppingBag, FiPlus, FiMinus, FiTrash2, FiCheck } from "react-icons/fi";
import { useCart } from "react-use-cart";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";

const CartDrawer = () => {
  const router = useRouter();
  const { cartDrawerOpen, closeCartDrawer } = useContext(SidebarContext);
  const { items, removeItem, updateItemQuantity, cartTotal, totalItems } = useCart();
  const { currency, getNumber } = useUtilsFunction();
  const [selectedItems, setSelectedItems] = useState([]);

  // Initialize selected items with all items in cart when cart changes
  useEffect(() => {
    setSelectedItems(items.map(item => item.id));
  }, [items.length]);

  const toggleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleGoToList = () => {
    closeCartDrawer();
    const selectedIds = selectedItems.join(',');
    router.push(`/request-a-quote?selected=${selectedIds}`);
  };

  const handleProceedToQuote = () => {
    closeCartDrawer();
    router.push(`/checkout`);
  };

  const selectedTotal = items
    .filter(item => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.itemTotal, 0);

  return (
    <>
      {/* Overlay */}
      {cartDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[999] backdrop-blur-sm transition-opacity"
          onClick={closeCartDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-[1000] shadow-2xl transition-transform duration-300 ease-in-out transform ${cartDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[#0b1d3d] text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <FiShoppingBag className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-bold text-lg">Shopping Quote ({items.length})</h2>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-2 hover:bg-white/10 rounded-lg transition-all no-green-button"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                  <FiShoppingBag className="w-10 h-10 text-gray-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                  <p className="text-gray-500 text-sm mt-1">Looks like you haven't added anything yet.</p>
                </div>
                <button
                  onClick={closeCartDrawer}
                  className="bg-[#0b1d3d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#162542] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 group items-start">
                  {/* Selection Checkbox */}
                  <div className="pt-2">
                    <button
                      onClick={() => toggleSelectItem(item.id)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all no-green-button ${selectedItems.includes(item.id)
                          ? "bg-[#0b1d3d] border-[#0b1d3d] text-white shadow-sm"
                          : "border-gray-200 bg-white"
                        }`}
                    >
                      {selectedItems.includes(item.id) && <FiCheck className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="w-20 h-20 relative rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <FiShoppingBag className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:bg-white hover:shadow-md rounded-xl transition-all duration-300 no-green-button p-2 flex items-center justify-center border border-transparent hover:border-gray-50"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-[#0b1d3d] font-bold text-sm mt-1">
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mr-1">Base Price:</span>
                      {currency}{getNumber(item.price)}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <div className={`flex items-center border border-gray-100 rounded-lg bg-gray-50/50 p-1 transition-opacity ${!selectedItems.includes(item.id) ? "opacity-50 grayscale-[0.5]" : "opacity-100"}`}>
                        <button
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-md hover:bg-white hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed no-green-button"
                          disabled={item.quantity <= 1 || !selectedItems.includes(item.id)}
                        >
                          <FiMinus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="text-xs font-bold text-gray-900 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-md hover:bg-white hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed no-green-button"
                          disabled={!selectedItems.includes(item.id)}
                        >
                          <FiPlus className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                      <div className="flex flex-col items-end ml-auto">
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Total</span>
                        <span className="text-sm font-bold text-[#0b1d3d]">
                          {currency}{getNumber(item.itemTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="text-xl font-bold text-[#0b1d3d]">{currency}{getNumber(selectedTotal)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={closeCartDrawer}
                  className="w-full bg-white border border-gray-200 text-gray-900 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all no-green-button active:scale-95"
                >
                  Continue
                </button>
                <button
                  onClick={handleGoToList}
                  disabled={selectedItems.length === 0}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 text-center no-green-button ${selectedItems.length === 0
                      ? "bg-gray-200 cursor-not-allowed text-gray-400"
                      : "bg-[#0b1d3d]/10 text-[#0b1d3d] hover:bg-white hover:text-[#0b1d3d] border border-[#0b1d3d]/20"
                    }`}
                >
                  Go to List
                </button>
              </div>
              <button
                onClick={handleProceedToQuote}
                disabled={selectedItems.length === 0}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-xl active:scale-95 no-green-button ${selectedItems.length === 0
                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                    : "bg-[#0b1d3d] hover:bg-[#162542] text-white"
                  }`}
              >
                Proceed to Quote Request
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
