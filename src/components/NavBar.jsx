import { useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import { MdShoppingBasket, MdRestartAlt } from "react-icons/md";

function NavBar({ title, itemsCount, items, handleResetInterface }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={open}
        onClose={() => setOpen(false)}
        message={`${items.join(",\n")}`}
        sx={{ mt: 8, ml: 0.5, maxWidth: "20rem", whiteSpace: "pre-line" }}
      />
      <Box>
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <IconButton
              disabled={itemsCount == 0 ? true : false}
              size="large"
              title="shopping basket"
              onClick={() => setOpen(true)}
              sx={{ backgroundColor: open ? "rgba(0,0,0,0.08)" : "" }}
            >
              <Badge badgeContent={itemsCount} color="secondary">
                <MdShoppingBasket />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              title="reset"
              disabled={itemsCount === 0}
              onClick={handleResetInterface}
            >
              <MdRestartAlt />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default NavBar;
