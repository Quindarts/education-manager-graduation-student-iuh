import * as Yup from 'yup';

export const validateSchemaLecturer = Yup.object().shape({
  username: Yup.string()
    .matches(/^\d{6,}$/, 'Mã số giảng viên phải chỉ gồm chữ số và lớn hơn 6 ký tự')
    .required('Mã số giảng viên không được để trống'),
  fullName: Yup.string()
    .matches(
      /^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\s]+$/,
      'Họ và tên chỉ bao gồm chữ cái in hoa và in thường.',
    )
    .required('Họ và tên không được để trống'),
  phone: Yup.string()
    .matches(/^0\d{9}$/, 'Số điện thoại phải bắt đầu bằng số 0 và gồm 10 chữ số')
    .required('Số điện thoại không được để trống'),
  email: Yup.string().email('Email phải hợp lệ').required('Email không được để trống'),
});
