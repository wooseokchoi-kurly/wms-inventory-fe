"use client";

import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";

type toggleStateType = "listItem" | "";

interface ListItemObject {
  name: string;
  isOpen: boolean;
}

export default function InventoryAppBar() {
  const router = useRouter();
  const [drawerState, setDrawerState] = useState(false);
  const [listItemOpenState, setListItemOpenState] = React.useState(true);
  const [listItemOpenState2, setListItemOpenState2] = React.useState<
    ListItemObject[]
  >([]);
  const toggleDrawer =
    (value: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerState(value);
    };

  const toggleState = (type: toggleStateType) => {
    if (type === "listItem") {
      setListItemOpenState(!listItemOpenState);
    } else {
      setDrawerState(!drawerState);
    }
  };

  const list = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItemButton onClick={() => toggleState("listItem")}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="MSC" />
          {listItemOpenState ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={listItemOpenState} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                router.push("/pages/msc/decant");
                setDrawerState(false);
              }}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="decant" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                router.push("/pages/msc/gtp");
                setDrawerState(false);
              }}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="gtp" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleState("")}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IMS ADMIN
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={drawerState} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </Box>
  );
}
