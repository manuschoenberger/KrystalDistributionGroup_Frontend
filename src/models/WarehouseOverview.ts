import { ActivityWindow } from "./ActivityWindow.ts";
import {RawMaterialData} from "./RawMaterialData.ts";

export type WarehouseOverview = {
  warehouseUUID: { uuid: string };
  warehouseNumber: number;
  rawMaterialData: RawMaterialData;
  sellerUUID: { uuid: string };
  activityWindow: ActivityWindow;
  amount: number;
};

export const CAPACITY = 500000;
