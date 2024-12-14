import {CircularProgress, List, Paper, Typography} from "@mui/material";
import {useGetTrucks} from "../hooks/useGetTrucks.ts";
import {Truck} from "../models/Truck.ts";
import TruckStatusListItem from "./TruckStatusListItem.tsx";
import {TruckStatus} from "../models/TruckStatus.ts";

export default function TruckStatusList() {

    const {
        trucks,
        isLoading: isGettingTrucks,
        isError: isErrorGetTrucks,
    } = useGetTrucks();

    if (isGettingTrucks) {
        return <CircularProgress />;
    }

    if (isErrorGetTrucks) {
        return <Typography color="error">Failed to load trucks.</Typography>;
    }

    if (!trucks || trucks.length === 0) {
        return <Typography>No trucks on site.</Typography>;
    }

    const groupedTrucks = trucks?.reduce((accumulator, truck) => {
            const status = truck.truckStatus;

            if (!accumulator[status]) {
                accumulator[status] = [];
            }

            accumulator[status].push(truck);

            return accumulator;
        },
        {} as Record<string, Truck[]>
    );

    return (
        <Paper sx={{ p: 2 }}>
            {Object.entries(groupedTrucks).map(([status]) => (
                <div key={status}>
                    <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
                        {TruckStatus[status as keyof typeof TruckStatus]}
                    </Typography>
                    <List>
                        {groupedTrucks[status].map((truck: Truck) => (
                            <TruckStatusListItem
                                key={truck.truckUUID.uuid}
                                truckUUID={truck.truckUUID.uuid}
                                licensePlate={truck.licensePlate.licensePlate}
                            />
                        ))}
                    </List>
                </div>
            ))}
        </Paper>
    )
}