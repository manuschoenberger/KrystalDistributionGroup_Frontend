import {Box, Paper, styled} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import SecurityContextProvider from "./context/SecurityContextProvider.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import DeliveryAppointmentDetail from "./pages/DeliveryAppointmentDetail.tsx";
import PurchaseOrderDetail from "./pages/PurchaseOrderDetail.tsx";
import WarehouseDetail from "./pages/WarehouseDetail.tsx";
import Floorplan from "./pages/Floorplan.tsx";
import Header from "./comps/Header.tsx";
import RouteGuard from "./comps/RouteGuard.tsx";
import Clock from "./comps/Clock.tsx";

export default function App() {
    const queryClient = new QueryClient();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <SecurityContextProvider>
                <BrowserRouter>
                    <Header title={"KDG - Dashboard"} />
                    <Clock />
                    <Box sx={{ mt: 8, mb: 8, width: '100%' }}>
                        <Grid container spacing={3}>
                            <Grid>
                                <Item elevation={3}>
                                    <Routes>
                                        <Route
                                            path="/dashboard"
                                            element={
                                                <RouteGuard>
                                                    <Dashboard />
                                                </RouteGuard>
                                            }
                                        />
                                        <Route path="/" element={<Navigate to="/dashboard" />} />
                                        <Route
                                            path="/deliveryAppointments/:deliveryAppointmentUUID"
                                            element={
                                                <RouteGuard>
                                                    <DeliveryAppointmentDetail />
                                                </RouteGuard>
                                            }
                                        />
                                        <Route
                                            path="/purchase-orders/:purchaseOrderUUID"
                                            element={
                                                <RouteGuard>
                                                    <PurchaseOrderDetail />
                                                </RouteGuard>
                                            }
                                        />
                                        <Route
                                            path="/warehouses/floorplan"
                                            element={
                                                <RouteGuard>
                                                    <Floorplan />
                                                </RouteGuard>
                                            }
                                        />
                                        <Route
                                            path="/warehouses/:warehouseUUID"
                                            element={
                                                <RouteGuard>
                                                    <WarehouseDetail />
                                                </RouteGuard>
                                            }
                                        />
                                    </Routes>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                </BrowserRouter>
            </SecurityContextProvider>
        </QueryClientProvider>
    );
}
