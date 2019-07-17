import React, { Fragment } from "react";
import {
  Divider,
  AppBar,
  Toolbar,
  Typography,
  Hidden,
  Drawer,
  MenuList,
  MenuItem,
  CssBaseline,
  IconButton,
  ListItemIcon
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Input,
  AssignmentInd,
  Build,
  Web,
  CloudUpload,
  NotificationImportant
} from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as allActions from "../../redux/actions";
import logo from "../../logo.svg";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    backgroundColor: "#fff",
    margin: theme.spacing(3)
  },
  main: {
    backgroundColor: "#ecf0f5",
    flexGrow: 1,
    height: "100vh"
  }
}));

function Layout(props) {
  const {
    container,
    children,
    isLogged,
    toggleIsLogged,
    location: { pathname }
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const mainDivClasses = `${classes.content} ${classes.mainDiv}`;

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Web />,
      showLogged: true
    },
    {
      name: "Import Clients",
      path: "/import",
      icon: <CloudUpload />,
      showLogged: true
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: <NotificationImportant />,
      showLogged: true
    },
    {
      name: "Administration",
      path: "/admin",
      icon: <Build />,
      showLogged: true
    },
    {
      name: "Sair",
      path: "/login",
      icon: <Input />,
      showLogged: true,
      onClick: () => toggleIsLogged()
    },
    {
      name: "Register",
      path: "/register",
      icon: <AssignmentInd />,
      showLogged: false
    }
  ];

  const renderLinks = (isLogged, menuItems, toggleIsLogged) => {
    return menuItems
      .filter(({ showLogged }) => showLogged === isLogged)
      .map(({ name, path, icon, onClick }) => (
        <MenuItem
          key={name}
          component={Link}
          to={path}
          selected={path === pathname}
          onClick={onClick}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <Typography variant="inherit">{name}</Typography>
        </MenuItem>
      ));
  };

  const sideMenu = (
    // Criação dos links do sidebar
    <div style={{ backgroundColor: "#222d32", color: "#b8c7ce", flexGrow: 1 }}>
      <Hidden smDown>
        <div className={classes.toolbar} />
      </Hidden>
      <Divider />
      <MenuList>{renderLinks(isLogged, menuItems)}</MenuList>
    </div>
  );

  const navBarTopo = (
    <AppBar
      position="fixed"
      className={classes.appBar}
      style={{ justifyContent: "flex-start" }}
    >
      <Toolbar
        style={{
          justifyContent: "flex-start",
          backgroundColor: "#fff",
          color: "#333"
        }}
      >
        <IconButton
          style={{ color: "#b8c7ce" }}
          color="primary"
          aria-label="Open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="h6" align="left" style={{ flexGrow: 1 }}>
          Uati Bank
        </Typography>
        <Typography variant="h6" noWrap>
          Welcome User
        </Typography>
      </Toolbar>
    </AppBar>
  );

  const sideBarMobile = (
    <Hidden smUp implementation="css">
      <Drawer
        container={container}
        variant="temporary"
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {sideMenu}
      </Drawer>
    </Hidden>
  );

  const sideBarDesktop = (
    <Hidden xsDown implementation="css">
      <Drawer
        classes={{
          paper: classes.drawerPaper
        }}
        variant="permanent"
        open
      >
        {sideMenu}
      </Drawer>
    </Hidden>
  );
  console.log(children);
  return (
    <div className={classes.root}>
      <CssBaseline />
      {isLogged && (
        <Fragment>
          {/* Navbar topo */}
          {navBarTopo}

          <nav className={classes.drawer}>
            {/* SideBar para mobile */}
            {sideBarMobile}

            {/* SideBar, onde ficam os menus */}
            {sideBarDesktop}
          </nav>
        </Fragment>
      )}
      <main className={classes.main}>
        <div className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  isLogged: state.userReducer.isLogged
});

const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Layout)
);
