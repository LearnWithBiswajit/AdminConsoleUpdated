
// import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useJwt } from 'react-jwt';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUserRequest } from '../../redux/users/user.actions';
import Swal from 'sweetalert2';
import { Logout } from '@mui/icons-material';
import { FaUser, FaKey } from 'react-icons/fa';
import { HiServerStack } from "react-icons/hi2";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function AdminConsole() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [heading, setHeading] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openSettings = Boolean(anchorEl);
  const [activeTab, setActiveTab] = useState<string>("");
  const dispatch = useDispatch();
  const {loggedInUserInfo} = useSelector((state:any) =>state.userReducer)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    handleLogout();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const token = JSON.parse(String(localStorage.getItem("token")))?.accessToken;
  const { decodedToken }: any = useJwt(token);

  useEffect(() => {
    // console.log(decodedToken?.email);
    if (decodedToken?.email) {
      dispatch(getLoggedInUserRequest({ email: decodedToken?.email }))
    }
  }, [decodedToken?.email])

  const itemList = [
    {
      name: "Dashboard",
      icon: <SpaceDashboardRoundedIcon onClick={() => navigate("dashboard")} />
    },
    {
      name: "Users",
      icon: <GroupIcon onClick={() => navigate("users")} />
    },
    {
      name: "Inventory",
      icon: <Inventory2RoundedIcon onClick={() => navigate("inventory")} />
    },
    {
      name: "BitLocker",
      icon: <FaKey onClick={() => navigate("bitlocker")} />
    },
    {
      name: "Servers",
      icon: <HiServerStack onClick={() => navigate("bitlocker")} />
    },
  ]

  useEffect(() => {
    handleNavigate(itemList[0])
  }, [])

  const handleNavigate = (item: any) => {
    setHeading(item.name);
    setActiveTab(item.name);
    navigate(item.name.toLowerCase())
  }

  const handleLogout = () => {
    handleClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from the application",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
        localStorage.removeItem("token");
        handleClose();
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "User has been deleted successfully, and all devices assigned to the user are now in stock.",
        //   icon: "success"
        // });
      }
    });


  }



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Stack direction={"row"} width={"100%"} alignItems={"center"} justifyContent={"center"}>
            {/* <Typography variant="h6" noWrap component="div"> */}
            {heading}
            {/* <Stack width={"100%"}> */}
            <Navbar isHidden={heading.toLowerCase() !== "dashboard" ? true : false} />
            {/* <div> */}
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color='error'
                sx={{ backgroundColor: "snow" }}
              // onClick={handleLogout}
              >
                <Logout color='error' />
              </Button>
              {/* <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openSettings}
                onClose={handleClose}
                slotProps={{
                  list: {
                    'aria-labelledby': 'basic-button',
                  },
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu> */}
            </div>

            {/* </div> */}
            {/* </Stack> */}
            {/* </Typography> */}
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{}}>
          <Typography variant="h6" noWrap component="div" fontWeight={"bold"}>
            Monster Console
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {itemList.map((item, index) => (
            <ListItem key={item.name} disablePadding sx={[{ display: 'block', transition: "0.5s" }, item.name == activeTab ? { boxShadow: "3px 3px 3px grey", background: "#e6e6e6" } : {}]}>
              <ListItemButton
                onClick={() => handleNavigate(item)}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    transition: "0.5s"
                  },
                  open
                    ? {
                      justifyContent: 'initial',
                    }
                    : {
                      justifyContent: 'center',
                    },
                  // item.name == activeTab ? {textShadow:"3px 3px 3px black"} : {}
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                      transition: "0.5s"
                    },
                    open
                      ? {
                        mr: 3,
                      }
                      : {
                        mr: 'auto',
                      },
                    item.name == activeTab ? { color: "black" } : {}
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={[
                    open
                      ? {
                        opacity: 1,
                      }
                      : {
                        opacity: 0,
                      },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />


        {/* Profile Info */}

        <Box sx={{ p: 2, marginTop: "auto" }}>
          <ListItem disablePadding sx={{ display: 'flex', transition: "0.5s" }}>
            <ListItemButton
              sx={[
                { minHeight: 48, px: 2.5, transition: "0.5s" },
                open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
              ]}
            >
              <ListItemIcon
                sx={[
                  { minWidth: 0, justifyContent: 'center', transition: "0.5s" },
                  open ? { mr: 3 } : { mr: 'auto' },
                ]}
              >
                <FaUser />
              </ListItemIcon>
              <ListItemText
                primary={loggedInUserInfo?.data?.firstName + " " + loggedInUserInfo?.data.lastName}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: open ? "1.1rem" : "0.8rem",
                      fontWeight: "bold",
                      transition: "0.3s",
                    },
                  },
                }}
                sx={[open ? { opacity: 1 } : { opacity: 0 }]}
              />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}