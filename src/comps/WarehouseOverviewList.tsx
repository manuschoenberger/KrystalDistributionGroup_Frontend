import {useGetWarehouses} from "../hooks/useGetWarehouses.ts";
import {CircularProgress, List, Paper, Typography} from "@mui/material";
import {WarehouseOverview} from "../models/WarehouseOverview.ts";
import WarehouseOverviewListItem from "./WarehouseOverviewListItem.tsx";

export default function WarehouseOverviewList() {

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
            {Object.entries(groupedWarehouses).map(([sellerUUID, warehouses]) => (
                <div key={sellerUUID}>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                        Seller ID: {sellerUUID}
                    </Typography>
                    <List>
                        {warehouses.map((warehouse) => (
                            <WarehouseOverviewListItem
                                key={warehouse.warehouseUUID.uuid}
                                warehouseUUID={warehouse.warehouseUUID.uuid}
                                warehouseNumber={warehouse.warehouseNumber}
                                rawMaterialData={warehouse.rawMaterialData}
                                amount={warehouse.amount}
                            />
                        ))}
                    </List>
                </div>
            ))}
        </Paper>
    )
}