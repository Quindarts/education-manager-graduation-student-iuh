import TextField from '@mui/material/TextField';
import Stack, { StackProps } from '@mui/material/Stack';
import { Autocomplete } from '@mui/material';
const studentData = [
  { title: 'Lê Văn Quý', value: 21089141 },
  { title: 'Nguyễn Thị Minh', value: 21089242 },
  { title: 'Trần Văn An', value: 21089353 },
  { title: 'Phạm Thị Hồng', value: 21089464 },
  { title: 'Đỗ Ngọc Thanh', value: 21089575 },
  { title: 'Bùi Thị Nga', value: 21089686 },
  { title: 'Phan Văn Bình', value: 21089797 },
  { title: 'Vũ Thị Hương', value: 21089808 },
  { title: 'Hoàng Văn Tuấn', value: 21089919 },
  { title: 'Ngô Thị Lan', value: 21090020 },
  { title: 'Trịnh Văn Sơn', value: 21090131 },
  { title: 'Đặng Thị Mai', value: 21090242 },
  { title: 'Lý Văn Tài', value: 21090353 },
  { title: 'Chu Thị Vân', value: 21090464 },
  { title: 'Võ Thị Hồng', value: 21090575 },
  { title: 'Lê Văn Long', value: 21090686 },
  { title: 'Nguyễn Thị Xuân', value: 21090797 },
  { title: 'Trần Thị Thảo', value: 21090808 },
  { title: 'Phạm Văn Hùng', value: 21090919 },
  { title: 'Đỗ Thị Anh', value: 21091020 },
  { title: 'Bùi Văn Thanh', value: 21091131 },
  { title: 'Ngô Thị Hằng', value: 21091242 },
  { title: 'Phan Văn Sơn', value: 21091353 },
  { title: 'Vũ Thị Bích', value: 21091464 },
  { title: 'Hoàng Thị Tuyết', value: 21091575 },
  { title: 'Đặng Văn Lâm', value: 21091686 },
  { title: 'Lý Thị Nhung', value: 21091797 },
  { title: 'Chu Văn Đức', value: 21091808 },
  { title: 'Võ Thị Hoa', value: 21091919 },
  { title: 'Lê Thị Hồng', value: 21092020 },
  { title: 'Nguyễn Văn Khoa', value: 21092131 },
  { title: 'Trần Thị Lan', value: 21092242 },
  { title: 'Phạm Văn Phúc', value: 21092353 },
  { title: 'Đỗ Thị Kim', value: 21092464 },
  { title: 'Bùi Thị Mai', value: 21092575 },
  { title: 'Ngô Văn Nam', value: 21092686 },
  { title: 'Phan Thị Yến', value: 21092797 },
  { title: 'Vũ Văn Hoàng', value: 21092808 },
  { title: 'Hoàng Thị Như', value: 21092919 },
  { title: 'Đặng Thị Trang', value: 21093020 },
  { title: 'Lý Văn Hoàn', value: 21093131 },
  { title: 'Chu Thị Hạnh', value: 21093242 },
  { title: 'Võ Văn Tân', value: 21093353 },
  { title: 'Lê Thị Phương', value: 21093464 },
  { title: 'Nguyễn Văn Dũng', value: 21093575 },
  { title: 'Trần Thị Thanh', value: 21093686 },
  { title: 'Phạm Văn Bình', value: 21093797 },
  { title: 'Đỗ Thị Lan', value: 21093808 },
  { title: 'Bùi Văn Tùng', value: 21093919 },
  { title: 'Ngô Thị Thu', value: 21094020 },
  { title: 'Phan Văn Nam', value: 21094131 },
  { title: 'Vũ Thị Hà', value: 21094242 },
  { title: 'Hoàng Văn Hưng', value: 21094353 },
  { title: 'Đặng Thị Hương', value: 21094464 },
  { title: 'Lý Thị Quyên', value: 21094575 },
  { title: 'Chu Văn Toàn', value: 21094686 },
  { title: 'Võ Thị Hiền', value: 21094797 },
  { title: 'Lê Thị Dung', value: 21094808 },
  { title: 'Nguyễn Văn Hùng', value: 21094919 },
  { title: 'Trần Thị Như', value: 21095020 },
  { title: 'Phạm Văn Tuấn', value: 21095131 },
  { title: 'Đỗ Thị Thắm', value: 21095242 },
  { title: 'Bùi Văn Phong', value: 21095353 },
  { title: 'Ngô Thị Lan', value: 21095464 },
  { title: 'Phan Thị Ngọc', value: 21095575 },
  { title: 'Vũ Văn Sơn', value: 21095686 },
  { title: 'Hoàng Thị Liên', value: 21095797 },
  { title: 'Đặng Văn Nam', value: 21095808 },
  { title: 'Lý Thị Mai', value: 21095919 },
  { title: 'Chu Văn Phúc', value: 21096020 },
  { title: 'Võ Thị Tâm', value: 21096131 },
  { title: 'Lê Văn Khoa', value: 21096242 },
  { title: 'Nguyễn Thị Tuyết', value: 21096353 },
  { title: 'Trần Văn Hùng', value: 21096464 },
  { title: 'Phạm Thị Anh', value: 21096575 },
  { title: 'Đỗ Văn Bình', value: 21096686 },
  { title: 'Bùi Thị Hoa', value: 21096797 },
  { title: 'Ngô Văn Sơn', value: 21096808 },
  { title: 'Phan Thị Thảo', value: 21096919 },
  { title: 'Vũ Văn An', value: 21097020 },
  { title: 'Hoàng Thị Hằng', value: 21097131 },
  { title: 'Đặng Văn Phúc', value: 21097242 },
  { title: 'Lý Thị Tâm', value: 21097353 },
  { title: 'Chu Văn Hải', value: 21097464 },
  { title: 'Võ Thị Xuân', value: 21097575 },
  { title: 'Lê Văn Tuyết', value: 21097686 },
  { title: 'Nguyễn Thị Mai', value: 21097797 },
  { title: 'Trần Văn Long', value: 21097808 },
  { title: 'Phạm Thị Liên', value: 21097919 },
  { title: 'Đỗ Văn Hùng', value: 21098020 },
  { title: 'Bùi Thị Nga', value: 21098131 },
  { title: 'Ngô Văn Đức', value: 21098242 },
  { title: 'Phan Thị Vân', value: 21098353 },
  { title: 'Vũ Văn Hoàng', value: 21098464 },
];
interface SearchPropsType extends StackProps {
  listSearch?: [{ title: any; value: any }];
  label?: string;
}
function Search(props: SearchPropsType) {
  const { listSearch, label, id, ...rest } = props;
  return (
    <Stack {...rest} sx={{ width: 300, height: 40,bgcolor:'red' }}>
      <Autocomplete
        sx={{
          height: 40,
        }}
        freeSolo
        id={id}
        disableClearable
        options={studentData.map((option: any) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  );
}

export default Search;
