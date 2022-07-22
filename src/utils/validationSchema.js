import * as yup from 'yup';

export const approvalSchema = yup.object({
    vendor: yup
        .string('Masukkan vendor pengerjaan')
        .required('Masukkan vendor pengerjaan'),
    biaya: yup
        .string('Masukkan biaya pengeluaran')
        .required('Masukkan biaya pengeluaran'),
    fileTerpilih: yup
        .string('Harap tambahkan terlebih dahulu file tersebut dengan menekan tombol ADD')
        .required('Harap tambahkan terlebih dahulu file tersebut dengan menekan tombol ADD')
})