// import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Chip, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { BrandName, DeviceStatus, DeviceType, ModalState, OSType } from '../../config/enum.config';
import { CreateDevice } from '../../types/device.types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { clearState, createDeviceRequest, updateDeviceRequest } from '../../redux/actions';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import AddUser from './AddUser';
import AssignDevice from './AssignDevice';
import { clearState as userClearState } from '../../redux/users/user.actions';
import Device from './Device';
import AddBitlocker from './AddBitlocker';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    paddingRight: 6,
    paddingLeft: 6,
    paddingBottom: 6,
    borderRadius: "1rem"
};

export default function AddDevice(props: any) {
    // const [os, setOS] = useState<string>('');
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
        brand: ""
    });
    const [macAddressList, setMacAddressList] = useState<string[]>([]);
    const [addMacAddress, setAddMacAddress] = useState("");
    const [userAdded, setUserAdded] = useState<ModalState>(ModalState.AddUser);
    const dispatch = useDispatch();
    const deviceRef = useRef<any>(0);
    const brandRef = useRef<any>(0);
    const [btnText, setBtnText] = useState("Create");


    const { data } = useSelector((state: any) => state.userReducer);
    const deviceCreatedData = useSelector((state: any) => state.deviceReducer.data);
    const { deviceError } = useSelector((state: any) => state.deviceReducer.data);
    const { updatedUserInfo } = useSelector((state: any) => state.userReducer);
    const { updateDeviceInfo } = useSelector((state: any) => state.deviceReducer);

    const handleUserAdded = (status: ModalState) => {
        setUserAdded(status);
    }

    useEffect(() => {
        setUserAdded(props.modalState);
        if (deviceCreatedData.id) {
            props.handleOpen();
            toast.success('Device Assigned Successfully');
            dispatch(clearState());
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
            setMacAddressList([]);
        }
        if (data.userId && !deviceCreatedData.id) {
            toast.success('UserAdded Successfully');
        }
        if (updatedUserInfo?.data?.userId) {
            props.handleOpen();
            toast.success(updatedUserInfo.message);
            dispatch(userClearState())
        }
        if (updateDeviceInfo?.data?.id) {
            props.handleOpen();
            setUserAdded(ModalState.OsDevice);
            toast.success(updateDeviceInfo.message);
            dispatch(clearState());
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
            props.setUpdateDeviceInfo(createDeviceForm);
            setMacAddressList([]);
        }
    }, [props.modalState, deviceCreatedData.id, data.userId, updatedUserInfo, updateDeviceInfo])

    return (
        <div>
            <Modal
                open={props.open}
                onClose={() => props.handleOpen()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Stack sx={style} gap={"2rem"}>
                    <Stack direction={"row-reverse"}><Button onClick={() => props.handleOpen()}><CloseIcon sx={{ cursor: "pointer" }} /></Button></Stack>
                    {userAdded === ModalState.AddUser ?
                        <AddUser props={props} handleUserAdded={handleUserAdded} /> : userAdded === ModalState.AddDevice ?
                            <Device props={props} /> : userAdded === ModalState.AssignDevice ? <><AssignDevice userId={props.userId} handleClose={props.handleOpen}  /></> : userAdded === ModalState.OsDevice ? <>
                                <AssignDevice handleClose={props.handleOpen} deviceStatus={props.deviceStatus} deviceType={props.deviceType} osType={props.osType} setCurrentModalState = {props.setCurrentModalState} setUpdateDeviceInfo={props.setUpdateDeviceInfo} />
                            </> : userAdded === ModalState.UpdateUser ? <><AddUser props={props} handleUserAdded={handleUserAdded} /> </> : userAdded === ModalState.UpdateDevice ? 
                            <Device props={props} /> : userAdded === ModalState.AddBitlocker ? <AddBitlocker props={props} />  : ""
                    }</Stack>
            </Modal>
            
        </div>
    );
}
