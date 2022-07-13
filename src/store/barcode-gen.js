import { createSlice } from "@reduxjs/toolkit";

const barcodeSlice = createSlice({
    name: "barcode",
    initialState: {
        NoIN: "",
        TipeKalkual: "",
        NamaAlat: "",
        NoKontrol: "",
        Lokasi: "",
        TglKalkual: "",
        EDKalkual: "",
        Approvee: "",
        Approver: "",
        TglApprove: ""
    },
    reducers: {
        generateBarcode: (state, action) => {
            state.TipeKalkual = action.payload.TipeKalkual;
            state.NamaAlat = action.payload.Nama;
            state.NoKontrol = action.payload.NoKontrol;
            state.Lokasi = action.payload.Lokasi;
            state.TglKalkual = action.payload.TglKalkual;
            state.EDKalkual = action.payload.EDKalkual;
            state.Approvee = action.payload.Approvee;
            state.Approver = action.payload.Approver;
            state.TglApprove = action.payload.TglApprove;
        }
    }
});

export const barcodeActions = barcodeSlice.actions;
export default barcodeSlice.reducer;
