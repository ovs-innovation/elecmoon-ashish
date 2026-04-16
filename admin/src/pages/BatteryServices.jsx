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
import { FiTrash2, FiBattery, FiTool, FiX } from "react-icons/fi";
import api from "@/services/httpService";
import PageTitle from "@/components/Typography/PageTitle";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import { notifySuccess, notifyError } from "@/utils/toast";

const getStatusColor = (status) => {
  switch (status) {
    case "pending": return "bg-yellow-100 text-yellow-800";
    case "contacted": return "bg-blue-100 text-blue-800";
    case "in_progress": return "bg-purple-100 text-purple-800";
    case "completed": return "bg-green-100 text-green-800";
    case "cancelled": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const BatteryServices = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterServiceType, setFilterServiceType] = useState("");
  const [filterBatteryType, setFilterBatteryType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const fetchRequests = async (overrides = {}) => {
    setLoading(true);
    try {
      const res = await api.get(
        `/battery-service?name=${searchName}&phone=${searchPhone}&status=${filterStatus}&serviceType=${filterServiceType}&batteryType=${filterBatteryType}&page=${currentPage}&limit=${resultsPerPage}`
      );
      setRequests(res.requests || []);
      setTotalResults(res.totalDoc || 0);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line
  }, [searchName, searchPhone, filterStatus, filterServiceType, filterBatteryType, currentPage]);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingStatus(id);
    try {
      await api.put(`/battery-service/${id}`, { status: newStatus });
      notifySuccess("Status updated successfully");
      fetchRequests();
    } catch (err) {
      notifyError(err?.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/battery-service/${deleteTarget._id}`);
      notifySuccess("Request deleted successfully");
      setDeleteModalOpen(false);
      setDeleteTarget(null);
      fetchRequests();
    } catch (err) {
      notifyError(err?.response?.data?.message || "Failed to delete");
    }
  };

  const handleReset = () => {
    setSearchName(""); setSearchPhone(""); setFilterStatus("");
    setFilterServiceType(""); setFilterBatteryType(""); setCurrentPage(1);
  };

  const BATTERY_TYPES = ["Lead Acid", "Lithium Ion", "Lithium Polymer", "AGM", "Gel", "Tubular", "VRLA", "Other"];
  const SERVICE_TYPES = [
    "Battery Repair", "Battery Reconditioning", "Battery Testing",
    "Battery Replacement", "Battery Maintenance", "Electrolyte Refilling",
    "Cell Replacement", "Charging Issue", "Leakage Fix", "Other",
  ];

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm text-gray-800 dark:text-gray-200 font-semibold max-w-xs text-right">{value || "N/A"}</span>
    </div>
  );

  return (
    <>
      <PageTitle>
        <span className="flex items-center gap-2">
          <FiBattery className="w-6 h-6 text-red-500" />
          Battery Service Request
        </span>
      </PageTitle>

      {/* Filters */}
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5 py-2">
            <Input
              type="search" placeholder="Search by Name"
              value={searchName} onChange={(e) => setSearchName(e.target.value)}
            />
            <Input
              type="search" placeholder="Search by Phone"
              value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)}
            />
            <div>
              <select
                value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-green-400 focus:outline-none form-input border rounded"
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
              <select
                value={filterServiceType} onChange={(e) => setFilterServiceType(e.target.value)}
                className="block w-full text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-green-400 focus:outline-none form-input border rounded"
              >
                <option value="">All Service Types</option>
                {SERVICE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <select
                value={filterBatteryType} onChange={(e) => setFilterBatteryType(e.target.value)}
                className="block w-full text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-green-400 focus:outline-none form-input border rounded"
              >
                <option value="">All Battery Types</option>
                {BATTERY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <Button layout="outline" onClick={handleReset} size="small">
              <span className="text-black dark:text-gray-200">Reset Filters</span>
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      {loading ? (
        <TableLoading row={8} col={6} width={160} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500 block">{error}</span>
      ) : requests.length > 0 ? (
        <TableContainer className="mb-8 dark:bg-gray-900">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Customer</TableCell>
                <TableCell>Battery Info</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Preferred Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-red-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => { setSelectedRequest(req); setModalOpen(true); }}
                >
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-gray-800 dark:text-gray-100">{req.name}</span>
                      <span className="text-[11px] text-gray-500">{req.email}</span>
                      <span className="text-[11px] text-gray-500">{req.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-red-600">{req.batteryType}</span>
                      {req.batteryBrand && <span className="text-[11px] text-gray-500">{req.batteryBrand} {req.batteryModel}</span>}
                      {req.batteryCapacity && <span className="text-[11px] text-gray-400">{req.batteryCapacity}</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold bg-orange-50 text-orange-700 px-2 py-0.5 rounded">
                      <FiTool className="w-3 h-3" /> {req.serviceType}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-gray-700 font-medium bg-gray-100 px-2 py-1 rounded">
                      {req.preferredDate || "Not specified"}
                    </span>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <select
                      value={req.status || "pending"}
                      onChange={(e) => handleStatusChange(req._id, e.target.value)}
                      disabled={updatingStatus === req._id}
                      className={`text-xs font-semibold px-2 py-1 rounded-full border-0 ${getStatusColor(req.status)} ${updatingStatus === req._id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-gray-600">{new Date(req.createdAt).toLocaleDateString()}</span>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => { setDeleteTarget(req); setDeleteModalOpen(true); }}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
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
              label="Battery service navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="No battery service requests found." />
      )}

      {/* Detail Modal */}
      {modalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700 z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center">
                  <FiBattery className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Battery Service Request</h2>
                  <p className="text-xs text-gray-400">#{selectedRequest._id?.slice(-8).toUpperCase()}</p>
                </div>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-red-600 transition-colors">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status badge */}
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(selectedRequest.status)}`}>
                  {(selectedRequest.status || "pending").replace("_", " ").toUpperCase()}
                </span>
                <span className="text-xs text-gray-400">Submitted: {new Date(selectedRequest.createdAt).toLocaleString()}</span>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                  <FiBattery className="w-4 h-4 text-red-500" /> Customer Information
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-1">
                  <InfoRow label="Name" value={selectedRequest.name} />
                  <InfoRow label="Email" value={selectedRequest.email} />
                  <InfoRow label="Phone" value={selectedRequest.phone} />
                  <InfoRow label="City" value={selectedRequest.city} />
                  <InfoRow label="State" value={selectedRequest.state} />
                  <InfoRow label="Pincode" value={selectedRequest.pincode} />
                </div>
              </div>

              {/* Battery Info */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                  <FiBattery className="w-4 h-4 text-orange-500" /> Battery Details
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-1">
                  <InfoRow label="Battery Type" value={selectedRequest.batteryType} />
                  <InfoRow label="Brand" value={selectedRequest.batteryBrand} />
                  <InfoRow label="Model" value={selectedRequest.batteryModel} />
                  <InfoRow label="Capacity" value={selectedRequest.batteryCapacity} />
                </div>
              </div>

              {/* Service Info */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                  <FiTool className="w-4 h-4 text-blue-500" /> Service Details
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-1">
                  <InfoRow label="Service Type" value={selectedRequest.serviceType} />
                  <InfoRow label="Preferred Date" value={selectedRequest.preferredDate} />
                  <div className="py-1.5">
                    <p className="text-sm font-medium text-gray-500 mb-1">Problem Description</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                      {selectedRequest.problemDescription || "N/A"}
                    </p>
                  </div>
                  {selectedRequest.additionalNotes && (
                    <div className="py-1.5">
                      <p className="text-sm font-medium text-gray-500 mb-1">Additional Notes</p>
                      <p className="text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                        {selectedRequest.additionalNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Update Status */}
              <div>
                <Label>Update Status</Label>
                <select
                  value={selectedRequest.status || "pending"}
                  onChange={(e) => { handleStatusChange(selectedRequest._id, e.target.value); setSelectedRequest({ ...selectedRequest, status: e.target.value }); }}
                  disabled={updatingStatus === selectedRequest._id}
                  className="block w-full mt-1 text-sm border rounded px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteModalOpen && deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete Request?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete the battery service request from <strong>{deleteTarget.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleDelete}>Yes, Delete</Button>
              <Button layout="outline" className="w-full" onClick={() => { setDeleteModalOpen(false); setDeleteTarget(null); }}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BatteryServices;
