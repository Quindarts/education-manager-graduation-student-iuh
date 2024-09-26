import { Row } from "exceljs";
import { EntityExportExcel } from "../../Export/Entity/EntityExportExcel";

export class ExportExcelModel extends EntityExportExcel {
    constructor(fileName: string, sheetName: string, column: any) {
        super(fileName, sheetName, column);
    }
    protected customizeCells(): void {
    }
    protected customizeColumns(): void {
    }
    protected customizeSheet(): void {
    }
}