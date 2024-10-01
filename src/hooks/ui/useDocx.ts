import { Packer } from "docx";
import { saveAs } from 'file-saver';
import JSZip from "jszip";
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
    const onExportMultiDocxFiles = async (fileName: string, folderName: string, files: any) => {
        try {
            //TODO: init zip
            const zip = new JSZip();
            const folder = zip.folder(folderName);
            //TODO: => to binary file
            const resolvedfiles = await files;
            await Promise.all(
                resolvedfiles.map(async (file: any) => {
                    const blob = await Packer.toBlob(file.doc);
                    const fileName = `${file.fileName}.docx`;
                    folder.file(fileName, blob);
                })
            );
            const zipBlob = await zip.generateAsync({ type: "blob" });
            saveAs(zipBlob, `${fileName}.zip`);
            return true
        } catch (error) {
            enqueueSnackbar('Xuất File thất bại, vui lòng thử lại.', { variant: 'error' })
        }
    }
    return { onExportDocxFile, onExportMultiDocxFiles }
}
export default useDocx;