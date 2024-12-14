import axios from "axios";
import {DeliveryAppointment, NewDeliveryAppointment} from "../models/DeliveryAppointment.ts";
import {PurchaseOrder} from "../models/PurchaseOrder.ts";
import {WarehouseOverview} from "../models/WarehouseOverview.ts";
import {Truck} from "../models/Truck.ts";

const API_URL = import.meta.env.VITE_API_URL as string;

export async function getDeliveryAppointments() {
    const url = API_URL + "/delivery-appointment";
    const response = await axios.get<DeliveryAppointment[]>(url);

    return response.data;
}

export async function getDeliveryAppointmentByUUID(deliveryAppointmentUUID: string) {
    const url = API_URL + `/delivery-appointment/${deliveryAppointmentUUID}`;
    const response = await axios.get<DeliveryAppointment>(url);

    return response.data;
}

export async function createDeliveryAppointment(deliveryAppointment: NewDeliveryAppointment) {
    const url = API_URL + "/delivery-appointments";
    const response = await axios.post<DeliveryAppointment>(url, deliveryAppointment);

    return response.data;
}

export async function getPurchaseOrders() {
    const url = API_URL + "/purchase-order";
    const response = await axios.get<PurchaseOrder[]>(url);

    return response.data;
}

export async function getPurchaseOrderByUUID(purchaseOrderUUID: string) {
    const url = API_URL + `/purchase-order/${purchaseOrderUUID}`;
    const response = await axios.get<PurchaseOrder>(url);

    return response.data;
}

export async function getWarehouses() {
    const url = API_URL + "/warehouse";
    const response = await axios.get<WarehouseOverview[]>(url);

    return response.data;
}

export async function getWarehouseByUUID(warehouseUUID: string) {
    const url = API_URL + `/warehouse/${warehouseUUID}`;
    const response = await axios.get<WarehouseOverview>(url);

    return response.data;
}

export async function getTrucks() {
    const url = API_URL + "/site/trucks";
    const response = await axios.get<Truck[]>(url);

    return response.data;
}