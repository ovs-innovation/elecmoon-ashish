import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableContainer,
  TableFooter,
  TableHeader,
  TableCell,
} from "@windmill/react-ui";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";

// internal import
import useAsync from "@/hooks/useAsync";
import { SidebarContext } from "@/context/SidebarContext";
import ServiceServices from "@/services/ServiceServices";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import PageTitle from "@/components/Typography/PageTitle";
import MainDrawer from "@/components/drawer/MainDrawer";
import ServiceDrawer from "@/components/drawer/ServiceDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import ServiceTable from "@/components/service/ServiceTable";
import NotFound from "@/components/table/NotFound";
import AnimatedContent from "@/components/common/AnimatedContent";
import DeleteModal from "@/components/modal/DeleteModal";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const Services = () => {
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const { data, loading, error } = useAsync(ServiceServices.getAllServices);
  const { serviceId, handleUpdate, handleModalOpen, allId } = useToggleDrawer();
  const { t } = useTranslation();
  const { showingTranslateValue } = useUtilsFunction();
  const [searchText, setSearchText] = useState("");

  // Filter data based on search text safely
  const filteredData = data?.filter((item) =>
    showingTranslateValue(item.name)?.toLowerCase().includes(searchText.toLowerCase())
  ) || [];

  return (
    <>
      <PageTitle>Services</PageTitle>

      <DeleteModal id={serviceId} ids={allId} title="Service" />

      <MainDrawer>
        <ServiceDrawer id={serviceId} />
      </MainDrawer>

      <AnimatedContent>
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <div className="flex justify-end">
              <Button onClick={toggleDrawer} className="rounded-md h-12 w-48">
                <span className="mr-2">
                  <FiPlus />
                </span>
                Add Service
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg mb-4">
          <CardBody>
            <div className="flex-grow-0">
              <Input
                type="search"
                placeholder="Search Service"
                onChange={(e) => setSearchText(e.target.value)}
              />
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
                <TableCell>Icon</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Group</TableCell>
                <TableCell className="text-center">Published</TableCell>
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <ServiceTable 
              services={filteredData} 
              lang={lang} 
              handleUpdate={handleUpdate} 
              handleModalOpen={handleModalOpen} 
            />
          </Table>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no services right now." />
      )}
    </>
  );
};

export default Services;
