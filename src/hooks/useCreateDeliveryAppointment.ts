import {useMutation, useQueryClient} from "@tanstack/react-query";
import {NewDeliveryAppointment} from "../models/DeliveryAppointment.ts";
import {createDeliveryAppointment} from "../services/dataApiService.ts";

export function useCreateDeliveryAppointment() {
    const queryClient = useQueryClient();

    const {
        mutateAsync,
        isPending: isCreatingDeliveryAppointment,
        isError: isErrorCreateDeliveryAppointment,
    } = useMutation({
        mutationFn: (deliveryAppointment: NewDeliveryAppointment) => createDeliveryAppointment(deliveryAppointment),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["deliveryAppointments"],
            }).then(r => console.log(r));
        },
    });

    return {
        createDeliveryAppointment: mutateAsync,
        isLoading: isCreatingDeliveryAppointment,
        isError: isErrorCreateDeliveryAppointment,
    };
}