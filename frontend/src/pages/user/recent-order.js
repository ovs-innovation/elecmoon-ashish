import React, { useContext } from "react";
import { IoBagHandle } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import { SidebarContext } from "@context/SidebarContext";

//internal import

import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import OrderHistory from "@components/order/OrderHistory";
import CMSkeletonTwo from "@components/preloader/CMSkeletonTwo";

const RecentOrder = ({ data, loading, error }) => {
  const { handleChangePage, currentPage } = useContext(SidebarContext);

  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  const pageCount = Math.ceil(data?.totalDoc / 10);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <div className="rounded-md font-serif">
          <div className="flex flex-col">
            <h3 className="text-lg font-serif font-medium mb-5">
              {showingTranslateValue(
                storeCustomizationSetting?.dashboard?.recent_order
              )}
            </h3>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="align-middle inline-block border border-gray-100 rounded-md min-w-full pb-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
                  {loading ? (
                    <CMSkeletonTwo
                      count={20}
                      width={100}
                      error={error}
                      loading={loading}
                    />
                  ) : data?.orders?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                        <IoBagHandle className="text-4xl text-[#0b1d3d] opacity-20" />
                      </div>
                      <h2 className="font-bold text-lg text-gray-700">
                        No Orders Yet
                      </h2>
                      <p className="text-gray-400 text-sm mt-1">When you place orders, they will appear here.</p>
                      <Link href="/" className="mt-6 px-6 py-2 bg-[#0b1d3d] text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all">
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                      <thead className="bg-[#f8fafc]">
                        <tr>
                          <th
                            scope="col"
                            className="text-left text-xs font-bold px-6 py-4 text-[#0b1d3d] uppercase tracking-wider"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="text-center text-xs font-bold px-6 py-4 text-[#0b1d3d] uppercase tracking-wider"
                          >
                            Date
                          </th>

                          <th
                            scope="col"
                            className="text-center text-xs font-bold px-6 py-4 text-[#0b1d3d] uppercase tracking-wider"
                          >
                            Method
                          </th>
                          <th
                            scope="col"
                            className="text-center text-xs font-bold px-6 py-4 text-[#0b1d3d] uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="text-center text-xs font-bold px-6 py-4 text-[#0b1d3d] uppercase tracking-wider"
                          >
                            Total
                          </th>
                          <th
                            scope="col"
                            className="text-right text-xs font-bold px-6 py-4 text-[#0b1d3d] uppercase tracking-wider"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data?.orders?.map((order) => (
                          <tr key={order._id}>
                            <OrderHistory order={order} currency="₹" />
                            <td className="px-5 py-4 whitespace-nowrap text-right text-sm">
                              <Link
                                className="px-4 py-1.5 bg-[#0b1d3d]/10 text-xs text-[#0b1d3d] hover:bg-[#0b1d3d] hover:text-white transition-all font-bold rounded-lg border border-[#0b1d3d]/20"
                                href={`/order/${order._id}`}
                              >
                                Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {data?.totalDoc > 10 && (
                    <div className="paginationOrder">
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next"
                        onPageChange={(e) => handleChangePage(e.selected + 1)}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel="Previous"
                        renderOnZeroPageCount={null}
                        pageClassName="page--item"
                        pageLinkClassName="page--link"
                        previousClassName="page-item"
                        previousLinkClassName="page-previous-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-next-link"
                        breakClassName="page--item"
                        breakLinkClassName="page--link"
                        containerClassName="pagination"
                        activeClassName="activePagination"
                        forcePage={currentPage - 1} // Sync UI with currentPage
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentOrder;
