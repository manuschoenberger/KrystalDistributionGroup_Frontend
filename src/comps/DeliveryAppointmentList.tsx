import {Button, CircularProgress, List, Paper, TextField, Typography} from "@mui/material";
import DeliveryAppointmentListItem from "./DeliveryAppointmentListItem.tsx";
import {useGetDeliveryAppointments} from "../hooks/useGetDeliveryAppointment.ts";
import {
    DeliveryAppointment,
    DeliveryAppointmentFormData,
    NewDeliveryAppointment
} from "../models/DeliveryAppointment.ts";
import {useState} from "react";
import {useCreateDeliveryAppointment} from "../hooks/useCreateDeliveryAppointment.ts";
import {DeliveryAppointmentStatus} from "../models/DeliveryAppointmentStatus.ts";
import DeliveryAppointmentForm from "./DeliveryAppointmentForm.tsx";

export default function DeliveryAppointmentList() {

    const {
        deliveryAppointments,
        isLoading: isGettingDeliveryAppointments,
        isError: isErrorGetDeliveryAppointments,
    } = useGetDeliveryAppointments();

    const {
        createDeliveryAppointment,
        isLoading: isCreatingDeliveryAppointment,
        isError: isErrorCreateDeliveryAppointment,
    } = useCreateDeliveryAppointment();

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().slice(0, 10)
    );

    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isGettingDeliveryAppointments) {
        return <CircularProgress />;
    }

    if (isErrorGetDeliveryAppointments) {
        return <Typography color="error">Failed to load delivery appointments.</Typography>;
    }

    if (!deliveryAppointments || deliveryAppointments.length === 0) {
        return <Typography>No appointments available.</Typography>;
    }

    if (isCreatingDeliveryAppointment) {
        return <CircularProgress />;
    }

    if (isErrorCreateDeliveryAppointment) {
        return <Typography color="error">Failed to create delivery appointment.</Typography>;
    }

    const formatDate = (date: string | Date) => {
        if (date instanceof Date) {
            return date.toISOString().slice(0, 10);
        }

        return date.slice(0, 10);
    };

    const filteredDeliveryAppointments = deliveryAppointments?.filter(
        (deliveryAppointment) =>
            formatDate(deliveryAppointment.arrivalWindowStart) === selectedDate
    ) || [];

    function toggleModal() {
        setIsModalOpen((prev) => !prev);
    }

    async function handleCreateDeliveryAppointment(deliveryAppointment: DeliveryAppointmentFormData) {
        const newDeliveryAppointment: NewDeliveryAppointment = {
            ...deliveryAppointment,
            deliveryAppointmentStatus: DeliveryAppointmentStatus.PLANNED,
        };

        const response = await createDeliveryAppointment(newDeliveryAppointment);

        const successMessage = `Delivery Appointment created successfully! Warehouse Number: ${JSON.stringify(
            response
        )}`;

        alert(successMessage);

        toggleModal();
    }

    function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSelectedDate(e.target.value);
    }

    return (
        <Paper sx={{ p: 2 }}>
            <TextField
                label="Filter by Date"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                fullWidth
                margin="dense"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button onClick={toggleModal} variant="contained" color="primary" sx={{ my: 2 }}>
                Create Delivery Appointment
            </Button>
            <List>
                {filteredDeliveryAppointments?.length > 0 ? (
                    filteredDeliveryAppointments.map((deliveryAppointment: DeliveryAppointment) => (
                        <DeliveryAppointmentListItem
                            key={deliveryAppointment.deliveryAppointmentUUID?.uuid}
                            deliveryAppointmentUUID={deliveryAppointment.deliveryAppointmentUUID?.uuid}
                            arrivalWindowStart={deliveryAppointment.arrivalWindowStart}
                            deliveryAppointmentStatus={deliveryAppointment.deliveryAppointmentStatus}
                        />
                    ))
                ) : (
                    <Typography>No delivery appointments available.</Typography>
                )}
            </List>

            {isModalOpen && (
                <DeliveryAppointmentForm
                    isModalOpen={isModalOpen}
                    toggleModal={toggleModal}
                    handleCreateDeliveryAppointment={handleCreateDeliveryAppointment}
                />
            )}
        </Paper>
    )
}