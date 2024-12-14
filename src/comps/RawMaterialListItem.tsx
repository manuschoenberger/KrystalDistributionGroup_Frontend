import {ListItem, ListItemText} from "@mui/material";
import {RawMaterialData} from "../models/RawMaterialData.ts";

type Props = {
    warehouseUUID: string;
    rawMaterialData: RawMaterialData;
    amount: number;
};

function getRawMaterialDisplayName(key: string): string {
    return RawMaterialData[key as keyof typeof RawMaterialData] || key;
}

export default function RawMaterialListItem({
                                                warehouseUUID,
                                                rawMaterialData,
                                                amount,
                                            }: Props) {
    const rawMaterialDisplayName = getRawMaterialDisplayName(rawMaterialData);

    return (
        <ListItem>
            <ListItemText
                primary={`${amount} tons of ${rawMaterialDisplayName}`}
                secondary={`Warehouse ID: ${warehouseUUID}`}
            />
        </ListItem>
    );
}