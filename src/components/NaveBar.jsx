import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/images/logoimage/pixako.png";
import { Link } from "react-router-dom";

export default function DenseAppBar() {
  
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar
          position="static"
          color="transparent"
          style={{ padding: "8px" }}
        >
          <Toolbar
            variant="dense"
            sx={{ justifyContent: isSmallScreen ? "space-between" : "" }}
          >
            <Box
              sx={{
                "& img": {
                  width: "200px",
                  marginRight: "25px",
                  boxShadow: "5px 6px 6px rgba(0, 0, 0, 0.1)", // Add box shadow
                },
              }}
            >
              <Link to="/">
                <img src={Logo} alt="pixako" />
              </Link>
            </Box>
            {!isSmallScreen && (
              <>
                <Typography
                  variant="h6"
                  color="inherit"
                  component="div"
                  sx={{
                    mr: 2,
                    "& a": {
                      color: "black",
                      textDecoration: "none",
                      borderBottom: "2px solid transparent",
                      transition: "border-bottom 0.3s ease",
                      "&:hover": {
                        borderBottom: "2px solid #000",
                        fontWeight: "bold",
                      },
                    },
                  }}
                >
                  <Link to="/">Home</Link>
                </Typography>
                <Typography
                  variant="h6"
                  color="inherit"
                  component="div"
                  sx={{
                    mr: 2,
                    "& a": {
                      color: "black",
                      textDecoration: "none",
                      borderBottom: "2px solid transparent",
                      transition: "border-bottom 0.3s ease",
                      "&:hover": {
                        borderBottom: "2px solid #000",
                        fontWeight: "bold",
                      },
                    },
                  }}
                >
                  <Link to="/addvehicle">Add Vehicles</Link>
                </Typography>
                <Typography
                  variant="h6"
                  color="inherit"
                  component="div"
                  sx={{
                    mr: 2,
                    "& a": {
                      color: "black",
                      textDecoration: "none",
                      borderBottom: "2px solid transparent",
                      transition: "border-bottom 0.3s ease",
                      "&:hover": {
                        borderBottom: "2px solid #000",
                        fontWeight: "bold",
                      },
                    },
                  }}
                >
                  <Link to="/listing">Vehicle List</Link>
                </Typography>
              </>
            )}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{
                mr: 2,
                display: { xs: "block", sm: "block", md: "none" },
                justifyContent: "space-between",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItem button>
              <ListItemText
                sx={{
                  mr: 2,
                  "& a": {
                    color: "black",
                    textDecoration: "none",
                    borderBottom: "2px solid transparent",
                    transition: "border-bottom 0.3s ease",
                    "&:hover": {
                      borderBottom: "2px solid #000",
                      fontWeight: "bold",
                    },
                  },
                }}
              >
                <Link to="/">Home</Link>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText
                sx={{
                  mr: 2,
                  "& a": {
                    color: "black",
                    textDecoration: "none",
                    borderBottom: "2px solid transparent",
                    transition: "border-bottom 0.3s ease",
                    "&:hover": {
                      borderBottom: "2px solid #000",
                      fontWeight: "bold",
                    },
                  },
                }}
              >
                <Link to="/addvehicle">Add Vehicles</Link>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText
                sx={{
                  mr: 2,
                  "& a": {
                    color: "black",
                    textDecoration: "none",
                    borderBottom: "2px solid transparent",
                    transition: "border-bottom 0.3s ease",
                    "&:hover": {
                      borderBottom: "2px solid #000",
                      fontWeight: "bold",
                    },
                  },
                }}
              >
                <Link to="/listing">Vehicle List</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
