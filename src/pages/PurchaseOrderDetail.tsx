import {useParams} from "react-router-dom";
import {CircularProgress, Divider, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import {useGetPurchaseOrderByUUID} from "../hooks/useGetPurchaseOrders.ts";

export default function PurchaseOrderDetail() {

    const { purchaseOrderUUID = "" } = useParams<{
        purchaseOrderUUID: string
    }>();

    const {
        purchaseOrder,
        isLoading: isGettingPurchaseOrderByUUID,
        isError: isErrorGetPurchaseOrderByUUID,
    } = useGetPurchaseOrderByUUID({purchaseOrderUUID});

    if (isGettingPurchaseOrderByUUID) {
        return <CircularProgress />;
    }

    if (isErrorGetPurchaseOrderByUUID) {
        return <Typography color="error">Failed to load purchase order.</Typography>;
    }

    if (!purchaseOrderUUID) {
        return <Typography color="error">Purchase Order ID is missing.</Typography>;
    }

    if (!purchaseOrder) {
        return <Typography color="error">Purchase Order data not found.</Typography>;
    }

    return (
        <Paper sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Purchase Order Details
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>PO Number:</strong> {purchaseOrder.poNumber}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Reference ID:</strong> {purchaseOrder.referenceUUID.uuid}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Customer:</strong> {purchaseOrder.customerParty.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Seller:</strong> {purchaseOrder.sellerParty.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Vessel Number:</strong> {purchaseOrder.vesselNumber}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Status:</strong> {purchaseOrder.arrived ? "Arrived" : "Not Arrived"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Total Amount:</strong> {purchaseOrder.totalAmount} tons
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mb: 1 }}>
                Order Lines
            </Typography>
            <List dense>
                {purchaseOrder.purchaseOrderLines.map((line) => (
                    <ListItem key={line.lineNumber} sx={{ pl: 0 }}>
                        <ListItemText
                            primary={`${line.quantity} ${line.uom} of ${line.description}`}
                            secondary={`Line ${line.lineNumber} - ${line.description}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}