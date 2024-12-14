import {Chip, ListItem, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";

type Props = {
    referenceUUID: string;
    arrived: boolean;
    totalAmount: number;
}

export default function PurchaseOrderListItem({
    referenceUUID,
    arrived,
    totalAmount
}: Props) {

    const statusColor: 'default' | 'warning' | 'success' = arrived ? 'success' : 'warning';

    return (
        <Link to={`/purchase-orders/${referenceUUID}`}>
            <ListItem>
                <ListItemText
                    primary={`Total Amount: $${totalAmount.toFixed(2)}`}
                    secondary={`Purchase Order ID: ${referenceUUID}`}
                />
                <Chip
                    label={arrived ? 'Arrived' : 'Not Arrived'}
                    color={statusColor}
                    sx={{ ml: 6 }}
                />
            </ListItem>
        </Link>
    );
}