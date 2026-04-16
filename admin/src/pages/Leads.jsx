import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Label,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import exportFromJSON from "export-from-json";
import PageTitle from "@/components/Typography/PageTitle";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import LeadServices from "@/services/LeadServices";
import { notifySuccess, notifyError } from "@/utils/toast";

const getLangValue = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.en) return val.en;
  return JSON.stringify(val);
};

const getSafeImages = (imageData) => {
  if (!imageData) return [];
  if (Array.isArray(imageData)) return imageData;
  if (typeof imageData === "string") return [imageData];
  return [];
};

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchVariant, setSearchVariant] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [loadingExport, setLoadingExport] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const fetchLeads = async (params = {}) => {
    setLoading(true);
    try {
      const res = await LeadServices.getAllLeads({
        name: searchName,
        email: searchEmail,
        phone: searchPhone,
        variant: searchVariant,
        status: searchStatus,
        page: currentPage,
        limit: resultsPerPage,
        startDate,
        endDate,
        ...params,
      });
      setLeads(res.leads || []);
      setTotalResults(res.totalDoc || (res.leads ? res.leads.length : 0));
    } catch (err) {
      setError(err?.response?.data?.message || err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads({
      name: searchName,
      email: searchEmail,
      phone: searchPhone,
      variant: searchVariant,
      status: searchStatus,
      page: currentPage,
      limit: resultsPerPage,
      startDate,
      endDate,
    });
    // eslint-disable-next-line
  }, [
    searchName,
    searchEmail,
    searchPhone,
    searchVariant,
    searchStatus,
    startDate,
    endDate,
    currentPage,
    resultsPerPage,
  ]);

  const handleFilter = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchName("");
    setSearchEmail("");
    setSearchPhone("");
    setSearchVariant("");
    setSearchStatus("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
    fetchLeads({
      name: "",
      email: "",
      phone: "",
      variant: "",
      status: "",
      page: 1,
      startDate: "",
      endDate: "",
    });
  };

  const handleDeleteLead = async () => {
    if (!leadToDelete) return;
    try {
      await LeadServices.deleteLead(leadToDelete._id);
      notifySuccess("Lead deleted successfully");
      setDeleteModalOpen(false);
      setLeadToDelete(null);
      fetchLeads();
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message || "Failed to delete lead");
    }
  };

  const handleStatusChange = async (leadId, newStatus) => {
    setUpdatingStatus(leadId);
    try {
      await LeadServices.updateLead(leadId, { status: newStatus });
      notifySuccess("Lead status updated successfully");
      fetchLeads();
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message || "Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "contacted":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDownloadLeads = async () => {
    try {
      setLoadingExport(true);
      const res = await LeadServices.getAllLeads({
        name: searchName,
        email: searchEmail,
        phone: searchPhone,
        variant: searchVariant,
        startDate,
        endDate,
        page: 1,
        limit: 10000,
      });
      const exportData = (res.leads || []).map((lead) => ({
        name: lead.name,
        type: lead.isEnterprise ? "Enterprise" : "Individual",
        email: lead.email,
        phone: lead.phone,
        address: lead.address || "N/A",
        state: lead.state || "N/A",
        district: lead.district || "N/A",
        pincode: lead.pincode || "N/A",
        message: lead.message,
        product: lead.product?.items?.length > 0
          ? lead.product.items.map(i => `${i.name} (Qty: ${i.quantity})`).join(', ')
          : getLangValue(lead.product?.title),
        category: lead.product?.items?.length > 0
          ? [...new Set(lead.product.items.map(i => i.category))].join(', ')
          : getLangValue(lead.product?.category?.name),
        price: lead.product?.items?.length > 0
            ? lead.product.items.reduce((acc, i) => acc + (i.price * i.quantity), 0)
            : lead.product?.prices?.price,
        quantity: lead.product?.items?.length > 0
            ? lead.product.items.reduce((acc, i) => acc + i.quantity, 0)
            : lead.quantity,
        // Variant information
        variantTitle:
          getLangValue(lead.product?.variant?.title) || "No variant",
        variantSku: lead.product?.variant?.sku || lead.product?.sku || "N/A",
        variantBarcode: lead.product?.variant?.barcode || "N/A",
        variantSlug: lead.product?.variant?.slug || "N/A",
        // Additional context
        hasVariants: lead.product?.hasVariants ? "Yes" : "No",
        totalVariants: lead.product?.totalVariants || "0",
        status: lead.status || "pending",
        enquiryDate: lead.enquiryDate
          ? new Date(lead.enquiryDate).toLocaleString()
          : "N/A",
        currentLanguage: lead.currentLanguage || "N/A",
        date: new Date(lead.createdAt).toLocaleString(),
      }));
      exportFromJSON({
        data: exportData,
        fileName: "leads",
        exportType: exportFromJSON.types.csv,
      });
      setLoadingExport(false);
    } catch (err) {
      setLoadingExport(false);
      alert(err?.response?.data?.message || err?.message);
    }
  };

  return (
    <>
      <PageTitle>Leads</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form onSubmit={handleFilter}>
            {/* First Row */}
            <div className="grid gap-4 lg:gap-4 xl:gap-6 md:gap-2 md:grid-cols-6 py-2">
              <Input
                type="search"
                name="searchName"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Search by Name"
              />
              <Input
                type="search"
                name="searchEmail"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="Search by Email"
              />
              <Input
                type="search"
                name="searchPhone"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                placeholder="Search by Phone"
              />
              <Input
                type="search"
                name="searchVariant"
                value={searchVariant}
                onChange={(e) => setSearchVariant(e.target.value)}
                placeholder="Search by Variant"
              />
              <Button
                type="button"
                className="h-12 bg-green-500 text-white flex items-center w-full"
                onClick={handleDownloadLeads}
                disabled={loadingExport}
              >
                {loadingExport ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    Download All Leads
                    <span className="ml-2 text-base">
                      <IoCloudDownloadOutline />
                    </span>
                  </>
                )}
              </Button>
            </div>
            {/* Second Row */}
            <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 py-2">
              <div>
                <Label>Status</Label>
                <select
                  name="searchStatus"
                  value={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.value)}
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-green-400 focus:outline-none focus:shadow-outline-green dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="date"
                  name="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="mt-2 md:mt-0 flex items-center xl:gap-x-4 gap-x-1 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <div className="w-full mx-1">
                  <Label style={{ visibility: "hidden" }}>Filter</Label>
                  <Button type="submit" className="h-12 w-full bg-green-700">
                    Filter
                  </Button>
                </div>
                <div className="w-full">
                  <Label style={{ visibility: "hidden" }}>Reset</Label>
                  <Button
                    layout="outline"
                    onClick={handleReset}
                    type="reset"
                    className="px-4 md:py-1 py-3 text-sm dark:bg-gray-700"
                  >
                    <span className="text-black dark:text-gray-200">Reset</span>
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
      {loading ? (
        <TableLoading row={8} col={5} width={160} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : leads.length > 0 ? (
        <TableContainer className="mb-8 dark:bg-gray-900">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>Service / Product</TableCell>
                <TableCell>Schedule</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="hover:bg-green-50 dark:hover:bg-gray-700"
                >
                  <TableCell 
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedLead(lead);
                      setModalOpen(true);
                    }}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">{lead.name}</span>
                        {lead.isEnterprise && (
                          <span className="text-[9px] bg-[#0b1d3d] text-white px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">Enterprise</span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-500">{lead.email}</span>
                      <span className="text-[10px] text-gray-500">{lead.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell 
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedLead(lead);
                      setModalOpen(true);
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-red-600">{lead.service || "N/A"}</span>
                      <div className="flex items-center space-x-2 mt-1">
                         {lead.product?.items?.length > 0 ? (
                          <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {lead.product.items.length} Products
                          </span>
                        ) : (
                          <span className="text-[11px] text-gray-600 italic truncate w-32">{getLangValue(lead.product?.title) || "No Product"}</span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell 
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedLead(lead);
                      setModalOpen(true);
                    }}
                  >
                    <span className="text-xs text-gray-700 font-medium bg-gray-100 px-2 py-1 rounded">
                      {lead.serviceDate || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <select
                      value={lead.status || "pending"}
                      onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                      disabled={updatingStatus === lead._id}
                      onClick={(e) => e.stopPropagation()}
                      className={`text-xs font-semibold px-2 py-1 rounded-full border-0 ${getStatusColor(lead.status || "pending")} ${
                        updatingStatus === lead._id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </TableCell>
                  <TableCell 
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedLead(lead);
                      setModalOpen(true);
                    }}
                  >
                    {new Date(lead.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLeadToDelete(lead);
                        setDeleteModalOpen(true);
                      }}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 p-1"
                      title="Delete Lead"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={setCurrentPage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="No leads found." />
      )}
      {/* Lead Details Modal */}
      {modalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-green-600 text-2xl"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Lead Details</h2>

            {/* Product Images Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
                {selectedLead.product?.items?.length > 0 
                  ? "Requested Products" 
                  : selectedLead.product?.variant
                  ? "Variant Images"
                  : "Product Images"}
              </h3>
              <div className="flex flex-wrap gap-4">
                {(() => {
                  if (selectedLead.product?.items?.length > 0) {
                    return selectedLead.product.items.map((item, index) => (
                      <div key={index} className="flex flex-col items-center gap-2 p-2 border border-gray-100 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.target.src = "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png";
                          }}
                        />
                        <div className="text-center">
                          <p className="text-xs font-bold text-gray-800 line-clamp-1 w-24">{item.name}</p>
                          <p className="text-[10px] text-gray-500 font-medium">{item.category || "No Category"}</p>
                          <p className="text-[10px] text-green-600 font-bold">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ));
                  }

                  const variantImages = getSafeImages(selectedLead.product?.variant?.image);
                  const mainImages = getSafeImages(selectedLead.product?.images);

                  if (variantImages.length > 0) {
                    return variantImages.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img}
                          alt={`Variant ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                          onError={(e) => { e.target.src = "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"; }}
                        />
                      </div>
                    ));
                  } else if (mainImages.length > 0) {
                    return mainImages.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img}
                          alt={`Product ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                          onError={(e) => { e.target.src = "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"; }}
                        />
                      </div>
                    ));
                  } else {
                    return (
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-xs text-center">No Image</span>
                      </div>
                    );
                  }
                })()}
              </div>
            </div>

            {/* Lead Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
                  Customer Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Name:
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {selectedLead.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Email:
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {selectedLead.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Phone:
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {selectedLead.phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Type:
                    </span>
                    <span className="text-gray-800 dark:text-gray-200 font-bold">
                      {selectedLead.isEnterprise ? "Enterprise / Company" : "Individual Customer"}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Full Address:
                    </span>
                    <span className="text-gray-800 dark:text-gray-200 text-right max-w-[200px]">
                      {selectedLead.address || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      State:
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {selectedLead.state || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      District:
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {selectedLead.district || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Pincode:
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {selectedLead.pincode || "N/A"}
                    </span>
                  </div>
                   <div className="flex justify-between">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Date:
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {new Date(selectedLead.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Status:
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedLead.status || "pending")}`}>
                      {(selectedLead.status || "pending").charAt(0).toUpperCase() + (selectedLead.status || "pending").slice(1).replace("_", " ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Requested Details */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
                  Service Request Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Selected Service:
                    </span>
                    <span className="text-gray-800 dark:text-gray-200 font-bold">
                      {selectedLead.service || "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Schedule / Date:
                    </span>
                    <span className="text-gray-800 dark:text-gray-200 font-bold">
                      {selectedLead.serviceDate || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Product Information */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
                  Product Overview
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Total Products:
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {selectedLead.product?.items?.length || (selectedLead.product?.title ? 1 : 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Main Category:
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {selectedLead.product?.items?.length > 0
                        ? [...new Set(selectedLead.product.items.map(i => i.category))].join(', ')
                        : (getLangValue(selectedLead.product?.category?.name) || "Not specified")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Variant or Product Information */}
            {selectedLead.product?.variant ? (
              // Show variant information if variant exists
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300 border-b pb-2">
                  Selected Variant Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        Variant Title:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {getLangValue(selectedLead.product.variant.title)}
                      </span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span className="font-medium text-gray-600 dark:text-gray-400">Variant SKU:</span>
                      <span className="text-gray-800 dark:text-gray-200">{selectedLead.product.variant.sku || "Not specified"}</span>
                    </div> */}
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        Variant Barcode:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {selectedLead.product.variant.barcode ||
                          "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        Variant Slug:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {selectedLead.product.variant.slug || "Not specified"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        Variant Description:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200 max-w-xs truncate">
                        {getLangValue(
                          selectedLead.product.variant.description
                        ) || "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        Variant Highlights:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200 max-w-xs truncate">
                        {getLangValue(
                          selectedLead.product.variant.highlights
                        ) || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Show product information if no variant
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300 border-b pb-2">
                  Product Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        Product Title:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {getLangValue(selectedLead.product?.title)}
                      </span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span className="font-medium text-gray-600 dark:text-gray-400">Product SKU:</span>
                      <span className="text-gray-800 dark:text-gray-200">{selectedLead.product?.sku || "Not specified"}</span>
                    </div> */}
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        Product Slug:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {selectedLead.product?.slug || "Not specified"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        Product Description:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200 max-w-xs truncate">
                        {getLangValue(selectedLead.product?.description) ||
                          "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        Product Highlights:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200 max-w-xs truncate">
                        {getLangValue(selectedLead.product?.highlights) ||
                          "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        Stock:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {selectedLead.product?.stock ||
                          selectedLead.product?.stockQuantity ||
                          "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Message */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300 border-b pb-2">
                Customer Message
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {selectedLead.message || "No message provided"}
                </p>
              </div>
            </div>

            {/* Additional Context */}
            {(selectedLead.service || selectedLead.serviceDate || selectedLead.message) && (
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4 text-[#EF4036] border-b pb-2">
                  Service Quote Details
                </h3>
                <div className="bg-red-50 dark:bg-gray-700/50 p-6 rounded-xl border border-red-100 dark:border-red-900/30">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                      <div className="space-y-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Requested Service</span>
                          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{selectedLead.service || "General Test & Tag"}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Requested Schedule</span>
                          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{selectedLead.serviceDate || "Not Specified"}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Location / Site</span>
                          <span className="text-base font-semibold text-gray-800 dark:text-gray-200">{selectedLead.location || "N/A"}</span>
                          <span className="text-sm text-gray-500">{selectedLead.district}, {selectedLead.state} - {selectedLead.pincode}</span>
                        </div>
                      </div>
                   </div>
                   <div className="mt-4 pt-4 border-t border-red-200/50">
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1 block">Customer Message</span>
                      <p className="text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-gray-800 p-4 rounded-lg italic">
                        "{selectedLead.message || "No special instructions provided."}"
                      </p>
                   </div>
                </div>
              </div>
            )}

            {/* Product Section for Both Single and Multi-Product Leads */}
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">
                {selectedLead.product?.items?.length > 0 ? "Items in Quote Request" : "Product Details"}
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {selectedLead.product?.items?.length > 0 ? (
                  // MULTI-PRODUCT (from Cart)
                  selectedLead.product.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <img 
                        src={item.image} 
                        className="w-20 h-20 object-cover rounded-lg shadow-sm border" 
                        onError={(e) => e.target.src = "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"}
                      />
                      <div className="flex-grow">
                        <h4 className="font-bold text-gray-900 dark:text-gray-100">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm font-bold text-red-600">Quantity: {item.quantity}</span>
                          <span className="text-xs text-gray-400">ID: {item.id}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // SINGLE PRODUCT (from Product Detail page)
                  <div className="flex flex-col md:flex-row gap-6 p-4 border rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex gap-2">
                       {getSafeImages(selectedLead.product?.variant?.image).concat(getSafeImages(selectedLead.product?.images)).slice(0,1).map((img, i) => (
                         <img key={i} src={img} className="w-32 h-32 object-cover rounded-xl border shadow-sm" onError={(e) => e.target.src = "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"} />
                       ))}
                       {(!selectedLead.product?.images || selectedLead.product.images.length === 0) && !selectedLead.product?.variant?.image && (
                         <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-xs text-center p-2">No Image Found</div>
                       )}
                    </div>
                    <div className="flex-grow space-y-2">
                       <h4 className="text-xl font-bold text-gray-900">{getLangValue(selectedLead.product?.title) || "Manual Quote"}</h4>
                       <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                         {getLangValue(selectedLead.product?.category?.name) || "General"}
                       </span>
                       <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Variant</p>
                            <p className="text-sm font-semibold">{getLangValue(selectedLead.product?.variant?.title) || "Standard"}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">SKU</p>
                            <p className="text-sm font-semibold">{selectedLead.product?.variant?.sku || selectedLead.product?.sku || "N/A"}</p>
                          </div>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && leadToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl"
              onClick={() => {
                setDeleteModalOpen(false);
                setLeadToDelete(null);
              }}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Delete Lead
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete the lead from{" "}
              <strong>{leadToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                layout="outline"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setLeadToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDeleteLead}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Leads;
