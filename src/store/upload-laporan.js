import { createSlice, current } from "@reduxjs/toolkit";

const uploadLaporanSlice = createSlice({
	name: "uploadLaporan",
	initialState: {
		username: "",
		NoIN: "",
		TipeKalkual: "",
		NamaAlat: "",
		TipeAlat: "",
		NoKontrol: "",
		Departemen: "",
		Lokasi: "",
		TglKalkual: "",
		EDKalkual: "",
		JenisKalkual: "",
		Jenis: "",
	},
	reducers: {
		inputLaporan: (state, action) => {
			state.NoIN = action.payload.NoIN;
			state.TipeKalkual = action.payload.TipeKalkual;
			state.NamaAlat = action.payload.Nama;
			state.TipeAlat = action.payload.Tipe;
			state.NoKontrol = action.payload.NoKontrol;
			state.Departemen = action.payload.Departemen;
			state.Lokasi = action.payload.Lokasi;
			state.TglKalkual = action.payload.TglKalkual;
			state.EDKalkual = action.payload.EDKalkual;
			state.JenisKalkual = action.payload.JenisKalkual;
			state.Jenis = action.payload.Jenis;
		},
		cancelLaporan: () => uploadLaporanSlice.initialState,
	},
});

export const uploadLaporanActions = uploadLaporanSlice.actions;
export default uploadLaporanSlice.reducer;
