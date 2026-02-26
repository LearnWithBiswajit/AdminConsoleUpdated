import { Button, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearState, createBitlockerRequest } from '../../redux/actions';
import deviceReducer from '../../redux/device.reducer';
import { toast } from 'react-toastify';

const AddBitlocker = ({ props }: any) => {

    const [createBitlockerForm, setCreateBitlockerForm] = useState({
        id: props?.deviceInfo?.id,
        bitlockerId: props.deviceInfo.bitlockerId,
        recoveryKey: props.deviceInfo.recoveryKey
    });
    const [submitText, setSubmitText] = useState<string>("Add Bitlocker");
    const dispatch = useDispatch();
    const { bitLockerInfo } = useSelector((state: any) => state.deviceReducer);

    useEffect(() => {
        if(props.deviceInfo.bitlockerId || props.deviceInfo.recoveryKey){
            setSubmitText("Update Bitlocker");
        }
        if (bitLockerInfo?.data?.bitlockerId) {
            toast.success(bitLockerInfo?.message);
            props.handleOpen();
            dispatch(clearState());
        }
    }, [bitLockerInfo?.data?.bitlockerId]);

    const handleChange = (event: any) => {
        setCreateBitlockerForm({ ...createBitlockerForm, [event.target.name]: event.target.value });
    }

    function handleSubmit(): void {

        dispatch(createBitlockerRequest(createBitlockerForm));
    }
    const handleClear = () => {
        setCreateBitlockerForm({
            ...createBitlockerForm,
            bitlockerId: "",
            recoveryKey: ""
        });
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
        // dispatch(userClearState());
        props.handleOpen();
        // setUserAdded(ModalState.AddUser);
    }

    return (
        <>
            <Stack direction={"row"} gap={"2rem"}>
                <TextField id="serialNumber" error={false} label="SerialNumber" value={props?.deviceInfo?.serialNumber} variant="outlined" fullWidth disabled />
                <TextField id="hostName" error={false} label="Host Name" value={props?.deviceInfo?.hostName} variant="outlined" fullWidth disabled />
            </Stack>

            <Stack direction={"row"} gap={"2rem"}>
                <TextField id="bitlockerId" error={false} label="Bitlocker ID" name='bitlockerId' value={createBitlockerForm.bitlockerId} variant="outlined" fullWidth onChange={handleChange} />
                <TextField id="bitlockerRecoveryKey" error={false} label="Bitlocker Recovery Key" name='recoveryKey' value={createBitlockerForm.recoveryKey} variant="outlined" fullWidth onChange={handleChange} />
            </Stack>

            <Stack direction={"row"} gap={"2rem"}>
                <Button variant='contained' fullWidth onClick={handleSubmit}>{submitText}</Button>
                <Button variant='contained' color='error' fullWidth onClick={() => handleCancel()}>Cancel</Button>
                <Button variant='outlined' color='error' fullWidth onClick={() => handleClear()}>Clear</Button>
            </Stack>
        </>
    )
}

export default AddBitlocker
