import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import { GridRowSelectionModel, GridSearchIcon } from '@mui/x-data-grid'
import { SetStateAction, useEffect, useRef, useState } from 'react'
import CustomDataGrid from '../Common/CustomDataGrid'
import { useDispatch, useSelector } from 'react-redux'
import { BrandName, DeviceStatus, DeviceType, ModalState, OSType } from '../../config/enum.config'
import { AssignDeviceType } from '../../types/device.types'
import { activeDeviceRequest, assignDeviceRequest, clearState, deleteDeviceRequest } from '../../redux/actions'
import { toast } from 'react-toastify';
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from 'sweetalert2'
import AddDevice from './AddDevice'
import CustomIcon from '../Common/CustomIcon'
import { FaKey } from 'react-icons/fa'



const AssignDevice = ({ userId, handleClose, deviceStatus, deviceType, osType, setCurrentModalState, setUpdateDeviceInfo }: any) => {

  const { deviceData } = useSelector((state: any) => state.deviceReducer);
  const { assignedDevicesCount } = useSelector((state: any) => state.deviceReducer);
  const myRef = useRef<any>("");

  const dispatch = useDispatch();
  const [assignDeviceForm, setAssignDeviceForm] = useState<AssignDeviceType>({
    userId: "",
    deviceIds: []
  });
  const [searchInput, setSearchInput] = useState<string>("");
  const [limit, setLimit] = useState(0);
  const [page, setPage] = useState(0);
  const { deleteDeviceData } = useSelector((state: any) => state.deviceReducer);
  const [modalState, setModalState] = useState<ModalState>();
  const [open, setOpen] = useState(false);
  const [deviceList, setDeviceList] = useState<any[]>([]);
  

  const deviceDGInfo = [
    {
      field: "serialNumber",
      headerName: "Srial Number",
      flex: 1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "osType",
      headerName: "OS",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => OSType[params?.row?.osType]
    },
    {
      field: "osVersion",
      headerName: "OS Version",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => `${params?.row?.osName} (${params?.row?.osVersion})`
    },
    {
      field: "brand",
      headerName: "Brand Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => BrandName[params?.row?.brand]
    },
    {
      field: "hostName",
      headerName: "Host Name",
      flex: 1,
      headerAlign: "center",
      align: "center"
    },

  ]

  if (osType) {
    deviceDGInfo.push(
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params: any): any => <Stack direction={"row"}>
          <IconButton color="primary" sx={{ fontSize: "1.3rem", padding: "0.7rem" }} onClick={() => handleEdit(params.row)}><MdEdit /></IconButton>
          <IconButton color="error" sx={{ fontSize: "1.3rem", padding: "0.7rem" }} onClick={() => handleDelete(params.row)}><MdDelete /></IconButton>
          <IconButton color="primary" sx={{ fontSize: "1.3rem", padding: "0.8rem" }} onClick={() => addBitlocker(params.row)}><FaKey /></IconButton>
        </Stack>
      }
    )
  }

  useEffect(() => {
    setAssignDeviceForm({ ...assignDeviceForm, "userId": userId });
  }, []);

  useEffect(() => {
    if (assignedDevicesCount > 0) {
      toast.success(`${assignedDevicesCount} Devices Assigned Successfully`);
      dispatch(clearState());
      handleClose();
    }
    if (deleteDeviceData?.statusCode) {
      toast.success(deleteDeviceData?.message);
      dispatch(clearState());
    }
  }, [assignedDevicesCount, deleteDeviceData?.statusCode])

  useEffect(() => {
    // if(page==0){
    // debugger;
    // console.log(page)
    dispatch(activeDeviceRequest({ deviceStatus: deviceStatus, deviceType: deviceType, osType: osType, page: page == 0 ? 1 : page + 1, limit: limit, searchString: searchInput }));
    setDeviceList(deviceData && deviceData.response !== undefined ? deviceData.response : []);
    console.log(deviceList)
    // }
  }, [page, limit, searchInput, deviceList.length, deviceData?.response.length]);

  const getSelectedRows = (rows: GridRowSelectionModel) => {
    setAssignDeviceForm({ ...assignDeviceForm, ["deviceIds"]: Array.from(rows.ids) });
  }

  const handleAssignDevice = () => {
    // console.log(assignDeviceForm);
    dispatch(assignDeviceRequest(assignDeviceForm));
  }

  const getPaginationInfo = (page: number, pageSize: number) => {
    setPage(page);
    setLimit(pageSize);
  }

  const handleSearchInput = (e: any) => {
    setSearchInput(e.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchInput(myRef.current.value)
    setPage(0);
    // getPaginationInfo(page + 1, limit)
    // dispatch(activeDeviceRequest({ deviceStatus: DeviceStatus.Dead, page: 1, limit: limit, searchString: searchInput }));
  }
  const handleOpen = () => {
    // dispatch(activeDeviceRequest({ deviceStatus: DeviceStatus.Dead, page: page, limit: limit }))
    setOpen(!open);
  }

  const handleDelete = (row: any) => {
    handleClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDeviceRequest(row.id));
        // setData(usersData?.employees.filter((item: any) => item.userId !== row.userId));
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "User has been deleted successfully, and all devices assigned to the user are now in stock.",
        //   icon: "success"
        // });
      }
    });
  }

  const handleEdit = (row: any) => {
    dispatch(clearState());
    // console.log(row);
    setUpdateDeviceInfo(row);
    // dispatch(getSingleUserRequest(row.email));
    // setModalState(ModalState.UpdateDevice);
    setCurrentModalState(ModalState.UpdateDevice)
    // handleClose()
    // setOpen(true)
  }

  const addBitlocker = (row:any) =>{
    dispatch(clearState());
    setUpdateDeviceInfo(row);
    setCurrentModalState(ModalState.AddBitlocker)
  }

  // useEffect(()=>{
  //   console.log(modalState)
  //   if(modalState === ModalState.UpdateDevice){
  //   setOpen(true);
  //   handleClose()
  // }
  // }, [modalState])



  return (
    <>
      <Stack width={"100%"} direction={"column"} gap={5} justifyContent={"center"} alignItems={"center"} maxHeight={"75vh"}>
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
        <CustomDataGrid dgInfo={deviceDGInfo} rows={deviceList} showCheckBox={osType ? false : true} getSelectedRows={getSelectedRows} totalRowCount={deviceData?.totalCount} getPaginationInfo={getPaginationInfo} searchString={searchInput ? searchInput : ""} />
        <Button variant='contained' sx={{ width: "50%", display: `${osType ? "none" : ""}` }} onClick={handleAssignDevice}>Assign</Button>
        {/* {open ? <AddDevice handleOpen={handleOpen} open={open} modalState={modalState} deviceInfo={deviceInfo} /> : ""} */}
      </Stack>

      {/* <FilterProducts searchstring={input} list={list} /> */}
      {/* </Box> */}
    </>
  )
}

export default AssignDevice