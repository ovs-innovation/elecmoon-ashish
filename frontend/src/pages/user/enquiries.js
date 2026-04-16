import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { IoBagHandle } from "react-icons/io5";
import dayjs from "dayjs";

//internal import
import Dashboard from "@pages/user/dashboard";
import LeadServices from "@services/LeadServices";
import Loading from "@components/preloader/Loading";
import { UserContext } from "@context/UserContext";

const MyEnquiries = () => {
  const { state: { userInfo } } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = userInfo?._id || userInfo?.id;
    if (userId) {
      LeadServices.getUserLeads(userId)
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    } else {
      setLoading(false);
    }
  }, [userInfo]);

  return (
    <Dashboard
      title="My Enquiries"
      description="This is user enquiries history page"
    >
      <div className="overflow-hidden rounded-md font-serif">
        <div className="flex flex-col">
          <h2 className="text-xl font-serif font-semibold mb-5">
            My Enquiries
          </h2>
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="align-middle inline-block border border-gray-100 rounded-md min-w-full pb-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
                {loading ? (
                  <Loading loading={loading} />
                ) : data?.length === 0 ? (
                  <div className="text-center">
                    <span className="flex justify-center my-30 pt-16 text-blue-500 font-semibold text-6xl">
                      <IoBagHandle />
                    </span>
                    <h2 className="font-medium text-md my-4 text-gray-600">
                      You Have no enquiries Yet!
                    </h2>
                  </div>
                ) : (
                  <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="bg-gray-100">
                        <th className="text-left text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                          Service/Product
                        </th>
                        <th className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                          Status
                        </th>
                         <th className="text-right text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data?.map((enquiry) => (
                        <tr key={enquiry._id}>
                          <td className="px-5 py-3 whitespace-nowrap text-left text-sm">
                            {dayjs(enquiry.createdAt).format("MMMM D, YYYY")}
                          </td>
                          <td className="px-5 py-3 whitespace-nowrap text-center text-sm font-medium">
                            {enquiry.product?.title || enquiry.service || "General Enquiry"}
                          </td>
                          <td className="px-5 py-3 whitespace-nowrap text-center text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              enquiry.status === "completed" ? "bg-green-100 text-green-600" :
                              enquiry.status === "in_progress" ? "bg-blue-100 text-blue-600" :
                              enquiry.status === "contacted" ? "bg-yellow-100 text-yellow-600" :
                              enquiry.status === "cancelled" ? "bg-red-100 text-red-600" :
                              "bg-gray-100 text-gray-600"
                            }`}>
                              {enquiry.status?.replace('_', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td className="px-5 py-3 whitespace-nowrap text-right text-sm">
                            <span className="text-xs text-gray-500">
                                {enquiry.product?.items ? `${enquiry.product.items.length} items` : 'N/A'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default MyEnquiries;
