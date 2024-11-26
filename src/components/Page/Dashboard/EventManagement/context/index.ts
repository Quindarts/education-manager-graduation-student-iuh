import * as Yup from 'yup';

export const validationEventSchema = Yup.object().shape({
    name: Yup.string()
        .required('Không được bỏ trống trường này'),
    startDate: Yup.date()
        .required('Không được bỏ trống trường này'),
    endDate: Yup.date()
        .min(Yup.ref('startDate'), 'Ngày kết thúc phải sau ngày bắt đầu')
        .required('Không được bỏ trống trường này'),
});
