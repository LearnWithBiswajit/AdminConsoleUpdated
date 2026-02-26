import { useState, useEffect } from 'react'
import CustomCard from '../Common/CustomCard'
import { Button, Stack } from '@mui/material'
import AppleIcon from '@mui/icons-material/Apple';
import WindowIcon from '@mui/icons-material/Window';
import { DiLinux } from "react-icons/di";
import { BsAndroid2 } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { DeviceStatus, DeviceType, ModalState, OSType } from '../../config/enum.config';
import AddDevice from './AddDevice';
import { activeDeviceCountRequest, activeDeviceRequest, clearState } from '../../redux/actions';
import { toast } from 'react-toastify';

const Dashboard = ({props}:any) => {
  const dispatch = useDispatch()
  const {data, loading, statusCode} = useSelector((state:any)=>state.dashboardReducer);
  const device = useSelector((state:any)=> state.deviceReducer);
  const{deviceData} = useSelector((state:any)=>state.deviceReducer);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [macCount, setMacCount] = useState(0);
  const [deviceInfo, setDeviceInfo] = useState({
        deviceStatus:DeviceStatus.Active,
        deviceType:DeviceType.Others
      });
      const [updateDeviceInfo, setUpdateDeviceInfo] = useState({
    osType: "",
    deviceType: "",
    userId: '',
    macAddress: [],
    hostName: '',
    serialNumber: '',
    brand: ""
  });
  const [osType, setOSType] = useState<any>();
  const [currentModalState, setCurrentModalState] = useState<any>();
  const {deleteDeviceData} = useSelector((state:any)=> state.deviceReducer);


  // const cardDetails = data[0]?.deviceType === DeviceType.Others ? [
  //   {
  //     title: OSType[data&&data.find((item:any)=>item.osType === OSType.MAC)?.osType],
  //     backgroundColor: "#D1E9FC",
  //     count: data&&data.find((item:any)=>item.osType === OSType.MAC)?.count,
  //     icon: <AppleIcon fontSize={"large"} />,
  //     iconColor:"#103996",
  //     backgroundImage:"linear-gradient(135deg, rgba(16, 57, 150, 0) 0%, rgba(16, 57, 150, 0.24) 100%)",
  //     textColour:"#061B64",
  //     isHidden: data&&data.find((item:any)=>item.osType === OSType.MAC)?.count ? false : true
  //   },
  //   {
  //     title: OSType[data&&data.find((item:any)=>item?.osType === OSType.Linux)?.osType],
  //     backgroundColor: "#D0F2FF",
  //     count: data&&data.find((item:any)=>item.osType === OSType.Linux)?.count,
  //     icon: <DiLinux fontSize={"2rem"} />,
  //     iconColor:"#0C53B7",
  //     backgroundImage:"linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)",
  //     textColour:"#04297A",
  //     isHidden:data&&data.find((item:any)=>item.osType === OSType.Linux)?.count ? false : true
  //   },
  //   {
  //     title: OSType[data&&data.find((item:any)=>item?.osType === OSType.Windows)?.osType],
  //     backgroundColor: "#FFF7CD",
  //     count: data&&data.find((item:any)=>item.osType === OSType.Windows)?.count,
  //     icon: <WindowIcon fontSize='large' />,
  //     iconColor:"#B78103",
  //     backgroundImage:"linear-gradient(135deg, rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 100%)",
  //     textColour:"#7A4F01",
  //     isHidden:data&&data.find((item:any)=>item.osType === OSType.Windows)?.count ? false : true
  //   },
  // ] : [
  //   {
  //     title: OSType[data&&data.find((item:any)=>item?.osType === OSType.IOS)?.osType],
  //     backgroundColor: "#D1E9FC",
  //     count: data&&data.find((item:any)=>item.osType === OSType.IOS)?.count,
  //     icon: <AppleIcon fontSize={"large"} />,
  //     iconColor:"#103996",
  //     backgroundImage:"linear-gradient(135deg, rgba(16, 57, 150, 0) 0%, rgba(16, 57, 150, 0.24) 100%)",
  //     textColour:"#061B64",
  //     isHidden:data&&data.find((item:any)=>item.osType === OSType.IOS)?.count ? false : true
  //   },
  //   {
  //     title: OSType[data&&data.find((item:any)=>item?.osType === OSType.Android)?.osType],
  //     backgroundColor: "#D0F2FF",
  //     count: data&&data.find((item:any)=>item.osType === OSType.Android)?.count,
  //     icon: <DiLinux fontSize={"2rem"} />,
  //     iconColor:"#0C53B7",
  //     backgroundImage:"linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)",
  //     textColour:"#04297A",
  //     isHidden:data&&data.find((item:any)=>item.osType === OSType.Android)?.count ? false : true
  //   },
  // ]

  // useEffect(()=>{
  //   dispatch(clearState());
  // },[])

  useEffect(()=>{
    dispatch(dispatch(activeDeviceCountRequest(deviceInfo)));
  }, [])


  const cardDetails = [
    {
      title: OSType[data&&data.find((item:any)=>item.osType === OSType.MAC)?.osType],
      backgroundColor: "#D1E9FC",
      count: data&&data.find((item:any)=>item.osType === OSType.MAC)?.count,
      icon: <AppleIcon fontSize={"large"} />,
      iconColor:"#103996",
      backgroundImage:"linear-gradient(135deg, rgba(16, 57, 150, 0) 0%, rgba(16, 57, 150, 0.24) 100%)",
      textColour:"#061B64",
      isHidden: data&&data.find((item:any)=>item.osType === OSType.MAC)?.count ? false : true
    },
    {
      title: OSType[data&&data.find((item:any)=>item?.osType === OSType.Linux)?.osType],
      backgroundColor: "#D0F2FF",
      count: data&&data.find((item:any)=>item.osType === OSType.Linux)?.count,
      icon: <DiLinux fontSize={"2rem"} />,
      iconColor:"#0C53B7",
      backgroundImage:"linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)",
      textColour:"#04297A",
      isHidden:data&&data.find((item:any)=>item.osType === OSType.Linux)?.count ? false : true
    },
    {
      title: OSType[data&&data.find((item:any)=>item?.osType === OSType.Windows)?.osType],
      backgroundColor: "#FFF7CD",
      count: data&&data.find((item:any)=>item.osType === OSType.Windows)?.count,
      icon: <WindowIcon fontSize='large' />,
      iconColor:"#B78103",
      backgroundImage:"linear-gradient(135deg, rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 100%)",
      textColour:"#7A4F01",
      isHidden:data&&data.find((item:any)=>item.osType === OSType.Windows)?.count ? false : true
    },
    {
      title: OSType[data&&data.find((item:any)=>item?.osType === OSType.IOS)?.osType],
      backgroundColor: "#D1E9FC",
      count: data&&data.find((item:any)=>item.osType === OSType.IOS)?.count,
      icon: <AppleIcon fontSize={"large"} />,
      iconColor:"#103996",
      backgroundImage:"linear-gradient(135deg, rgba(16, 57, 150, 0) 0%, rgba(16, 57, 150, 0.24) 100%)",
      textColour:"#061B64",
      isHidden:data&&data.find((item:any)=>item.osType === OSType.IOS)?.count ? false : true
    },
    {
      title: OSType[data&&data.find((item:any)=>item?.osType === OSType.Android)?.osType],
      backgroundColor: "#D0F2FF",
      count: data&&data.find((item:any)=>item.osType === OSType.Android)?.count,
      icon: <BsAndroid2 fontSize={"2rem"} />,
      iconColor:"#0C53B7",
      backgroundImage:"linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)",
      textColour:"#04297A",
      isHidden:data&&data.find((item:any)=>item.osType === OSType.Android)?.count ? false : true
    },
  ]

  const handleShowList = (item:any) =>{
    // dispatch(clearState());
    // console.log(data);
    setOSType(OSType[item.title]);
    setOpen(!open);
    setCurrentModalState(ModalState.OsDevice);
    const payload = {
      deviceStatus:deviceInfo.deviceStatus,
      deviceType:deviceInfo.deviceType,
      searchString:"",
      osType:OSType[item.title],
      page:1,
      limit:10
    }
    // dispatch(activeDeviceRequest(payload));
  }

  // console.log(device.deviceInfo);
  


  const handleOpen = () =>{
    setOpen(!open);
    setCurrentModalState(ModalState.AddDevice)
    dispatch(clearState());
  }

  return (
    <>
      <Stack direction={"row"} gap={10} flexWrap={"wrap"} boxSizing={"border-box"}>
      {
        cardDetails.map((item, index) => (
          <CustomCard key={index} backgroundColor = {item.backgroundColor} title = {item.title} icon = {item.icon} count = {item.count} iconColor={item.iconColor} backgroundImage = {item.backgroundImage} textColour = {item.textColour} isHidden = {item.isHidden} onClick={() => handleShowList(item)} />
        ))
      }
      </Stack>
      <Stack direction={"column-reverse"} width={"100%"} justifyContent={"center"} alignItems={"center"} height={"30rem"}>
        <Button variant='contained' size='large' sx={{width:"20rem"}} onClick={handleOpen}>Add Device</Button>
      </Stack>
      {open ? <AddDevice handleOpen = {handleOpen} open={open} modalState={currentModalState} deviceStatus={device && device?.deviceInfo?.deviceStatus} deviceType={device && device?.deviceInfo?.deviceType} osType={osType} setCurrentModalState={setCurrentModalState} setUpdateDeviceInfo={setUpdateDeviceInfo} deviceInfo={updateDeviceInfo} /> : ""}
    </>
  )
}

export default Dashboard;
