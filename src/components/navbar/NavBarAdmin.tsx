import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
const NavBarAdmin = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const user = JSON.parse(localStorage.getItem("userToken"));
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
            src={require(`../../assets/image/car/auto-car.jpg`)}
            alt=""
            className="carimg w-full h-full"
          />
        </Box>
      </div>
      <div className="menu">
        <ul>
          <li className="item-link">
            <Link to="/admin">HOME</Link>
          </li>
          <li className="item-link">
            <Link to="/admin/car">CAR</Link>
          </li>
          <li className="item-link">
            <Link to="/admin/listbooking">LIST BOOKING</Link>
          </li>
          <li className="item-link">
            <Link to="/admin/automaker">AUTOMAKER</Link>
          </li>
          <li className="item-link">
            <Link to="/admin/user">USER</Link>
          </li>
          <li className="item-link">
            <Link to="/admin/blog">Blog</Link>
          </li>
        </ul>
      </div>
      <div>
        <div>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            {user?.fullname}
          </Button>
          {user?.role === 1 ? (
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
                          to="/admin"
                          style={{ textDecoration: "none" }}
                          onClick={handleClose}
                        >
                          <MenuItem>Home</MenuItem>
                        </Link>
                        <Link
                          to="/admin/car"
                          style={{ textDecoration: "none" }}
                          onClick={handleClose}
                        >
                          <MenuItem>List Car</MenuItem>
                        </Link>
                        <Link
                          to="/admin/listbooking"
                          style={{ textDecoration: "none" }}
                          onClick={handleClose}
                        >
                          <MenuItem>List Booking</MenuItem>
                        </Link>
                        <Link
                          to="/admin/user"
                          style={{ textDecoration: "none" }}
                          onClick={handleClose}
                        >
                          <MenuItem>List User</MenuItem>
                        </Link>
                        <Link
                          to="/admin/automaker"
                          style={{ textDecoration: "none" }}
                          onClick={handleClose}
                        >
                          <MenuItem>List Automaker</MenuItem>
                        </Link>

                        <MenuItem onClick={logout}>{`Logout=>`}</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default NavBarAdmin;
