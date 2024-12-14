import {DeliveryAppointmentStatus} from "../models/DeliveryAppointmentStatus.ts";
import {Link} from "react-router-dom";
import {Chip, ListItem, ListItemText} from "@mui/material";

type Props = {
    deliveryAppointmentUUID: string;
    arrivalWindowStart: string;
    deliveryAppointmentStatus: DeliveryAppointmentStatus;
}

export default function DeliveryAppointmentListItem({deliveryAppointmentUUID, arrivalWindowStart, deliveryAppointmentStatus}: Props) {
    let statusColor: 'default' | 'warning' | 'success';

    switch (deliveryAppointmentStatus) {
        case DeliveryAppointmentStatus.PLANNED:
            statusColor = 'warning';
            break;
        case DeliveryAppointmentStatus.ARRIVED:
            statusColor = 'success';
            break;
        default:
            statusColor = 'default';
    }

    const formattedArrivalWindowStart = new Date(arrivalWindowStart).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <Link to={`/deliveryAppointments/${deliveryAppointmentUUID}`}>
            <ListItem>
                <ListItemText
                    primary={`Arrival Window Start: ${formattedArrivalWindowStart}`}
                    secondary={`Appointment ID: ${deliveryAppointmentUUID}`}
                />
                <Chip
                    label={deliveryAppointmentStatus}
                    color={statusColor}
                    sx={{ ml: 6 }}
                />
            </ListItem>
        </Link>
    )
}