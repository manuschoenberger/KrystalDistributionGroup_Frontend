import {useParams} from "react-router-dom";
import {CircularProgress, Divider, Paper, Typography} from "@mui/material";
import {useGetDeliveryAppointmentByUUID} from "../hooks/useGetDeliveryAppointment.ts";
import {DeliveryAppointmentStatus} from "../models/DeliveryAppointmentStatus.ts";

export default function DeliveryAppointmentDetail() {

    const { deliveryAppointmentUUID = "" } = useParams<{
        deliveryAppointmentUUID: string
    }>();

    const {
        deliveryAppointment,
        isLoading: isGettingDeliveryAppointmentByUUID,
        isError: isErrorGetDeliveryAppointmentByUUID,
    } = useGetDeliveryAppointmentByUUID({deliveryAppointmentUUID});

    if (isGettingDeliveryAppointmentByUUID) {
        return <CircularProgress />;
    }

    if (isErrorGetDeliveryAppointmentByUUID) {
        return <Typography color="error">Failed to load delivery appointment.</Typography>;
    }

    if (!deliveryAppointmentUUID) {
        return <Typography color="error">Delivery Appointment ID is missing.</Typography>;
    }

    if (!deliveryAppointment) {
        return <Typography color="error">Delivery Appointment data not found.</Typography>;
    }

    return (
        <Paper sx={{ p: 3, maxWidth: 600, margin: "0 auto" }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Delivery Appointment Details
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Delivery Appointment ID:</strong> {deliveryAppointment.deliveryAppointmentUUID.uuid}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Seller ID:</strong> {deliveryAppointment.sellerUUID.uuid}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>License Plate:</strong> {deliveryAppointment.licensePlate.licensePlate}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Payload:</strong> {deliveryAppointment.payloadData}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Arrival Window Start:</strong> {new Date(deliveryAppointment.arrivalWindowStart).toLocaleString()}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Status:</strong> {DeliveryAppointmentStatus[deliveryAppointment.deliveryAppointmentStatus]}
            </Typography>
        </Paper>
    )
}