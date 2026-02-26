import { useEffect, useRef, useState } from "react"
import CustomDataGrid from "../Common/CustomDataGrid"
import { useDispatch, useSelector } from "react-redux"
import { clearState, createAdminRequest, deleteUserRequest, getSingleUserRequest, getUserRequest, revokeAdminRequest } from "../../redux/users/user.actions";
import { Box, Button, IconButton, Stack, TextField, Tooltip } from "@mui/material";
import AddDevice from "./AddDevice";
import { DeviceStatus, DeviceType, ModalState, UserRole } from "../../config/enum.config";
import { activeDeviceRequest } from "../../redux/actions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
// import { renderActionsCell, renderEditSingleSelectCell } from "@mui/x-data-grid";
import { TbDeviceDesktopPlus } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { GridSearchIcon } from "@mui/x-data-grid";
import { MdAdminPanelSettings } from "react-icons/md";


const Users = () => {

  const dispatch = useDispatch();
  const { usersData } = useSelector((state: any) => state.userReducer);
  const userCreatedData = useSelector((state: any) => state.userReducer.data);
  const { updatedUserInfo } = useSelector((state: any) => state.userReducer);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [modalState, setModalState] = useState<ModalState>();
  const [limit, setLimit] = useState(0);
  const [page, setPage] = useState(0);
  const myRef = useRef<any>("");
  const [searchInput, setSearchInput] = useState<string>("");

  const { assignedDevicesCount } = useSelector((state: any) => state.deviceReducer);
  const {dataAdmin} = useSelector((state:any)=>state.userReducer);
  const {loggedInUserInfo} = useSelector((state:any)=>state.userReducer);


  useEffect(() => {
    dispatch(getUserRequest({ userType: 2, searchString:searchInput, page: page === 0 ? 1 :page+1, limit: limit }));
    if(dataAdmin?.data){
      toast.success(dataAdmin.message);
      dispatch(clearState());
    }
  }, [page, limit, searchInput, userCreatedData.userId, updatedUserInfo, dataAdmin?.data]);


  useEffect(() => {
    // usersData && usersData?.map((item: any) => item.employeeId === "ARC-IND-105" ? item["status"] = "active" : item["status"] = "inactive");
    // usersData?.map((user: any) => user["id"] = user.userId)
    setData(usersData?.employees);
  }, [usersData?.employees]);
  
  const getPaginationInfo = (page: number, pageSize: number) => {
    setPage(page);
    setLimit(pageSize);
  }

  // useEffect(()=>{
  //   toast.success(`Assigned Successfully`);
  //   dispatch(clearState());
  //   console.log(assignedDevicesCount)
  // }, [assignedDevicesCount])

  // const handleChange = (event: SelectChangeEvent, row:any) => {
  //   console.log(event.target.value, row)
  //   setStatus(event.target.value);
  //   row.status = event.target.value;
  // };

  // console.log(data);

  const handleDelete = (row: any) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserRequest(row.userId));
        setData(usersData?.employees.filter((item: any) => item.userId !== row.userId));
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted successfully, and all devices assigned to the user are now in stock.",
          icon: "success"
        });
      }
    });
  }

  const handleEdit = (row: any) => {
    dispatch(clearState());
    dispatch(getSingleUserRequest(row.email));
    setModalState(ModalState.UpdateUser);
    handleOpen()
  }

  const handleOpen = () => {
    // dispatch(activeDeviceRequest({ deviceStatus: DeviceStatus.Dead, page: page, limit: limit }))
    setOpen(!open);
  }

  const handleAssignUserInfo = (row: any) => {
    setModalState(ModalState.AssignDevice);
    // setOpen(!open)
    setUserId(row.userId)
    handleOpen();
  }

  const handleAssignAdmin = (row:any) =>{
    dispatch(clearState());
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(createAdminRequest({userId:row.userId}));
        // setData(usersData?.employees.filter((item: any) => item.userId !== row.userId));
        // Swal.fire({
        //   title: "Success",
        //   text: "User has been marked as Admin successfully",
        //   icon: "success"
        // });
      }
    });
  }

  const handleRevokeAdmin = (row:any) =>{
    dispatch(clearState());
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(revokeAdminRequest({userId:row.userId}));
        // setData(usersData?.employees.filter((item: any) => item.userId !== row.userId));
        // Swal.fire({
        //   title: "Success",
        //   text: "User has been removed from Admin successfully",
        //   icon: "success"
        // });
      }
    });
  }

  const handleRole = (row:any) =>{
    row.role === UserRole.Employee ? handleAssignAdmin(row) : handleRevokeAdmin(row);
  }

  const userDGInfo = [
    {
      field: "employeeId",
      headerName: "Employee ID",
      // width: 150,
      flex: 1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "middleName",
      headerName: "Middle Name",
      flex: 1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "email",
      headerName: "Email ID",
      flex: 1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => <Stack direction={"row"} justifyContent={"center"} height={"100%"} alignItems={"center"} gap={"0.5rem"}>
        <Tooltip title={"Assign Devices"}><IconButton color="primary" sx={{ fontSize: "1.3rem", padding: "0.5rem" }} onClick={() => handleAssignUserInfo(params.row)}><TbDeviceDesktopPlus /></IconButton></Tooltip>
        <IconButton color="primary" sx={{ fontSize: "1.3rem", padding: "0.5rem" }} onClick={() => handleEdit(params.row)}><FaUserEdit /></IconButton>
        <IconButton color="error" sx={{ fontSize: "1.3rem", padding: "0.5rem" }} onClick={() => handleDelete(params.row)}><MdDelete /></IconButton>
        {params?.row?.role === UserRole.Admin ? <IconButton color="success" sx={{ fontSize: "1.3rem", padding: "0.5rem" }} onClick={()=>handleRole(params.row)}><MdAdminPanelSettings /></IconButton> : loggedInUserInfo?.data?.role === UserRole.SuperAdmin ? <IconButton color="secondary" sx={{ fontSize: "1.3rem", padding: "0.5rem" }} onClick={() => handleRole(params.row)}><MdAdminPanelSettings /></IconButton>:""}
      </Stack>
    }
  ]

  const handleAddUser = () => {
    dispatch(clearState())
    setModalState(ModalState.AddUser);
    handleOpen();
  }

    const handleSubmit = (e: any) => {
      e.preventDefault();
      setSearchInput(myRef.current.value)
      setPage(0);
    }

  // useEffect(() => {
  //   console.log(open)
  // }, [open])

  return (
    <>
      <Stack gap={"2rem"} alignItems={"center"} height={"80vh"}>
        <Stack justifyContent={"center"} alignItems={"center"} width={"100%"}>
          <Box component={"form"} style={{ display: "flex", alignItems: "center" }} onSubmit={handleSubmit}>
            <TextField
              id="search-bar"
              className="text"
              // value={searchInput}
              inputRef={myRef}
              label="Search title"
              variant="outlined"
              placeholder="Search..."
              // onChange={handleSearchInput}
              size="small"
              name="search"
              sx={{
                width: 350,
              }}
            />
            <IconButton type="submit" aria-label="search" onClick={handleSubmit}>
              <GridSearchIcon style={{ fill: "blue" }} />
            </IconButton>
          </Box>
        </Stack>
        <CustomDataGrid dgInfo={userDGInfo} rows={data} showCheckBox={false} totalRowCount={usersData?.totalCount} getPaginationInfo={getPaginationInfo} searchString={searchInput ? searchInput : ""} />
        {open ? <AddDevice handleOpen={handleOpen} open={open} modalState={modalState} userId={userId} /> : ""}
        <Button variant='contained' size='large' sx={{ width: "20rem" }} onClick={() => { handleAddUser() }}>Add User</Button>
      </Stack>
    </>
  )
}

export default Users
