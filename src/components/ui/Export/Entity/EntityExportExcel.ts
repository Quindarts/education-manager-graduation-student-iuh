import { Row, Workbook, Worksheet } from "exceljs";
import FileSaver from "file-saver";


export abstract class EntityExportExcel {
    protected sheetName: string;
    protected fileName: string;
    protected column: string[]
    protected workBook: Workbook;
    protected sheet: Worksheet;
    constructor(fileName: string, sheetName: string, column: any) {
        this.sheetName = sheetName;
        this.fileName = fileName;
        this.column = column;
        this.workBook = new Workbook()
        this.sheet = this.workBook.addWorksheet(this.sheetName);
        this.sheet.columns = this.column;
    }
    public async onExport() {
        try {
            let data = await this.workBook.xlsx.writeBuffer()
            const container = new Blob([data], { type: "application/octet-stream" })
            FileSaver.saveAs(container, this.fileName + '.xlsx');
            return
        } catch (error) {
        }
    }
    public getSheet = (): Worksheet => {
        return this.sheet
    }
    public setData = (data: any) => {
        data.map((value: any) => {
            this.sheet.addRow(value)
        })
    }
    protected abstract customizeSheet(): void;
    protected abstract customizeColumns(): void;
    protected abstract customizeCells(): void;
}