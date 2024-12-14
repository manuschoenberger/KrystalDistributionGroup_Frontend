import {useGetWarehouses} from "../hooks/useGetWarehouses.ts";
import {
    Box,
    CircularProgress,
    Paper,
    Typography,
    Grid2,
    MenuItem,
    Select,
    InputLabel,
    FormControl, SelectChangeEvent
} from "@mui/material";
import {CAPACITY, WarehouseOverview} from "../models/WarehouseOverview.ts";
import {useState} from "react";
import {RawMaterialData} from "../models/RawMaterialData.ts";

export default function Floorplan() {

    const {
        warehouses,
        isLoading: isGettingWarehouses,
        isError: isErrorGetWarehouses,
    } = useGetWarehouses();

    const [selectedSeller, setSelectedSeller] = useState<string>("");

    if (isGettingWarehouses) {
        return <CircularProgress />;
    }

    if (isErrorGetWarehouses) {
        return <Typography color="error">Failed to load warehouses.</Typography>;
    }

    if (!warehouses || warehouses.length === 0) {
        return <Typography>No warehouses available.</Typography>;
    }

    const sellerUUIDs = Array.from(
        new Set(warehouses.map((warehouse) => warehouse.sellerUUID.uuid))
    );

    const handleSellerChange = (event: SelectChangeEvent<string>) => {
        setSelectedSeller(event.target.value);
    };

    const getBackgroundColor = (amount: number, isHighlighted: boolean) => {
        const fillPercentage = amount / CAPACITY;
        if (fillPercentage > 0.8) return isHighlighted ? "red" : "#f5f5f5";
        if (fillPercentage > 0.5) return isHighlighted ? "orange" : "#f5f5f5";
        if (fillPercentage > 0.3) return isHighlighted ? "yellow" : "#f5f5f5";
        return isHighlighted ? "green" : "#f5f5f5";
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Warehouse Floorplan
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Seller</InputLabel>
                <Select value={selectedSeller} onChange={handleSellerChange} label="Select Seller">
                    <MenuItem value="">
                        <em>All Sellers</em>
                    </MenuItem>
                    {sellerUUIDs.map((sellerUUID) => (
                        <MenuItem key={sellerUUID} value={sellerUUID}>
                            {sellerUUID}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Grid2 container spacing={2}>
                {warehouses.map((warehouse: WarehouseOverview) => {
                    const isHighlighted = !selectedSeller || warehouse.sellerUUID.uuid === selectedSeller;

                    return (
                        <Grid2 key={warehouse.warehouseUUID.uuid}>
                            <Paper
                                sx={{
                                    padding: 2,
                                    backgroundColor: getBackgroundColor(warehouse.amount, isHighlighted),
                                    color: isHighlighted ? "#fff" : "#aaa",
                                    opacity: isHighlighted ? 1 : 0.6,
                                }}
                            >
                                <Typography variant="h6">Warehouse #{warehouse.warehouseNumber}</Typography>
                                <Typography>Material: {RawMaterialData[warehouse.rawMaterialData]}</Typography>
                                <Typography>Amount: {warehouse.amount} / {CAPACITY}</Typography>
                            </Paper>
                        </Grid2>
                    );
                })}
            </Grid2>
        </Box>
    )
}