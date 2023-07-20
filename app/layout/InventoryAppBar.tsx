"use client";

import * as React from "react";
import { useEffect, useState } from "react";
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
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";

interface ListObject {
  id: number;
  code: string;
  name: string;
  isHidden: boolean;
  listItem: ListItemObject[];
}

interface ListItemObject {
  id: number;
  code: string;
  name: string;
}

export default function InventoryAppBar() {
  const router = useRouter();
  const [drawerState, setDrawerState] = useState(false);
  const [listItemOpenState, setListItemOpenState] = React.useState<
    Map<string, boolean>
  >(new Map<string, boolean>());
  const [menuData, setMenuData] = useState<ListObject[]>();

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

  const toggleListItemOpenState = (menuCode: string) => {
    const map = new Map<string, boolean>(listItemOpenState.entries());
    map.set(menuCode, !map.get(menuCode));

    setListItemOpenState(map);
  };

  useEffect(() => {
    // todo: axios 를 이용해서 data 를 가져오는 방식으로 변경
    const menuDataList = (): ListObject[] => {
      return [
        {
          id: 1,
          code: "msc",
          name: "msc",
          isHidden: false,
          listItem: [
            {
              id: 1,
              code: "decant",
              name: "decant",
            },
            {
              id: 2,
              code: "gtp",
              name: "gtp",
            },
          ],
        },
        {
          id: 2,
          code: "transaction",
          name: "재고 트랜잭션",
          isHidden: false,
          listItem: [
            {
              id: 1,
              code: "history",
              name: "재고 이력",
            },
          ],
        },
      ];
    };

    setMenuData(menuDataList);
  }, []);

  useEffect(() => {
    if (menuData != null) {
      const menuItemMap = new Map<string, boolean>();

      menuData.map((data) => {
        setListItemOpenState(menuItemMap.set(data.code, false));
      });
    }
  }, [menuData]);

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
            onClick={() => setDrawerState(!drawerState)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            IMS ADMIN
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={drawerState} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 300 }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          {menuData != null &&
            menuData.map((data: ListObject) => {
              return (
                <div key={data.id}>
                  <List>
                    <ListItemButton
                      onClick={() => {
                        toggleListItemOpenState(data.code);
                        return listItemOpenState.get(data.code);
                      }}
                    >
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary={data.name} />
                      {listItemOpenState.get(data.code) ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={listItemOpenState.get(data.code)}
                      timeout="auto"
                      unmountOnExit
                    >
                      {data.listItem.map((item: ListItemObject) => {
                        return (
                          <div key={item.id}>
                            <List component="div" disablePadding>
                              <ListItemButton
                                sx={{ pl: 4 }}
                                onClick={() => {
                                  router.push(
                                    `/pages/${data.code}/${item.code}`,
                                  );
                                  setDrawerState(false);
                                }}
                              >
                                <ListItemIcon>
                                  <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                              </ListItemButton>
                            </List>
                          </div>
                        );
                      })}
                    </Collapse>
                  </List>
                </div>
              );
            })}
        </Box>
      </Drawer>
    </Box>
  );
}
