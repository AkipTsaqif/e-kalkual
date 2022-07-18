import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QrReader } from "react-qr-reader";
import { format, parseISO } from "date-fns";
import { requestScanActions } from "../../../store/request-scan";
import { labelActions } from '../../../store/label-gen';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Navbar from "../../Layout/Navbar";

const DUMMY_MESIN = [
    {
        value: "CRT",
        label: "Cartoning"
    },
    {
        value: "DMR",
        label: "Drum Mixer"
    },
    {
        value: "GRN",
        label: "Granulator"
    },
    {
        value: "STN",
        label: "Storage Tank"
    },
    {
        value: "WRP",
        label: "Wrapping"
    },
]

const ReqScanUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [alatMesin, setAlatMesin] = useState("");
    const [data, setData] = useState();

    const theme = createTheme({
        typography: {
            h5: {
                fontWeight: "bold",
                color: "white",
                letterSpacing: 0,
                textAlign: "center"
            },
            h6: {
                letterSpacing: 0
            }
        }
    });

    const alatMesinChangeHandler = (e) => {
        setAlatMesin(e.target.value);
    }

    const scanHandler = async (scannedData) => {
        console.log(scannedData);
        const response = await axios.post("https://localhost:44375/api/kalkual", {
            Option: "Get Scanned Data",
            RequestID: scannedData[0]
        }).then(resp => {
            let parsedData = JSON.parse(resp.data);
            console.log(parsedData);
            dispatch(labelActions.generateLabel(...parsedData));
            // setData(...parsedData);
            if (parsedData[0].Jenis === "Kalibrasi")
                navigate("/label/kalibrasi")
            else if (parsedData[0].Jenis === "Kualifikasi")
                navigate("/label/kualifikasi")
        })
    }

    return (
        <Navbar>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{
                m: "auto auto", 
                backgroundColor: "rgba(0, 0, 0, 0)",
                borderRadius: 3,
                boxShadow: "0 1 4 rgba(0, 0, 0, 0.2)",
                minHeight: `calc(100vh - 48px)`
            }}>
                <Box border={1} sx={{ 
                    borderWidth: 5, 
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    borderColor: "rgba(220, 220, 220, 0.8)",
                    boxShadow: 5
                }}>
                <QrReader onResult={(res, err) => {
                    if (!!res) {
                        const split = res.text.split("-");
                        scanHandler(split);
                    }
                }} containerStyle={{ width: "600px" }}/>
                </Box>
            </Box>
        </Navbar>
    )
}

export default ReqScanUser;