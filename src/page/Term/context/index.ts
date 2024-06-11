import * as Yup from 'yup';

export const validationTermSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^HK\d_\d{4}-\d{4}$/, 'Tên học kì không hợp lệ. Ví dụ hợp lệ: HK1_2023-2024')
        .required('Không được bỏ trống trường này'),
    startDate: Yup.date()
        // .max(new Date(), 'Ngày bắt đầu phải bé hơn hoặc bằng ngày hiện tại')
        .required('Không được bỏ trống trường này'),
    endDate: Yup.date()
        .min(Yup.ref('startDate'), 'Ngày kết thúc phải sau ngày bắt đầu')
        .required('Không được bỏ trống trường này'),
});
export const validationTermGroupSchema = Yup.object().shape({
    startDate: Yup.date()
        // .max(new Date(), 'Ngày bắt đầu phải bé hơn hoặc bằng ngày hiện tại')
        .required('Không được bỏ trống trường này'),
    endDate: Yup.date()
        .min(Yup.ref('startDate'), 'Ngày kết thúc phải sau ngày bắt đầu')
        .required('Không được bỏ trống trường này'),
});
