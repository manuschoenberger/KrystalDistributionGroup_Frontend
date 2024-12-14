import {useContext} from "react";
import SecurityContext from "../context/SecurityContext.ts";
import {useQuery} from "@tanstack/react-query";
import {getTrucks} from "../services/dataApiService.ts";

export function useGetTrucks() {
    const { isAuthenticated } = useContext(SecurityContext);

    const {
        data: trucks,
        isLoading: isGettingTrucks,
        isError: isErrorGetTrucks,
    } = useQuery({
        queryKey: ["trucks"],
        queryFn: () => getTrucks(),
        enabled: isAuthenticated,
    });

    return {
        trucks,
        isLoading: isGettingTrucks,
        isError: isErrorGetTrucks,
    }
}