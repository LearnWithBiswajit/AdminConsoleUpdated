import { FaDownload } from 'react-icons/fa'
import { BrandName, OSType } from '../../config/enum.config'
import { Box, Button, IconButton, Menu, MenuItem, Stack, TextField } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { GridSearchIcon } from '@mui/x-data-grid'
import CustomDataGrid from '../Common/CustomDataGrid'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBitlockerRequest } from '../../redux/actions'

const Bitlocker = () => {

  const [searchInput, setSearchInput] = useState<string>("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(0);
  const dispatch = useDispatch();
  const { bitlockerList } = useSelector((state: any) => state.deviceReducer);

  const bitlockerDGInfo = [
    {
      field: "name",
      headerName: "Full Name",
      flex: 0.5,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "hostName",
      headerName: "Host Name",
      flex: 0.5,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "bitlockerId",
      headerName: "Bitlocker ID",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "recoveryKey",
      headerName: "Recovery Key",
      flex: 1,
      headerAlign: "center",
      align: "center",
    }
  ]

  useEffect(() => {
      dispatch(getBitlockerRequest({ page: page == 0 ? 1 : page+1, limit: limit, searchString:searchInput }));
    }, [page, limit])
  
    useEffect(() => {
      // assignedDeviceData && usersData?.map((item: any) => item.employeeId === "ARC-IND-105" ? item["status"] = "active" : item["status"] = "inactive");
      // usersData?.map((user:any)=>user["id"] = user.userId)
      setData(bitlockerList?.data?.allDevies);
    }, [bitlockerList?.data]);

  const handleSearchInput = (e: any) => {
    setSearchInput(e.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPage(0);
    // dispatch(assignedDeviceInfoRequest({ page: page == 0 ? 1 : page + 1, limit: limit, searchString: searchInput }));
    dispatch(getBitlockerRequest({ page: page == 0 ? 1 : page+1, limit: limit, searchString:searchInput }));
  }

  const getPaginationInfo = (page: number, pageSize: number) => {
    setPage(page);
    setLimit(pageSize);
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
        <CustomDataGrid dgInfo={bitlockerDGInfo} rows={data} showCheckBox={false} totalRowCount={bitlockerList?.data?.totalCount} getPaginationInfo={getPaginationInfo} />
      </Stack>
    </>
  )
}

export default Bitlocker
