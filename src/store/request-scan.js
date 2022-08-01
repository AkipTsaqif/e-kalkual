import { createSlice } from "@reduxjs/toolkit";

const requestScanSlice = createSlice({
	name: "requestScan",
	initialState: {
		NamaAlat: "",
		TipeAlat: "",
		NoKontrol: "",
		Departemen: "",
		Lokasi: "",
		TglKalkual: "",
		EDKalkual: "",
		JenisKalkual: "",
	},
	reducers: {
		addRequest: (state, action) => {
			state.NamaAlat = action.payload.Nama;
			state.TipeAlat = action.payload.Tipe;
			state.NoKontrol = action.payload.NoKontrol;
			state.Departemen = action.payload.Departemen;
			state.Lokasi = action.payload.Lokasi;
			state.TglKalkual = action.payload.TglKalkual;
			state.EDKalkual = action.payload.EDKalkual;
			state.JenisKalkual = action.payload.JenisKalkual;
		},
		clearRequest: (state, action) => {
			state.NamaAlat = "";
			state.TipeAlat = "";
			state.NoKontrol = "";
			state.Departemen = "";
			state.Lokasi = "";
			state.TglKalkual = "";
			state.EDKalkual = "";
			state.JenisKalkual = "";
		},
	},
});

export const requestScanActions = requestScanSlice.actions;
export default requestScanSlice.reducer;
