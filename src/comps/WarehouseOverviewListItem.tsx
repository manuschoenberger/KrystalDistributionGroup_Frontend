import {Chip, ListItem, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";
import {RawMaterialData} from "../models/RawMaterialData.ts";

type Props = {
    warehouseUUID: string;
    warehouseNumber: number;
    rawMaterialData: RawMaterialData;
    amount: number;
};

function getWarehouseOverviewDisplayName(key: string): string {
    return RawMaterialData[key as keyof typeof RawMaterialData] || key;
}

export default function WarehouseOverviewListItem({
                                                warehouseUUID,
                                                warehouseNumber,
                                                rawMaterialData,
                                                amount,
                                            }: Props) {
    const warehouseOverviewDisplayName = getWarehouseOverviewDisplayName(rawMaterialData);

    return (
        <Link to={`/warehouses/${warehouseUUID}`}>
            <ListItem>
                <ListItemText
                    primary={`${amount} tons of ${warehouseOverviewDisplayName}`}
                    secondary={`Warehouse ID: ${warehouseUUID}`}
                />
                <Chip
                    label={`Warehouse ${warehouseNumber}`}
                    sx={{ ml: 4 }}
                />
            </ListItem>
        </Link>
    );
}