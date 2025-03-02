import { DataGrid, GridColDef, GridSortModel, GridRowId, GridRowSelectionModel } from "@mui/x-data-grid";
import { Avatar, Box } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import { AppDetails } from "./DrawerComponent";

interface TableProps {
  setSelectedDetails: (details: AppDetails | undefined) => void;
}

interface SortOrder {
  field?: string;
  sort?: 'asc' | 'desc' | null;
}

interface AppData {
  appId: string;
  name: string;
  category: string;
  logos: {
    app: string;
    connector: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function TableComponent({ setSelectedDetails }: TableProps) {
  const [data, setData] = useState<AppData[]>([]);
    const [, setSelected] = useState<GridRowId[]>([]);
    const [order, setOrder] = useState<SortOrder>({});
  
  const [, setFilterModel] = useState({
    items: [],
    quickFilterValues: [],
  });

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar
              alt={params.value}
              src={params.row.logos.app}
              sx={{ 
                width: 48, 
                height: 48,
                '& img': {
                  objectFit: "contain",
                  padding: "4px",
                }
              }}
            />
            <span>{params.value}</span>
          </Box>
        );
      },
    },
    { field: "category", headerName: "Category", width: 300 },
    {
      field: "connector",
      headerName: "Connector",
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar
              alt={params.value}
              src={params.row.logos.connector}
              sx={{ 
                width: 48, 
                height: 48,
                '& img': {
                  objectFit: "contain",
                  padding: "4px",
                }
              }}
            />
          </Box>
        );
      },
    },
  ];

  const fetchResults = useCallback(() => {
    axios
      .get(`/apss_inventory.mock.json`)
      .then((response) => {
        if (order.field && order.sort) {
          response.data = response.data.sort((a: AppData, b: AppData) => {
            if (order.sort === "asc") {
              return a[order.field!] - b[order.field!];
            } else {
              return b[order.field!] - a[order.field!];
            }
          });
        }
        const { data } = response;
        const items = data.reduce((acc: AppData[], curr: AppData) => acc.concat(curr), []) || [];

        setFilterModel((prev) => ({ ...prev, items }));
        setData(items);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [order]);

  function getRowId(row: AppData) {
    return row.appId;
  }

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    if (sortModel.length > 0) {
      setOrder(sortModel[0] as SortOrder);
    } else {
      setOrder({});
    }
  }, []);

  const rowSelected = async (rowSelectionModel: GridRowSelectionModel) => {
    setSelected([...rowSelectionModel]);
    
    if (rowSelectionModel.length > 0) {
      const { data: details } = await axios.get(`/app_details.mock.json`);
      setSelectedDetails({ 
        ...details,
        lastClassification: formatDistance(details.lastClassification, Date.now(), {
          addSuffix: true,
        })
      });
    } else {
      setSelectedDetails(undefined);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
          <DataGrid
            getRowId={getRowId}
            initialState={{
              filter: {
                filterModel: {
                  items: [],
                  quickFilterValues: localStorage.getItem("query")
                    ? [localStorage.getItem("query")]
                    : [],
                },
              },
              pagination: { paginationModel: { pageSize: 25 } },
            }}
            filterMode="server"
            onSortModelChange={handleSortModelChange}
            onRowSelectionModelChange={rowSelected}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            rows={data}
            columns={columns}
            sx={{ border: 0 }}
          />
        </div>
  );
}