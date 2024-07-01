import * as fs from "fs";
import { Document, Packer, Paragraph, Tab, TextRun } from "docx";
import { saveAs } from 'file-saver';
import { useSnackbar } from "notistack";

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun("Hello World"),
                        new TextRun({
                            text: "Foo Bar",
                            bold: true,
                            size: 40,
                        }),
                        new TextRun({
                            children: [new Tab(), "Github is the best"],
                            bold: true,
                        }),
                    ],
                }),
            ],
        },
    ],
});
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