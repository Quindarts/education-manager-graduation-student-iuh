import * as Yup from 'yup';

export const validationEventSchema = Yup.object().shape({
    name: Yup.string()
        .required('Không được bỏ trống trường này'),
    deadline: Yup.date()
        .required('Không được bỏ trống trường này'),
});
