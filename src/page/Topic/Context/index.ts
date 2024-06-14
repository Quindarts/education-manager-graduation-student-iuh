import * as Yup from 'yup';


export const validationTopicSchema = Yup.object().shape({
    name: Yup.string().required('Tên đề tài không được bỏ trống'),
    quantityGroupMax: Yup.number().typeError('Trường này phải là số').min(1, 'Số lượng nhóm đăng kí phải lớn hơn 0').required("Số lượng nhóm đăng kí không được bỏ trống "),
    description: Yup.string().required("Mô tả đề tài không được trống"),
    // note: Yup.string().required("Ghi chú đề tài không được trống"),
    target: Yup.string().required("Mục tiêu đề tài không được trống"),
    standardOutput: Yup.string().required("Chuẩn đầu ra không được bỏ trống"),
    requireInput: Yup.string().required("Yêu cầu đầu vào không được bỏ trống"),
})