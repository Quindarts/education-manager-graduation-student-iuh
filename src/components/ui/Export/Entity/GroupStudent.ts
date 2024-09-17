import { Row } from "exceljs";
import { EntityExportExcel } from "./EntityExportExcel";
import _ from "lodash";
// {
//     "address": "B5",
//     "type": 3,
//     "value": "Nhóm số 002",
//     "style": {
//         "alignment": {
//             "wrapText": true,
//             "vertical": "middle",
//             "horizontal": "left"
//         }
//     },
//     "styleId": 4,
//     "ssId": 17
// }
export class GroupStudentClassExportExcel extends EntityExportExcel {
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
        // FFFDFD00
        this.header.eachCell((cell, colNumber) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFDFD00' },
            };
        })
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
                        fgColor: { argb: 'FFFCE9DA' },
                    };
                })

                let groupValue = row.values[2];
                let address_cell = row.model.cells[1].address + '';
                if (!groups[groupValue]) {
                    groups[groupValue] = [];
                }
                groups[groupValue].push(address_cell);
                row.alignment = {
                    wrapText: true,
                    vertical: 'middle',
                    horizontal: 'left',
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
                this.getSheet().mergeCells(`${'F'}${startAddress.substring(1)}:${'F'}${endInt}`);
                this.getSheet().mergeCells(`${'G'}${startAddress.substring(1)}:${'G'}${endInt}`);
            }
        }
    }
    protected customizeColumns = () => {
        this.getSheet().getColumn(1).alignment = {
            vertical: "middle",
        }
    }
    public customizeSheet(): void {
        // this.getSheet().properties.defaultRowHeight = 30
        this.customizeHeaderColumn();
        this.customizeCells()
        this.customizeColumns()
    }
}
