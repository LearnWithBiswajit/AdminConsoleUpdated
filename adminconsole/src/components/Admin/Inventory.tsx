import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignedDeviceInfoRequest, downlaodRequest, releaseDeviceRequest } from "../../redux/actions";
import { BrandName, DeviceStatus, OSType } from "../../config/enum.config";
import { Box, Button, IconButton, Menu, MenuItem, Stack, TextField } from "@mui/material";
import CustomDataGrid from "../Common/CustomDataGrid";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { GridSearchIcon } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";

const Inventory = () => {
  const dispatch = useDispatch();
  // const [status, setStatus] = useState("active")
  const { assignedDevices } = useSelector((state: any) => state.deviceReducer);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(0);
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState<string>("");
  // const [open, setOpen] = useState(true);
  // const [userId, setUserId] = useState<string>("");


  useEffect(() => {
    dispatch(assignedDeviceInfoRequest({ page: page == 0 ? 1 : page+1, limit: limit, searchString:searchInput }))
  }, [page, limit])

  useEffect(() => {
    // assignedDeviceData && usersData?.map((item: any) => item.employeeId === "ARC-IND-105" ? item["status"] = "active" : item["status"] = "inactive");
    // usersData?.map((user:any)=>user["id"] = user.userId)
    setData(assignedDevices?.allDevies);
  }, [assignedDevices?.allDevies]);

  const getPaginationInfo = (page: number, pageSize: number) => {
    setPage(page);
    setLimit(pageSize);
  }

  const handleDownload = (row:any)=>{
    dispatch(downlaodRequest(row.row.id));
  }

  const handleDelete = (row:any) => {
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
            dispatch(releaseDeviceRequest({assetId:row.id, deviceStatus:DeviceStatus.Dead}));
            setData(data.filter((item: any) => item.assetId !== row.id));
            Swal.fire({
              title: "Deleted!",
              text: "Device has been released successfully.",
              icon: "success"
            });
          }
        });
  }
  // const handleChange = (event: SelectChangeEvent, row:any) => {
  //   console.log(event.target.value, row)
  //   setStatus(event.target.value);
  //   row.status = event.target.value;
  // };

  // console.log(data);
  // const handleOpen = () =>{
  //   dispatch(activeDeviceRequest({deviceStatus:DeviceStatus.Dead, deviceType:DeviceType.Others, page:1, limit:10}))
  //   setOpen(!open);
  // }

  const deviceDGInfo = [
    {
      field: "name",
      headerName: "Full Name",
      flex:1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "email",
      headerName: "Email",
      flex:1.5,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "macAddress",
      headerName: "MAC Address",
      flex:1.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <>
            <Button variant="outlined" {...bindTrigger(popupState)}>
              {params.formattedValue[0]}
            </Button>
            <Menu {...bindMenu(popupState)}>
              {params.formattedValue.map((item: any) => (
                <MenuItem onClick={popupState.close}>{item}</MenuItem>
              ))}
            </Menu>
          </>
        )}
      </PopupState>
    },
    {
      field: "hostName",
      headerName: "Host Name",
      flex:1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "osType",
      headerName: "OS",
      flex:0.7,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => OSType[params?.row?.osType]
    },
    {
      field: "osVersion",
      headerName: "OS Version",
      flex:1,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => `${params.row.osName} (${params.row.osVersion})`
    },
    {
      field: "serialNumber",
      headerName: "Serial Number",
      flex:1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "brand",
      headerName: "Brand",
      flex:0.7,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => BrandName[params?.row?.brand]
    },
    {
      field: "action",
      headerName: "Action",
      flex:1,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => <Stack direction={"row"}>
        <IconButton color="error" sx={{fontSize:"1.8rem", padding:"0.8rem"}} onClick={()=>handleDelete(params)}><MdDelete /></IconButton>
        <IconButton color="primary" sx={{fontSize:"1.5rem", padding:"0.8rem"}} onClick={()=>handleDownload(params)}><FaDownload /></IconButton>
        </Stack>
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   flex:1,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params: any) => <IconButton color="primary" sx={{fontSize:"1.8rem", padding:"0.8rem"}} onClick={()=>handleDelete(params)}><FaDownload /></IconButton>
    // },
  ]

  const handleSearchInput = (e: any) => {
    setSearchInput(e.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPage(0);
    dispatch(assignedDeviceInfoRequest({ page: page == 0 ? 1 : page+1, limit: limit, searchString:searchInput }));
  }



  return (
    <>
      <Stack direction={"column"} alignItems={"center"} gap={"2rem"}>
        <Box component={"form"} style={{ display: "flex", alignItems: "center" }} onSubmit={handleSubmit}>
          <TextField
            id="search-bar"
            className="text"
            label="Search title"
            variant="outlined"
            placeholder="Search..."
            onChange={handleSearchInput}
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
        <CustomDataGrid dgInfo={deviceDGInfo} rows={data} showCheckBox={false} totalRowCount={assignedDevices?.totalCount} getPaginationInfo={getPaginationInfo} />
      </Stack>
    </>
  )
}

export default Inventory
