import * as Yup from 'yup';

export const validationEventSchema = Yup.object().shape({
    name: Yup.string()
        .required('Không được bỏ trống trường này'),
    endDate: Yup.date()
        .required('Không được bỏ trống trường này'),
});
