import React, { useEffect, useState } from "react";
import ReviewServices from "@/services/ReviewServices";
import { Table, TableBody, TableCell, TableContainer, TableHeader, TableRow, Badge } from "@windmill/react-ui";
import { notifyError, notifySuccess } from "@/utils/toast";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await ReviewServices.getAllReviews();
      setReviews(res);
      setLoading(false);
    } catch (err) {
      notifyError(err ? err.message : err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "show" ? "hide" : "show";
    try {
      await ReviewServices.updateReviewStatus(id, { status: newStatus });
      notifySuccess("Review status updated!");
      fetchReviews();
    } catch (err) {
      notifyError(err ? err.message : err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await ReviewServices.deleteReview(id);
        notifySuccess("Review deleted!");
        fetchReviews();
      } catch (err) {
        notifyError(err ? err.message : err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex items-center justify-between pb-6 mt-4">
        <h2 className="text-xl font-bold text-gray-700">Reviews</h2>
      </div>

      <TableContainer className="mb-8 rounded-b-lg">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Customer Name</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Images</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review._id}>
                <TableCell><span className="text-sm">{review.name}</span></TableCell>
                <TableCell><span className="text-sm">{review.product?.title?.en || "Unknown"}</span></TableCell>
                <TableCell><span className="text-sm">{review.rating} / 5</span></TableCell>
                <TableCell><span className="text-sm">{review.comment}</span></TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {review.images?.map((img, i) => (
                      <img key={i} src={img} alt="review" className="w-10 h-10 object-cover rounded-md border border-gray-100 shadow-sm" />
                    ))}
                    {!review.images?.length && <span className="text-xs text-gray-400 font-sans">No photo</span>}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge type={review.status === "show" ? "success" : "danger"}>
                    {review.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleStatusChange(review._id, review.status)}
                      className="p-2 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700"
                    >
                      {review.status === "show" ? "Hide" : "Show"}
                    </button>
                    <button 
                      onClick={() => handleDelete(review._id)}
                      className="p-2 text-sm font-medium text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Reviews;
