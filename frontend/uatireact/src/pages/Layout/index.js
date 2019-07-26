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
  // toolbar: theme.mixins.toolbar,
  drawerPaper: {
    marginTop: "64px",
    width: drawerWidth
  },
  contentDefault: {
    backgroundColor: "#fff",
    margin: theme.spacing(2)
  },
  contentLogin: {
    height: "100vh"
  },
  main: {
    backgroundColor: "#ecf0f5",
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    marginTop: "64px"
  },
  login: {
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
    name,
    logout,
    location: { pathname }
  } = props;

  const defaultColor = "#b8c7ce";
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Web style={{ color: defaultColor }} />,
      showLogged: true
    },
    {
      name: "Importar Clientes",
      path: "/import",
      icon: <CloudUpload style={{ color: defaultColor }} />,
      showLogged: true
    },
    {
      name: "Notificações",
      path: "/notifications",
      icon: <NotificationImportant style={{ color: defaultColor }} />,
      showLogged: true
    },
    {
      name: "Administração",
      path: "/admin",
      icon: <Build style={{ color: defaultColor }} />,
      showLogged: true
    },
    {
      name: "Sair",
      path: "/login",
      icon: <Input style={{ color: defaultColor }} />,
      showLogged: true,
      onClick: () => logout()
    }
  ];

  const renderLinks = (isLogged, menuItems) => {
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
    <div
      style={{ backgroundColor: "#222d32", color: defaultColor, flexGrow: 1 }}
    >
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
        {/* icone para abrir o menu mobile */}
        <IconButton
          style={{ color: defaultColor }}
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
          Olá {name}
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
      <main className={pathname !== "/login" ? classes.main : classes.login}>
        <div
          className={
            pathname !== "/login"
              ? classes.contentDefault
              : classes.contentLogin
          }
        >
          {children}
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  isLogged: state.loginReducer.isLogged,
  name: state.loginReducer.loggedUser
    ? state.loginReducer.loggedUser.name
    : ""
});

const mapDispatchToProps = dispatch => bindActionCreators(allActions, dispatch);
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Layout)
);
