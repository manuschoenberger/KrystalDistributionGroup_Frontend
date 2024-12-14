import {useContext} from "react";
import SecurityContext from "../context/SecurityContext.ts";
import {useQuery} from "@tanstack/react-query";
import {getPurchaseOrderByUUID, getPurchaseOrders} from "../services/dataApiService.ts";

type GetByUUIDProps = {
    purchaseOrderUUID: string;
};

export function useGetPurchaseOrders() {
    const { isAuthenticated } = useContext(SecurityContext);

    const {
        data: purchaseOrders,
        isLoading: isGettingPurchaseOrders,
        isError: isErrorGetPurchaseOrders,
    } = useQuery({
        queryKey: ["purchase-order"],
        queryFn: () => getPurchaseOrders(),
        enabled: isAuthenticated,
    });

    return {
        purchaseOrders,
        isLoading: isGettingPurchaseOrders,
        isError: isErrorGetPurchaseOrders,
    }
}

export function useGetPurchaseOrderByUUID({ purchaseOrderUUID }: GetByUUIDProps) {
    const { isAuthenticated } = useContext(SecurityContext);

    const {
        data: purchaseOrder,
        isLoading: isGettingPurchaseOrderByUUID,
        isError: isErrorGetPurchaseOrderByUUID,
    } = useQuery({
        queryKey: ["purchaseOrder"],
        queryFn: () => getPurchaseOrderByUUID(purchaseOrderUUID),
        enabled: isAuthenticated,
    });

    return {
        purchaseOrder,
        isLoading: isGettingPurchaseOrderByUUID,
        isError: isErrorGetPurchaseOrderByUUID,
    }
}