import { Row } from "exceljs";
import { EntityExportExcel } from "./EntityExportExcel";

export class StudentClassExportExcel extends EntityExportExcel {
    private header: Row
    constructor(fileName: string, sheetName: string, column: any) {
        super(fileName, sheetName, column);
        this.header = this.getSheet().getRow(1)
    }
    protected customizeHeaderColumn = () => {
        this.header.font = {
            name: "Time new roman",
            family: 4,
            size: 10,
            bold: true,
        }
        this.header.alignment = {
            vertical: 'middle',
            horizontal: "center",
            wrapText: true,
        }
        this.header.eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFB0B0B0' },
            };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
        this.header.height = 20
    }
    protected customizeCells = () => {
        this.getSheet().eachRow((row: Row, index: number) => {
            if (index !== 1) {
                row.alignment = {
                    wrapText: true,
                    vertical: 'middle',
                    horizontal: 'left',
                }
                row.eachCell((cell) => {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
            }
        })

    }
    protected customizeColumns = () => {
        this.getSheet().getColumn(1).alignment = {
            vertical: "middle",
        }
    }
    public customizeSheet(): void {
        // this.getSheet().properties.defaultRowHeight = 20
        this.customizeHeaderColumn();
        this.customizeCells()
        this.customizeColumns()
    }
}
