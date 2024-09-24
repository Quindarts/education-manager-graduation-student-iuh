import { Row, Workbook, Worksheet } from "exceljs";
import FileSaver from "file-saver";


export abstract class EntityExportExcel {
    protected sheetName: string;
    protected fileName: string;
    protected column: string[]
    protected workBook: Workbook;
    protected sheet: Worksheet;
    protected mainTitle: string;
    protected subTitle: string;
    constructor(fileName: string, sheetName: string, column: any, subTitle?: string, mainTitle?: string) {
        this.sheetName = sheetName;
        this.fileName = fileName;
        this.column = column;
        this.workBook = new Workbook()
        this.sheet = this.workBook.addWorksheet(this.sheetName);
        this.sheet.columns = this.column;
        this.setMainTitle(mainTitle);
        this.setSubTitle(subTitle);
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
    public getWorkBook = (): Workbook => {
        return this.workBook
    }
    public setData = (data: any) => {
        data.map((value: any) => {
            this.sheet.addRow(value)
        })
    }
    public setMainTitle = (title: string) => {
        this.mainTitle = title
    }
    public setSubTitle = (title: string) => {
        this.subTitle = title
    }
    protected abstract customizeSheet(): void;
    protected abstract customizeColumns(): void;
    protected abstract customizeCells(): void;
    protected abstract addTitleAndLogo(): void;
}