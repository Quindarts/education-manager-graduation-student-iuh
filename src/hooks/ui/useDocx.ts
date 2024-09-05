import {  Packer} from "docx";
import { saveAs } from 'file-saver';
import { useSnackbar } from "notistack";

const useDocx = () => {
    const { enqueueSnackbar } = useSnackbar()
    const onExportDocxFile = async (fileName: string, docxToExport: any) => {
        try {
            const packer = await Packer.toBlob(docxToExport);
            saveAs(packer, `${fileName}`);
            enqueueSnackbar('Xuất File thành công', { variant: 'success' })
            
        } catch (error) {
            enqueueSnackbar('Xuất File thất bại, vui lòng thử lại.', { variant: 'error' })
        }
    }
    return { onExportDocxFile }
}
export default useDocx;