import {CircularProgress, Divider, List, Paper, Typography} from "@mui/material";
import {WarehouseOverview} from "../models/WarehouseOverview.ts";
import {useGetWarehouses} from "../hooks/useGetWarehouses.ts";
import RawMaterialListItem from "./RawMaterialListItem.tsx";

export default function RawMaterialList() {

    const {
        warehouses,
        isLoading: isGettingWarehouses,
        isError: isErrorGetWarehouses,
    } = useGetWarehouses();

    if (isGettingWarehouses) {
        return <CircularProgress />;
    }

    if (isErrorGetWarehouses) {
        return <Typography color="error">Failed to load warehouses.</Typography>;
    }

    if (!warehouses || warehouses.length === 0) {
        return <Typography>No warehouses available.</Typography>;
    }

    const groupedWarehouses = warehouses.reduce((accumulator, warehouse) => {
        const sellerUUID = warehouse.sellerUUID?.uuid

        if (!accumulator[sellerUUID]) {
            accumulator[sellerUUID] = [];
        }

        accumulator[sellerUUID].push(warehouse);

        return accumulator;
    },
        {} as Record<string, WarehouseOverview[]>
    );

    return (
        <Paper sx={{ p: 2 }}>
            <List>
                {Object.entries(groupedWarehouses).map(([sellerUUID]) => (
                    <div key={sellerUUID}>
                        <Typography variant="subtitle1" sx={{ mt: 2 }}>
                            Seller ID: {sellerUUID}
                        </Typography>
                        {groupedWarehouses[sellerUUID].map((warehouse) => (
                            <RawMaterialListItem
                                key={warehouse.warehouseUUID.uuid}
                                warehouseUUID={warehouse.warehouseUUID.uuid}
                                rawMaterialData={warehouse.rawMaterialData}
                                amount={warehouse.amount}
                            />
                        ))}
                        <Divider />
                    </div>
                ))}
            </List>
        </Paper>
    )
}