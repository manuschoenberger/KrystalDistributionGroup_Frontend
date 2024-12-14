import {useContext} from "react";
import SecurityContext from "../context/SecurityContext.ts";
import {useQuery} from "@tanstack/react-query";
import {getDeliveryAppointmentByUUID, getDeliveryAppointments} from "../services/dataApiService.ts";

type GetByUUIDProps = {
    deliveryAppointmentUUID: string;
};

export function useGetDeliveryAppointments() {
    const { isAuthenticated } = useContext(SecurityContext);

    const {
        data: deliveryAppointments,
        isLoading: isGettingDeliveryAppointments,
        isError: isErrorGetDeliveryAppointments,
    } = useQuery({
        queryKey: ["deliveryAppointments"],
        queryFn: () => getDeliveryAppointments(),
        enabled: isAuthenticated,
    });

    return {
        deliveryAppointments,
        isLoading: isGettingDeliveryAppointments,
        isError: isErrorGetDeliveryAppointments,
    }
}

export function useGetDeliveryAppointmentByUUID({ deliveryAppointmentUUID }: GetByUUIDProps) {
    const { isAuthenticated } = useContext(SecurityContext);

    const {
        data: deliveryAppointment,
        isLoading: isGettingDeliveryAppointmentByUUID,
        isError: isErrorGetDeliveryAppointmentByUUID,
    } = useQuery({
        queryKey: ["deliveryAppointment"],
        queryFn: () => getDeliveryAppointmentByUUID(deliveryAppointmentUUID),
        enabled: isAuthenticated,
    });

    return {
        deliveryAppointment,
        isLoading: isGettingDeliveryAppointmentByUUID,
        isError: isErrorGetDeliveryAppointmentByUUID,
    }
}