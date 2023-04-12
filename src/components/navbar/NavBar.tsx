import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
const NavBar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const user = JSON.parse(localStorage.getItem("userToken"))
    ? JSON.parse(localStorage.getItem("userToken"))
    : null;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);
  return (
    <div className="menu-header">
      <div>
        <Box sx={{ height: "70px", width: 120 }}>
          <img
            src={require(`../../assets/image/car/logo-car.png`)}
            alt=""
            className="carimg w-full h-full"
          />
        </Box>
      </div>
      <div className="menu">
        <ul>
          <li className="item-link">
            <Link to="/app">Home</Link>
          </li>
          <li className="item-link">
            <Link to="/app/new">New</Link>
          </li>
          <li className="item-link">
            <Link to="/app/service">Service</Link>
          </li>
          <li className="item-link">
            <Link to="/app/about">About</Link>
          </li>
          <li className="item-link">
            <Link to="/app/contact">Contact</Link>
          </li>
          <li className="item-link">
            <Link to="/app/listbookings">My bookings</Link>
          </li>
        </ul>
      </div>
      <div>
        <div>
          <Button
            sx={{
              backgroundImage: "linear-gradient(25deg,#d64c7f,#ee4758 50%);",
            }}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            {user?.fullname}
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <Link
                        to="/app"
                        style={{ textDecoration: "none" }}
                        onClick={handleClose}
                      >
                        <MenuItem>Home</MenuItem>
                      </Link>

                      <Link
                        to="/app/listbookings"
                        style={{ textDecoration: "none" }}
                        onClick={handleClose}
                      >
                        <MenuItem>My bookings</MenuItem>
                      </Link>
                      <MenuItem onClick={handleClose}>
                        <Button className="btn-logout" onClick={logout}>
                          Logout
                        </Button>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
