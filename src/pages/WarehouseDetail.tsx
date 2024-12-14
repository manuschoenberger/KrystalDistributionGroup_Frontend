import {useParams} from "react-router-dom";
import {CircularProgress, LinearProgress, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import {CAPACITY} from "../models/WarehouseOverview.ts";
import {useGetWarehouseByUUID} from "../hooks/useGetWarehouses.ts";
import {WarehouseActivity} from "../models/WarehouseActivity.ts";
import {WarehouseActivityData} from "../models/WarehouseActivityData.ts";

export default function WarehouseDetail() {

    const { warehouseUUID = "" } = useParams<{
        warehouseUUID: string
    }>();

    const {
        warehouse,
        isLoading: isGettingWarehouseByUUID,
        isError: isErrorGetWarehouseByUUID,
    } = useGetWarehouseByUUID({warehouseUUID});

    if (isGettingWarehouseByUUID) {
        return <CircularProgress />;
    }

    if (isErrorGetWarehouseByUUID) {
        return <Typography color="error">Failed to load warehouse.</Typography>;
    }

    if (!warehouseUUID) {
        return <Typography color="error">Warehouse ID is missing.</Typography>;
    }

    if (!warehouse) {
        return <Typography color="error">Warehouse data not found.</Typography>;
    }

    const currentAmount = warehouse.amount / CAPACITY * 100;

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Warehouse Details
            </Typography>
            <Typography variant="body1">
                <strong>Warehouse Number:</strong> {warehouse.warehouseNumber}
            </Typography>
            <Typography variant="body1">
                <strong>Raw Material:</strong> {warehouse.rawMaterialData}
            </Typography>
            <Typography variant="body1">
                <strong>Current Amount:</strong> {warehouse.amount} tons
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Capacity Utilization:</strong> {currentAmount.toFixed(2)}%
            </Typography>
            <LinearProgress variant="determinate" value={currentAmount} sx={{ mb: 2 }} />

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Recent Activities
            </Typography>
            {warehouse.activityWindow.activities && warehouse.activityWindow.activities.length > 0 ? (
                <List>
                    {warehouse.activityWindow.activities.map((activity: WarehouseActivity) => (
                        <ListItem key={activity.warehouseActivityUUID}>
                            <ListItemText
                                primary={`${activity.warehouseActivityData} - ${activity.amount} tons`}
                                secondary={`Date: ${new Date(activity.time).toLocaleString()}`}
                            />
                            <Typography variant="body2" sx={{ ml: 2 }}>
                                {activity.warehouseActivityData === WarehouseActivityData.DELIVERY
                                    ? `Delivered: ${activity.amount}`
                                    : `Shipped: ${activity.amountShipped}`}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography>No recent activities recorded.</Typography>
            )}
        </Paper>
    )
}