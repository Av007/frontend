import {
  AppBar,
  Toolbar,
  Box,
  Link,
  Chip,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import { useCallback, useState } from "react";
import AnchorTemporaryDrawer, { AppDetails } from "../components/DrawerComponent";
import TableComponent from "../components/TableComponent";

export default function Index() {
  const [, setDrawerOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<AppDetails | undefined>(undefined);

  const handleDrawerOpen = useCallback((isOpen: boolean) => {
    setDrawerOpen(isOpen);
  }, []);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Avatar
            src="https://cdn.prod.website-files.com/644fc991ce69ff0d3bdbeb63/654b815aaae657a2646a635e_logo_reco.svg"
            sx={{ 
              '& img': {
                objectFit: "contain",
                padding: "4px",
              }
            }}
          />
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs aria-label="basic tabs example" value={0}>
              <Tab label="Apps" />
              <Tab label="Data" />
              <Tab label="Identities" />
              <Tab label="Alerts" />
              <Tab label="Alerts" />
              <Tab label="Conf" />
            </Tabs>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box display="flex" alignItems="center" gap={2}>
            <Chip
              sx={{
                color: "white",
                borderColor: "white",
                backgroundColor: "transparent",
              }}
              label="Security-Demo2"
              variant="outlined"
            />

            <Link
              sx={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
                ":hover": { color: "lightgray" },
              }}
              href="/logout"
            >
              ?
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: "100%" }}>
        <TableComponent setSelectedDetails={setSelectedDetails} />
        <AnchorTemporaryDrawer onOpen={handleDrawerOpen} selectedData={selectedDetails} />
      </Box>
    </>
  );
}
