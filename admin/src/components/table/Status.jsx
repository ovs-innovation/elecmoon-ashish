import { Badge } from "@windmill/react-ui";

const Status = ({ status }) => {
  return (
    <>
      <span className="font-serif">
        {(status === "Pending" || status === "Inactive") && (
          <Badge type="warning">🟡 {status}</Badge>
        )}
        {status === "Waiting for Password Reset" && (
          <Badge type="warning">{status}</Badge>
        )}
        {status === "Processing" && (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            🔵 {status}
          </Badge>
        )}
        {(status === "Delivered" || status === "Active") && (
          <Badge type="success">🟢 {status}</Badge>
        )}
        {status === "Shipped" && (
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
            🚚 {status}
          </Badge>
        )}
        {status === "In Transit" && (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
            🚛 {status}
          </Badge>
        )}
        {(status === "Cancel" || status === "Cancelled") && (
          <Badge type="danger">🔴 {status}</Badge>
        )}
        {status === `POS-Completed` && (
          <Badge className="dark:bg-teal-900 bg-teal-100">{status}</Badge>
        )}
      </span>
    </>
  );
};

export default Status;
