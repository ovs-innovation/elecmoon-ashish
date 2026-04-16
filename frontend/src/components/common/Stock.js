import useTranslation from "next-translate/useTranslation";

const Stock = ({ stock, card }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Stock functionality removed */}
      <span className="bg-gray-100 absolute z-10 text-gray-500 rounded-full inline-flex items-center justify-center px-2 py-0 text-xs font-medium font-serif">
        Stock: N/A
      </span>
    </>
  );
};

export default Stock;
