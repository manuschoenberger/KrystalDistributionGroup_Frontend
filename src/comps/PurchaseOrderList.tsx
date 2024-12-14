import {CircularProgress, List, Paper, Typography} from "@mui/material";
import PurchaseOrderListItem from "./PurchaseOrderListItem.tsx";
import {useGetPurchaseOrders} from "../hooks/useGetPurchaseOrders.ts";

export default function PurchaseOrderList() {

    const {
        purchaseOrders,
        isLoading: isGettingPurchaseOrders,
        isError: isErrorGetPurchaseOrders,
    } = useGetPurchaseOrders();

    if (isGettingPurchaseOrders) {
        return <CircularProgress />;
    }

    if (isErrorGetPurchaseOrders) {
        return <Typography color="error">Failed to load purchase orders.</Typography>;
    }

    if (!purchaseOrders || purchaseOrders.length === 0) {
        return <Typography>No purchase orders available.</Typography>;
    }

    return (
        <Paper sx={{ p: 2 }}>
            <List>
                {purchaseOrders?.length > 0 ? (
                    purchaseOrders.map((purchaseOrder) => (
                        <PurchaseOrderListItem
                            key={purchaseOrder.referenceUUID?.uuid}
                            referenceUUID={purchaseOrder.referenceUUID?.uuid}
                            arrived={purchaseOrder.arrived}
                            totalAmount={purchaseOrder.totalAmount}
                        />
                    ))
                ) : (
                    <Typography>No delivery appointments available.</Typography>
                )}
            </List>
        </Paper>
    )
}