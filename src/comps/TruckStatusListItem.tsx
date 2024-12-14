import {ListItem, ListItemText} from "@mui/material";

type Props = {
    truckUUID: string;
    licensePlate: string;
};

export default function TruckStatusListItem({
                                                truckUUID,
                                                licensePlate,
                                            }: Props) {
    return (
        <ListItem>
            <ListItemText
                primary={`Truck: ${licensePlate}`}
                secondary={`Truck ID: ${truckUUID}`}
            />
        </ListItem>
    )
}