import { Button, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { CreateUser } from '../../types/device.types';
import { useDispatch, useSelector } from 'react-redux';
import { createUserRequest, updateUserRequest } from '../../redux/users/user.actions';
import { ModalState } from '../../config/enum.config';

const AddUser = ({ props, handleUserAdded }: any) => {

    const [createUserForm, setCreateUserForm] = useState<CreateUser>({
        firstName: "",
        middleName: "",
        lastName: "",
        employeeId: "",
        email: "",
        password: "",
    });
    const [submitText, setSubmitText] = useState<string>("Create");
    const dispatch = useDispatch();

    const { data } = useSelector((state: any) => state.userReducer);
    const { singleUserInfo } = useSelector((state: any) => state.userReducer);

    const handleChange = (event: any) => {
        // setOS(event.target.value as string);
        setCreateUserForm({ ...createUserForm, [event.target.name]: event.target.value });
    }

    const handleSubmit = () => {
        // setSubmitText("Assign Device");
        // console.log(createUserForm);
        dispatch(createUserRequest(createUserForm));
    }

    const handleAssignDevice = () => {
        handleUserAdded(ModalState.AddDevice);
    }

    const handleUpdate = () =>{
        dispatch(updateUserRequest(createUserForm));
    }

    const handleClear = () => {
        setCreateUserForm({
            ...createUserForm,
            firstName: "",
            middleName: "",
            lastName: "",
            employeeId: "",
            email: "",
            password: "",
        });
    }


    useEffect(() => {
        // console.log(singleUserInfo);
        if (data.userId) {
            setSubmitText("Assign Device");
        } else if (singleUserInfo.userId) {
            setSubmitText("Update");
            setCreateUserForm({...createUserForm, firstName:singleUserInfo.firstName, middleName:singleUserInfo.middleName, lastName:singleUserInfo.lastName, employeeId:singleUserInfo.employeeId, email:singleUserInfo.email, userId:singleUserInfo.userId});
        }
    }, [data.userId, singleUserInfo])

    return (
        <>
            {/* <Stack sx={style} gap={"2rem"}> */}
            {/* <Stack direction={"row-reverse"}><Button onClick={() => props.handleOpen()}><CloseIcon sx={{ cursor: "pointer" }} /></Button></Stack> */}
            <Stack direction={"row"} gap={"2rem"}>
                <TextField id="firstName" error={false} label="First Name" name='firstName' value={createUserForm.firstName} variant="outlined" fullWidth onChange={handleChange} />
                <TextField id="middleName" error={false} label="Middle Name" name='middleName' value={createUserForm.middleName} variant="outlined" fullWidth onChange={handleChange} />
            </Stack>
            <Stack direction={"row"} gap={"2rem"}>
                <TextField id="lastName" error={false} label="Last Name" name='lastName' value={createUserForm.lastName} variant="outlined" fullWidth onChange={handleChange} />
                <TextField id="employeeId" error={false} label="Employee ID" name='employeeId' value={createUserForm.employeeId} variant="outlined" fullWidth onChange={handleChange} />
            </Stack>
            {/* <Stack direction="row-reverse" spacing={1}>
                    {macAddressList.map((item) => (
                        <Chip label={item} onDelete={() => handleDeleteMacAddress(item)} />
                    ))}
                </Stack> */}
            <Stack direction={"row"} gap={"2rem"}>
                <TextField id="email" error={false} label="Email" name='email' value={createUserForm.email} variant="outlined" fullWidth onChange={handleChange} />
                <TextField id="password" error={false} label="Password" name='password' value={createUserForm.password} variant="outlined" fullWidth onChange={handleChange} />
            </Stack>
            <Stack direction={"row"} gap={"2rem"}>
                <Button variant='contained' fullWidth onClick={submitText === "Create" ? handleSubmit : submitText === "Update" ? handleUpdate : handleAssignDevice}>{submitText}</Button>
                <Button variant='contained' color='error' fullWidth onClick={() => props.handleOpen()}>Cancel</Button>
                <Button variant='outlined' color='error' fullWidth onClick={() => handleClear()}>Clear</Button>
            </Stack>
            {/* </Stack> */}
        </>
    )
}

export default AddUser
