import * as yup from 'yup';

export const approvalSchema = yup.object({
    vendor: yup
        .string('Masukkan vendor pengerjaan')
        .required('Masukkan vendor pengerjaan'),
    biaya: yup
        .string('Masukkan biaya pengeluaran')
        .required('Masukkan biaya pengeluaran')
})