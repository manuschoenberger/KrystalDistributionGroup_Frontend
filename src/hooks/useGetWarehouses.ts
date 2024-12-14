import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import SecurityContext from "../context/SecurityContext";
import {getWarehouseByUUID, getWarehouses} from "../services/dataApiService.ts";

type GetByUUIDProps = {
  warehouseUUID: string;
};


export function useGetWarehouses() {
  const { isAuthenticated } = useContext(SecurityContext);

  const {
    data: warehouses,
    isLoading: isGettingWarehouses,
    isError: isErrorGetWarehouses,
  } = useQuery({
    queryKey: ["warehouse"],
    queryFn: () => getWarehouses(),
    enabled: isAuthenticated,
  });

  return {
    warehouses,
    isLoading: isGettingWarehouses,
    isError: isErrorGetWarehouses,
  }
}

export function useGetWarehouseByUUID({ warehouseUUID }: GetByUUIDProps) {
  const { isAuthenticated } = useContext(SecurityContext);

  const {
    data: warehouse,
    isLoading: isGettingWarehousesByUUID,
    isError: isErrorGetWarehousesByUUID,
  } = useQuery({
    queryKey: ["warehouseUUID", warehouseUUID],
    queryFn: () => getWarehouseByUUID(warehouseUUID),
    enabled: isAuthenticated,
  });

  return {
    warehouse,
    isLoading: isGettingWarehousesByUUID,
    isError: isErrorGetWarehousesByUUID,
  };
}
