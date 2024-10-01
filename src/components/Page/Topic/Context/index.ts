import * as Yup from 'yup';

export const validationTopicSchema = Yup.object().shape({
    name: Yup.string().min(5, 'Tên đề tài phải lớn hơn 5 ký tự').required('Tên đề tài không được bỏ trống'),
    quantityGroupMax: Yup.number().typeError('Trường này phải là số').min(1, 'Số lượng nhóm đăng kí phải lớn hơn 0').required("Số lượng nhóm đăng kí không được bỏ trống "),
    description: Yup.string().min(5, 'Mô tả đề tài phải lớn hơn 5 ký tự').required("Mô tả đề tài không được trống"),
    target: Yup.string().min(5, 'Mục tiêu đề tài phải lớn hơn 5 ký tự').required("Mục tiêu đề tài không được trống"),
    standardOutput: Yup.string().min(5, 'Chuẩn đầu ra đề tài phải lớn hơn 5 ký tự').required("Chuẩn đầu ra không được bỏ trống"),
    expectedResult: Yup.string().min(5, 'Dự kiến sản phẩm nghiên cứu đề tài lớn hơn 5 ký tự').required("Dự kiến sản phẩm nghiên cứu của đề tài không được bỏ trống"),
    requireInput: Yup.string().min(5, 'Yêu cầu đầu vào đề tài lớn hơn 5 ký tự').required("Yêu cầu đầu vào không được bỏ trống"),
})