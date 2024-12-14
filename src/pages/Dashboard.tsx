import {Box, Button, Grid2, Paper, Typography} from '@mui/material';
import WarehouseOverviewList from '../comps/WarehouseOverviewList';
import TruckStatusList from '../comps/TruckStatusList.tsx';
import RawMaterialList from '../comps/RawMaterialList';
import PurchaseOrderList from '../comps/PurchaseOrderList';
import DeliveryAppointmentList from '../comps/DeliveryAppointmentList';
import {useNavigate} from "react-router-dom";


export default function Dashboard() {

    const navigate = useNavigate();

    const handleNavigateToFloorplan = () => {
        navigate("/warehouses/floorplan");
    };

    return (
        <Box sx={{ width: '100%', bgcolor: '#d1d1d1' }}>
            <Grid2 container spacing={4}>
                <Grid2>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h4" gutterBottom fontWeight="bold">
                            Warehouse Overview
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNavigateToFloorplan}
                        >
                            View Floorplan
                        </Button>
                        <WarehouseOverviewList />
                    </Paper>
                </Grid2>

                <Grid2>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h4" gutterBottom fontWeight="bold">
                            Trucks Status
                        </Typography>
                        <TruckStatusList />
                    </Paper>
                </Grid2>

                <Grid2>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h4" gutterBottom fontWeight="bold">
                            Raw Material List
                        </Typography>
                        <RawMaterialList />
                    </Paper>
                </Grid2>

                <Grid2>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h4" gutterBottom fontWeight="bold">
                            Purchase Order List
                        </Typography>
                        <PurchaseOrderList />
                    </Paper>
                </Grid2>

                <Grid2>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h4" gutterBottom fontWeight="bold">
                            Delivery Appointments
                        </Typography>
                        <DeliveryAppointmentList />
                    </Paper>
                </Grid2>
            </Grid2>
        </Box>
    );
};
