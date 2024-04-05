import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { MdOutlineModeEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import SweetAlert2 from "react-sweetalert2";
import { useState } from "react";
import { useDeleteMutation } from "../../../store/service/endpoints/contact.endpoint";
import { SheetTrigger } from "../../../components/ui/sheet";

const DataTableTool = ({ apiData, handleEdit }) => {
  const [swalProps, setSwalProps] = useState({});
  const [deleteFun, { isError, isLoading, data }] = useDeleteMutation();

  const handleDelete = (id) => {
    setSwalProps({
      show: true,
      title: "Are you sure?",
      text: "Would you like to delete this row?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "red",
      onConfirm: async () => {
        await deleteFun(id);
        //Show ko true py htr lo,delete button ko 1kr pl nate lo ya,
        setSwalProps({
          show: false,
        });
      },
      // for cancel button
      onResolve: () => {
        setSwalProps({
          show: false,
        });
      },
    });
  };

  return (
    <div>
      <Table className="mt-5 ">
        <TableHeader>
          <TableRow className="bg-basic hover:bg-basic">
            <TableHead className="rounded-l-xl">No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="rounded-r-xl">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {apiData.map((i) => (
            <TableRow key={i.id} className="bg-[#FCFCFD]">
              <TableCell>{i.id}</TableCell>
              <TableCell>{i.name}</TableCell>
              <TableCell className="text-gray-400">{i.email}</TableCell>
              <TableCell className="text-gray-400">{i.phone}</TableCell>
              <TableCell className="text-gray-400 w-[300px] text-wrap ">
                {i.address}
              </TableCell>
              <TableCell className="text-xl space-x-5">
                <SheetTrigger>
                  <button onClick={handleEdit.bind(null, i.id)}>
                    <MdOutlineModeEdit />
                  </button>
                </SheetTrigger>
                <button onClick={handleDelete.bind(null, i.id)}>
                  <LuTrash2 className="text-danger" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SweetAlert2 {...swalProps} />
    </div>
  );
};

export default DataTableTool;
