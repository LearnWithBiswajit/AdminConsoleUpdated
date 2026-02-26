import { Button, Chip, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { CreateDevice } from '../../types/device.types';
import { BrandName, DeviceType, ModalState, OSType } from '../../config/enum.config';
import { useDispatch, useSelector } from 'react-redux';
import { Bounce, toast } from 'react-toastify';
import { createDeviceRequest, updateDeviceRequest } from '../../redux/actions';
import { clearState as userClearState } from '../../redux/users/user.actions';
import { getOSRequest } from '../../redux/os/os.actions';

const Device = ({ props }: any) => {

    const [osType, setOsType] = useState<string[]>([])
    const [deviceType, setDeviceType] = useState<string[]>([])
    const [brandName, setBrandName] = useState<string[]>([])
    const [createDeviceForm, setCreateDeviceForm] = useState<CreateDevice>({
        osType: "",
        osVersion:"",
        deviceType: "",
        userId: '',
        macAddress: [],
        hostName: '',
        serialNumber: '',
        brand: "",
    });
    const [macAddressList, setMacAddressList] = useState<string[]>([]);
    const [addMacAddress, setAddMacAddress] = useState("");
    const [userAdded, setUserAdded] = useState<ModalState>(ModalState.AddUser);
    const dispatch = useDispatch();
    const deviceRef = useRef<any>(0);
    const brandRef = useRef<any>(0);
    const osVersionRef = useRef<any>(0);
    const [btnText, setBtnText] = useState("Create");

    const { data } = useSelector((state: any) => state.userReducer);
    const { deviceError } = useSelector((state: any) => state.deviceReducer.data);
    const { osData } = useSelector((state: any) => state.osReducer);


    useEffect(() => {
        // if (!props.deviceInfo?.id) {
            dispatch(getOSRequest())
        // }
        // setOsType(Object.keys(OSType).filter((item) => isNaN(parseInt(item))));
        setOsType (osData?.map((item:any)=> OSType[item.osType]))
        setDeviceType(Object.keys(DeviceType).filter((item) => isNaN(parseInt(item))));
        setBrandName(Object.keys(BrandName).filter((item) => isNaN(parseInt(item))));
        if (props.deviceInfo?.id) {
            setCreateDeviceForm(props.deviceInfo);
            setMacAddressList(props.deviceInfo.macAddress);
            setBtnText("Update");
        }
        // setUserAdded(props.modalState)
    }, [osData?.length])

    const handleChange = (event: any) => {
        // setOS(event.target.value as string);
        setCreateDeviceForm({ ...createDeviceForm, [event.target.name]: event.target.value });
        if (event.target.name === "macAddress")
            setAddMacAddress(event.target.value)
    };

    const handleSubmit = (event: any) => {
        setCreateDeviceForm({ ...createDeviceForm, [event.target.name]: event.target.value });
        if (macAddressList.length > 0) {
            if (!addMacAddress) {
                createDeviceForm["macAddress"] = macAddressList;
                createDeviceForm.userId = data?.userId;
                createDeviceForm.deviceType = deviceRef.current.value;
                createDeviceForm.brand = brandRef.current.value;
                createDeviceForm.osVersion = osVersionRef.current.value;
                if (btnText === "Create") {
                    dispatch(createDeviceRequest(createDeviceForm));
                } else {
                    // console.log(createDeviceForm);
                    dispatch(updateDeviceRequest(createDeviceForm));
                }
                if (deviceError?.error) {
                    dispatch(userClearState());
                }
            } else {
                toast.error('Add Entered MAC Address', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } else {
            toast.error('Please Add a MAC Address', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    }

    const handleAddMore = (e: any) => {

        if (!(addMacAddress.trim())) {
            toast.error('Please Enter a MAC Address', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        } else {
            // setMacAddressList([...macAddressList, addMacAddress]);
            macAddressList.push(addMacAddress)
            // createDeviceForm.macAddress = [];
            setAddMacAddress("")
        }

    }

    const handleClear = () => {
        setCreateDeviceForm({
            ...createDeviceForm,
            osType: "",
            deviceType: "",
            userId: '',
            macAddress: [],
            hostName: '',
            serialNumber: '',
            brand: ""
        });
        setMacAddressList([])
    }

    const handleDeleteMacAddress = (macAddress: string) => {
        // console.log(macAddress);
        setMacAddressList(macAddressList.filter((item) => macAddress != item));
    }


    const handleCancel = () => {
        props.setUpdateDeviceInfo({
            osType: "",
            deviceType: "",
            userId: '',
            macAddress: [],
            hostName: '',
            serialNumber: '',
            brand: "",
            id: ""
        });
        dispatch(userClearState());
        props.handleOpen();
        // setUserAdded(ModalState.AddUser);
    }

    return (
        <>
            <Stack direction={"row"} gap={"2rem"}>
                <FormControl fullWidth>
                    <InputLabel id="os-type-select-label">OS Type</InputLabel>
                    <Select
                        labelId="os-type-select-label"
                        id="os-type-select"
                        value={createDeviceForm.osType}
                        label="OS Type"
                        name="osType"
                        fullWidth
                        onChange={handleChange}
                    >
                        {osType?.map((item: any) => (
                            <MenuItem value={OSType[item]}>{item}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="os-version-select-label">OS Version</InputLabel>
                    <Select
                        labelId="os-version-select-label"
                        id="os-version-select"
                        value={!createDeviceForm.osVersion&&createDeviceForm.osType ? osData?.find((item:any)=> item.osType == createDeviceForm.osType)?.osVersion:createDeviceForm.osVersion}
                        label="OS Version"
                        name="osVersion"
                        inputRef={osVersionRef}
                        fullWidth
                        onChange={handleChange}
                    >
                        {osData?.map((item: any) => (
                            <MenuItem value={item.osVersion}>{item.osVersion}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="device-type-select-label">Device Type</InputLabel>
                    <Select
                        labelId="device-type-select-label"
                        id="device-type-select"
                        value={Number(createDeviceForm.osType) > 0 && Number(createDeviceForm.osType) <= 3 ? DeviceType.Others : Number(createDeviceForm.osType) >= 4 && Number(createDeviceForm.osType) <= 5 ? DeviceType.Mobile : createDeviceForm.deviceType}
                        label="Device Type"
                        name='deviceType'
                        inputRef={deviceRef}
                        fullWidth
                        onChange={handleChange}
                    >
                        {deviceType.map((item: any) => (
                            <MenuItem value={DeviceType[item]}>{item}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
            </Stack><Stack direction={"row"} gap={"2rem"}>
                <TextField id="outlined-basic" error={false} label="User ID" value={data && data.userId ? data.userId : createDeviceForm.userId} name='deviceId' variant="outlined" fullWidth onChange={handleChange} disabled />
                <Stack direction={"row"} width={"100%"}>
                    <TextField id="outlined-basic" error={false} label="MAC Address" name='macAddress' value={addMacAddress} variant="outlined" fullWidth onChange={handleChange} />
                    <Button variant='contained' sx={{ fontSize: "2rem", width: "1ch", height: "3ch" }} onClick={handleAddMore}>+</Button>
                </Stack>
            </Stack><Stack direction="row-reverse" spacing={1}>
                {macAddressList.map((item) => (
                    <Chip key={item} label={item} onDelete={() => handleDeleteMacAddress(item)} />
                ))}
            </Stack><Stack direction={"row"} gap={"2rem"}>
                <TextField id="outlined-basic" error={false} label="Host Name" name='hostName' value={createDeviceForm.hostName} variant="outlined" fullWidth onChange={handleChange} />
                <TextField id="outlined-basic" error={false} label="Serial Number" name='serialNumber' value={createDeviceForm.serialNumber} variant="outlined" fullWidth onChange={handleChange} />
            </Stack><Stack direction={"row"} gap={"2rem"}>
                <FormControl fullWidth>
                    <InputLabel id="brand-select-label">Brand</InputLabel>
                    <Select
                        labelId="brand-select-label"
                        id="brand-select"
                        value={Number(createDeviceForm.osType) == OSType.IOS || Number(createDeviceForm.osType) == OSType.MAC ? BrandName.Apple : Number(createDeviceForm.osType) === OSType.Android ? BrandName.Others : createDeviceForm.brand}
                        label="Brand"
                        name='brand'
                        inputRef={brandRef}
                        fullWidth
                        onChange={handleChange}
                    >
                        {brandName.map((item: any) => (
                            <MenuItem value={BrandName[item]}>{item}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
                <Button variant='contained' fullWidth onClick={handleSubmit}>{btnText}</Button>
                <Button variant='contained' color='error' fullWidth onClick={() => handleCancel()}>Cancel</Button>
                <Button variant='outlined' color='error' fullWidth onClick={() => handleClear()}>Clear</Button>
            </Stack>
        </>
    )
}

export default Device
