import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router'
import { loginUserRequest } from '../redux/users/user.actions';

const Login = () => {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const {loginUserInfo} = useSelector((state:any)=>state.userReducer);

    useEffect(()=>{
        if (localStorage.getItem("token")) {
            navigate("/adminconsole");
        } else {
            // setIsError(false);
            navigate("/")
        }
    }, [localStorage.getItem("token")])

    const handleLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }


    const handleLogin = (e:any): void => {
        e.preventDefault();
        dispatch(loginUserRequest(loginForm));
    }

    return (
        <div>
            <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} height={"100vh"} gap={"1.5rem"}>
                <Box sx={{ border: "1px solid black", padding: "100px", paddingY: "150px", borderRadius: "20px", boxShadow: "3px 3px 3px grey" }} >
                    <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} gap={"1.5rem"}>
                        <Typography fontFamily={"monotype-corsiva"} fontSize={"1.5rem"} fontWeight={"bold"} >Admin Console Login</Typography>
                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '35ch' } }}
                            noValidate
                            autoComplete="off"
                            width={"100%"}
                            onSubmit={(e) => handleLogin(e)}
                        >
                            <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} gap={"2rem"} width={"33ch"}>
                                <TextField id="outlined-basic" error={isError} label="Email" name='email' variant="outlined" fullWidth onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLoginForm(e)} />
                                {/* </Box> */}
                                {/* <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '35ch' } }}
                        noValidate
                        autoComplete="off"
                        width={"100%"}
                    > */}
                                <TextField id="outlined-basic1" label="Password" name='password' variant="outlined" fullWidth type='password' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLoginForm(e)} />
                            <Button variant='contained' type='submit' sx={{ width: '33ch', fontSize:"1rem", textShadow:"3px 3px 3px black", boxShadow:"3px 3px 3px grey" }}  onClick={(e) => handleLogin(e)}>Login</Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </div>
    )
}

export default Login
