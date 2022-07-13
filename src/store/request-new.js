import { createSlice, current } from "@reduxjs/toolkit";
import DateFnsAdapter from '@date-io/date-fns';
import parseISO from "date-fns/parseISO";
import { format } from "date-fns";
import idLocale from 'date-fns/locale/id';

const locale = 'id';
    const localeMap = {
        id: idLocale
    }

const dateFns = new DateFnsAdapter({ locale: localeMap.id });

const requestNewSlice = createSlice({
    name: 'requestNew',
    initialState: {
        Username: "",
        NoIN: "",
        TipeKalkual: "",
        NamaAlat: "",
        TipeAlat: "",
        NoKontrol: "",
        Tahun: "",
        Departemen: "",
        Lokasi: "",
        TglKalkual: format(new Date(), 'dd/MM/yyyy'),
        Periode: "0",
        EDKalkual: "",
        JenisKalkual: ""
    },
    reducers: {
        saveRequest: (state, action) => {
            console.log(action.payload.TglKalkual);
            console.log(action.payload.EDKalkual);
            state.Username = action.payload.Username;
            state.NoIN = action.payload.NoIN;
            state.TipeKalkual = action.payload.TipeKalkual;
            state.NamaAlat = action.payload.Nama;
            state.TipeAlat = action.payload.Tipe;
            state.NoKontrol = action.payload.NoKontrol;
            state.Tahun = action.payload.TahunPembelian;
            state.Departemen = action.payload.Departemen;
            state.Lokasi = action.payload.Lokasi;
            state.TglKalkual = action.payload.TglKalkual;
            state.Periode = action.payload.Periode;
            // state.EDKalkual = dateFns.addMonths(action.payload.TglKalkual, action.payload.Periode);
            state.EDKalkual = action.payload.EDKalkual;
            state.JenisKalkual = action.payload.JenisKalkual;
            console.log(action.payload);
            // console.log(Object.keys(action.payload));
            console.log("tgl kalkual stlh bbrp saat: " + action.payload.TglKalkual);
            console.log("tgl kalkual stringify: " + JSON.stringify(action.payload).TglKalkual);
        },
        removeRequest: (state, action) => {
            state.Username = "";
            state.NoIN = "";
            state.TipeKalkual = "";
            state.NamaAlat = "";
            state.TipeAlat = "";
            state.NoKontrol = "";
            state.Tahun = "";
            state.Departemen = "";
            state.Lokasi = "";
            state.TglKalkual = "";
            state.Periode = "";
            state.EDKalkual = "";
            state.JenisKalkual = "";
        },
        calcEndDate: (state, action) => {
            console.log(action.payload);
            state.TglKalkual = action.payload.TglKalkual;
            state.Periode = action.payload.Periode;
            state.EDKalkual = dateFns.addMonths(parseISO(action.payload.TglKalkual), action.payload.Periode);
        }
    }
})

console.log(requestNewSlice);

export const requestNewActions = requestNewSlice.actions;
export default requestNewSlice.reducer;