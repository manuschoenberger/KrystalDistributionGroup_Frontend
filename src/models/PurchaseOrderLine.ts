import {RawMaterialData} from "./RawMaterialData.ts";

export type PurchaseOrderLine = {
    lineNumber: number;
    materialData: RawMaterialData;
    description: string;
    quantity: number;
    uom: string;
};