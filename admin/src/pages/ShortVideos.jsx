import {
  Button,
  Card,
  CardBody,
  Input,
  Table,
  TableContainer,
  TableHeader,
  TableCell,
} from "@windmill/react-ui";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";

// internal import
import useAsync from "@/hooks/useAsync";
import { SidebarContext } from "@/context/SidebarContext";
import ShortVideoServices from "@/services/ShortVideoServices";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import PageTitle from "@/components/Typography/PageTitle";
import MainDrawer from "@/components/drawer/MainDrawer";
import ShortVideoDrawer from "@/components/drawer/ShortVideoDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import ShortVideoTable from "@/components/short-video/ShortVideoTable";
import NotFound from "@/components/table/NotFound";
import AnimatedContent from "@/components/common/AnimatedContent";
import DeleteModal from "@/components/modal/DeleteModal";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const ShortVideos = () => {
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const { data, loading, error } = useAsync(ShortVideoServices.getAllShortVideos);
  const { serviceId, handleUpdate, handleModalOpen, allId } = useToggleDrawer();
  const { t } = useTranslation();
  const { showingTranslateValue } = useUtilsFunction();
  const [searchText, setSearchText] = useState("");

  // Filter data based on search text safely
  const filteredData = data?.filter((item) =>
    showingTranslateValue(item.title)?.toLowerCase().includes(searchText.toLowerCase())
  ) || [];

  return (
    <>
      <PageTitle>Short Videos (Home Page)</PageTitle>

      <DeleteModal id={serviceId} ids={allId} title="Short Video" service={ShortVideoServices} />

      <MainDrawer>
        <ShortVideoDrawer id={serviceId} />
      </MainDrawer>

      <AnimatedContent>
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <div className="flex justify-between items-center">
              <div className="flex-grow max-w-md">
                <Input
                  type="search"
                  placeholder="Search by title"
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <Button onClick={toggleDrawer} className="rounded-md h-12 w-48">
                <span className="mr-2">
                  <FiPlus />
                </span>
                Add Video
              </Button>
            </div>
          </CardBody>
        </Card>
      </AnimatedContent>

      {loading ? (
        <TableLoading row={12} col={6} width={190} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : filteredData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Order</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Video URL</TableCell>
                <TableCell>Linked Product</TableCell>
                <TableCell className="text-center">Status</TableCell>
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <ShortVideoTable 
              shortVideos={filteredData} 
              lang={lang} 
              handleUpdate={handleUpdate} 
              handleModalOpen={handleModalOpen} 
            />
          </Table>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no short videos right now." />
      )}
    </>
  );
};

export default ShortVideos;
