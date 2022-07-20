import { Box, TextField, Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";
import { QRCodeSVG } from "qrcode.react";
import { labelActions } from '../../store/label-gen';

const QRCode = React.forwardRef((props, ref) => {
    const data = useSelector(state => state.persistedReducer.label);

    return (
        <div ref={ref}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{
                m: "auto auto", 
                backgroundColor: "rgba(0, 0, 0, 0)",
                borderRadius: 3,
                boxShadow: "0 1 4 rgba(0, 0, 0, 0.2)",
                minHeight: `calc(100vh - 48px)`
            }}>
                <QRCodeSVG
                    value={data.NoIN}
                    size={512}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={false}
                />
            </Box>
        </div>
    )
})

export default QRCode;