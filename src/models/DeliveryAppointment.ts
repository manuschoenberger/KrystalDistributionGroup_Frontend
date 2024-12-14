import {DeliveryAppointmentStatus} from "./DeliveryAppointmentStatus.ts";
import {RawMaterialData} from "./RawMaterialData.ts";

export type DeliveryAppointment = {
    deliveryAppointmentUUID: { uuid: string };
    sellerUUID: { uuid: string };
    licensePlate: { licensePlate: string };
    payloadData: RawMaterialData;
    arrivalWindowStart: string;
    deliveryAppointmentStatus: DeliveryAppointmentStatus;
}

export type NewDeliveryAppointment = {
    sellerUUID: string;
    licensePlate: string;
    payload: string;
    arrivalWindowStart: string;
    deliveryAppointmentStatus: DeliveryAppointmentStatus;
};

export type DeliveryAppointmentFormData = Omit<NewDeliveryAppointment, "deliveryAppointmentStatus">;