import { createSlice, current } from "@reduxjs/toolkit";

const requestNewSlice = createSlice({
    name: 'requestNew',
    initialState: {
        username: [],
        noIN: [],
        tipeKalkual: [],
        namaAlat: [],
        tipeAlat: [],
        noKontrol: [],
        tahun: [],
        departemen: [],
        lokasi: [],
        tglKalkual: [],
        edKalkual: [],
        jenisKalibrasi: []
    },
    reducers: {
        insert: (state, action) => {
            state.username = action.payload.username;
            state.noIN = action.payload.noIN;
            state.tipeKalkual = action.payload.tipeKalkual;
            state.namaAlat = action.payload.namaAlat;
            state.tipeAlat = action.payload.tipeAlat;
            state.noKontrol = action.payload.noKontrol;
            state.tahun = action.payload.tahun;
            state.departemen = action.payload.departemen;
            state.lokasi = action.payload.lokasi;
            state.tglKalkual = action.payload.tglKalkual;
            state.edKalkual = action.payload.edKalkual;
            state.jenisKalibrasi = action.payload.jenisKalibrasi;
        }
    }
})

export const requestNewActions = requestNewSlice.actions;
export default requestNewSlice.reducer;