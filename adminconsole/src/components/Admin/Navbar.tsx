// import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { activeDeviceCountRequest, clearState, setDeviceInfoAction } from '../../redux/actions';
import { DeviceStatus, DeviceType } from '../../config/enum.config';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Navbar(props:any) {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
    const [deviceInfo, setDeviceInfo] = useState({
      deviceStatus:DeviceStatus.Active,
      deviceType:DeviceType.Others
    });
    const deviceData = useSelector((state:any)=>state.deviceReducer);
    const {deleteDeviceData} = useSelector((state:any)=> state.deviceReducer);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDeviceInfoChange = (deviceStatus:DeviceStatus, deviceType:DeviceType) =>{
    setDeviceInfo({...deviceInfo, deviceStatus:deviceStatus, deviceType:deviceType});    
  }

  // const handleActiveDevices = () =>{
  //   setDeviceInfo({...deviceInfo, deviceStatus:DeviceStatus.Active})
  //   dispatch(activeDevicesRequest(deviceInfo));
  // }

  // const handleDeadDevices = () =>{
  //   setDeviceInfo({...deviceInfo, deviceStatus:DeviceStatus.Dead})
  // }

  useEffect(()=>{
    dispatch(activeDeviceCountRequest(deviceInfo));
    dispatch(setDeviceInfoAction(deviceInfo));
    if (deleteDeviceData?.statusCode) {
      toast.success(deleteDeviceData?.message);
      dispatch(clearState());
    }
  },[deviceInfo.deviceStatus, deviceInfo.deviceType, deviceData.data.id, value, deleteDeviceData?.statusCode])

  useEffect(()=>{
    setValue(0);
    handleDeviceInfoChange(DeviceStatus.Active, DeviceType.Others);
  },[props.isHidden])


  return (
    <>
    {/* <Stack justifyContent={"center"} border={"1px solid"}> */}
      <Box sx={{ width: '100%',  bgcolor:"transparent"}} >
      <Tabs value={value} onChange={handleChange} centered indicatorColor='primary' textColor="inherit" sx={{visibility:props.isHidden ? "hidden" :"visible"}} > 
        <Tab label="Active Device" sx={{color:"white"}} onClick={()=>handleDeviceInfoChange(DeviceStatus.Active, DeviceType.Others)}/>
        <Tab label="Stock" onClick={()=>handleDeviceInfoChange(DeviceStatus.Dead, DeviceType.All)} />
        <Tab label="Active Mobile Device" onClick={()=>handleDeviceInfoChange(DeviceStatus.Active, DeviceType.Mobile)} />
      </Tabs>
    </Box>
    {/* </Stack> */}
    </>
  );
}
