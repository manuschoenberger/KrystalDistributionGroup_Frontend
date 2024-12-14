import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Typography variant="h6">
            {time.toLocaleTimeString()}
        </Typography>
    );
}