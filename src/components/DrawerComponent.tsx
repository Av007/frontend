import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Avatar,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface User {
  id: string;
  name: string;
  pic?: string;
}

interface Connector {
  name: string;
  logo: string;
}

export interface AppDetails {
  name: string;
  category: string;
  logo?: string;
  users: User[];
  connector: Connector;
  lastClassification: string;
}

interface DrawerProps {
  onOpen: (isOpen: boolean) => void;
  selectedData?: AppDetails;
}

export default function AnchorTemporaryDrawer({
  onOpen,
  selectedData,
}: DrawerProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (selectedData) {
      setOpen(true);
      onOpen(true);
    }
  }, [selectedData, onOpen]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    onOpen(newOpen);
  };

  const users = selectedData?.users
    ? selectedData.users.filter((user: User) => user.pic)
    : [];

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ width: "50vw" }} role="presentation">
        <h1>App overview</h1>
        <Avatar
          alt={selectedData?.name}
          src={selectedData?.logo}
          sx={{
            width: 48,
            height: 48,
            "& img": {
              objectFit: "contain",
              padding: "4px",
            },
          }}
        />

        <Card>
          <Typography variant="h6">
            <Typography
              variant="body1"
              sx={{ fontFamily: "monospace", opacity: "50%" }}
            >
              <dl>
                <dt>App name:</dt>
                <dd>{selectedData?.name}</dd>
                <dt>Category:</dt>
                <dd>{selectedData?.category}</dd>
                <dt>Users:</dt>
                <dd>{selectedData?.users.length}</dd>
                <dt>Connector:</dt>
                <dd>
                  <Avatar
                    alt={selectedData?.connector?.name}
                    src={selectedData?.connector?.logo}
                    sx={{
                      width: 48,
                      height: 48,
                      "& img": {
                        objectFit: "contain",
                        padding: "4px",
                      },
                    }}
                  />
                </dd>
                <dt>Last classification:</dt>
                <dd>{selectedData?.lastClassification}</dd>
              </dl>
            </Typography>
          </Typography>
        </Card>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: User) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar
                      alt={user.name}
                      src={user.pic}
                      sx={{
                        width: 24,
                        height: 24,
                        "& img": {
                          objectFit: "contain",
                          padding: "4px",
                        },
                      }}
                    />
                    {user.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Drawer>
  );
}
