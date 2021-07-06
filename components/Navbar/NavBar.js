import React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import RedeemIcon from "@material-ui/icons/Redeem";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import StoreIcon from "@material-ui/icons/Store";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
const vendorOptions = [
  [
    "/dashboard",
    "Productos",
    function iconSet() {
      return <StoreIcon />;
    },
  ],
  [
    "/createproducts",
    "Crear Productos",
    function iconSet() {
      return <RedeemIcon />;
    },
  ],
  [
    "/createvendor",
    "Agregar Vendedor",
    function iconSet() {
      return <PersonAddIcon />;
    },
  ],
];
const costumerOptions = [
  [
    "/dashboard",
    "Home",
    function iconSet() {
      return <MenuIcon />;
    },
  ],
  [
    "/store",
    "Tienda",
    function iconSet() {
      return <StoreIcon />;
    },
  ],
  [
    "/filterstore",
    "Filtrados",
    function iconSet() {
      return <PersonAddIcon />;
    },
  ],
];
const adminOptions = [
  [
    "/dashboard",
    "Todos Los Productos",
    function iconSet() {
      return <PersonAddIcon />;
    },
  ],
];

const NavBar = ({ children }) => {
  const { auth, logout } = useAuth();
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Spartan MarketPlace
          </Typography>
          <Typography className={classes.title} variant="h6" noWrap>
            User role: {auth.role}
          </Typography>
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
          {auth?.role === "COSTUMER" ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <ShoppingCartIcon />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {auth?.role === "VENDOR"
            ? vendorOptions.map((text, index) => (
                <Link href={text[0]} key={index} passHref>
                  <ListItem button onClick={() => setOpen(false)}>
                    <ListItemIcon>{text[2]()}</ListItemIcon>
                    <ListItemText primary={text[1]} />
                  </ListItem>
                </Link>
              ))
            : null}
          {auth?.role === "COSTUMER"
            ? costumerOptions.map((text, index) => (
                <Link href={text[0]} key={index} passHref>
                  <ListItem button onClick={() => setOpen(false)}>
                    <ListItemIcon>{text[2]()}</ListItemIcon>
                    <ListItemText primary={text[1]} />
                  </ListItem>
                </Link>
              ))
            : null}
          {auth?.role === "ADMIN"
            ? adminOptions.map((text, index) => (
                <Link href={text[0]} key={index} passHref>
                  <ListItem button onClick={() => setOpen(false)}>
                    <ListItemIcon>{text[2]()}</ListItemIcon>
                    <ListItemText primary={text[1]} />
                  </ListItem>
                </Link>
              ))
            : null}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

export default NavBar;
