import {useState} from "react";
import {DeliveryAppointmentFormData} from "../models/DeliveryAppointment.ts";
import {RawMaterialData} from "../models/RawMaterialData.ts";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    TextField
} from "@mui/material";

type Props = {
    isModalOpen: boolean;
    toggleModal: () => void;
    handleCreateDeliveryAppointment: (deliveryAppointment: DeliveryAppointmentFormData) => void;
};

export default function AppointmentForm({
                                            isModalOpen,
                                            toggleModal,
                                            handleCreateDeliveryAppointment,
                                        }: Props) {
    const [deliveryAppointmentFormData, setDeliveryAppointmentFormData] =
        useState<DeliveryAppointmentFormData>({
            sellerUUID: "",
            licensePlate: "",
            payload: RawMaterialData.GYPSUM,
            arrivalWindowStart: "",
        });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setDeliveryAppointmentFormData({
            ...deliveryAppointmentFormData,
            [name]: value,
        });
    }

    function handleSelectChange(event: SelectChangeEvent<string>) {
        const { name, value } = event.target;

        setDeliveryAppointmentFormData({
            ...deliveryAppointmentFormData,
            [name]: value,
        });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        handleCreateDeliveryAppointment(deliveryAppointmentFormData);
    }

    return (
        <Dialog open={isModalOpen} onClose={toggleModal}>
            <DialogTitle>Create Delivery Appointment</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Seller UUID"
                        name="sellerUUID"
                        value={deliveryAppointmentFormData.sellerUUID}
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                        required
                    />
                    <TextField
                        label="License Plate"
                        name="licensePlate"
                        value={deliveryAppointmentFormData.licensePlate}
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                        required
                    />
                    <TextField
                        label="Arrival Window Start"
                        name="arrivalWindowStart"
                        type="datetime-local"
                        value={deliveryAppointmentFormData.arrivalWindowStart}
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <FormControl fullWidth margin="dense" required>
                        <InputLabel>Payload</InputLabel>
                        <Select
                            name="payload"
                            value={deliveryAppointmentFormData.payload}
                            onChange={handleSelectChange}
                            label="PayloadData"
                        >
                            {Object.values(RawMaterialData).map((material) => (
                                <MenuItem key={material} value={material}>
                                    {material}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleModal} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" type="submit">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}


