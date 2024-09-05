import { Row } from "exceljs";
import { EntityExportExcel } from "./EntityExportExcel";
import _ from "lodash";

export class AssginGroupClassExport extends EntityExportExcel {
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
        this.header.height = undefined
        this.header.eachCell((cell, colNumber) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };

        });

    }
    protected customizeCells = () => {
        // STT Nhóm = nhau => merge 
        let groups: { [key: string]: string[] } = {};
        this.getSheet().eachRow((row: Row, index: number) => {

            if (index !== 1) {
                row.eachCell((cell, colNumber) => {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFFCBC03' },
                    };

                    if (colNumber === row.cellCount) {
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FFFFFFFF' },
                        };
                        cell.font = {
                            color: { argb: 'FF1F2EBE' }, // #1f2ebe
                            bold: true
                        };
                        cell.alignment = {
                            horizontal: 'center',
                            vertical: 'middle'
                        };
                    }
                })

                let groupValue = row.values[6];
                let address_cell = row.model.cells[5].address + '';
                if (!groups[groupValue]) {
                    groups[groupValue] = [];
                }
                groups[groupValue].push(address_cell);
                row.alignment = {
                    wrapText: true,
                    vertical: 'middle',
                };
            }
        });

        // Merge ô
        for (let group in groups) {
            if (groups[group].length > 1) {
                let index_end = groups[group].length - 1
                let index_start = 0
                let startAddress = groups[group][index_start];
                let endAddress = groups[group][index_end];
                // Lấy phần chữ (A, B, C) 
                let startAlpha = startAddress.slice(0, 1);
                let endInt = _.toInteger(endAddress.substring(1));
                // Merge các ô từ index_start -> index_end
                this.getSheet().mergeCells(`${startAlpha}${startAddress.substring(1)}:${startAlpha}${endInt}`);
                // STT	STT Nhóm	Mã SV	Họ tên SV	GVHD	Mã đề tài	Tên đề tài
                // A      B            C        D         E         F           G
                this.getSheet().mergeCells(`${'E'}${startAddress.substring(1)}:${'E'}${endInt}`);
                this.getSheet().mergeCells(`${'B'}${startAddress.substring(1)}:${'B'}${endInt}`);
                this.getSheet().mergeCells(`${'G'}${startAddress.substring(1)}:${'G'}${endInt}`);
                this.getSheet().mergeCells(`${'H'}${startAddress.substring(1)}:${'H'}${endInt}`);
            }
        }
    }
    protected customizeColumns = () => {
        this.getSheet().getColumn(1).alignment = {
            vertical: "middle",
        }
    }
    public customizeSheet(): void {
        this.getSheet().properties.defaultRowHeight = 30
        this.customizeHeaderColumn();
        this.customizeCells()
        this.customizeColumns()
    }
}
