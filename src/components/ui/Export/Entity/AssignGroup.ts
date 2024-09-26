import { Row } from "exceljs";
import { EntityExportExcel } from "./EntityExportExcel";
import _ from "lodash";

export class AssginGroupClassExport extends EntityExportExcel {
    private header: Row
    private subTitle: string;
    private mainTitle: string;

    constructor(fileName: string, sheetName: string, column: any, subTitle?: string, mainTitle?: string) {
        super(fileName, sheetName, column);
        this.header = this.getSheet().getRow(1)
        this.subTitle = subTitle
        this.mainTitle = mainTitle
    }
    public setMainTitle = (title: string) => {
        this.mainTitle = title
    }
    public setSubTitle = (title: string) => {
        this.subTitle = title
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

            if (index >=3) {
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

                    if (colNumber === 5) {
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

                let groupValue = row.values[2];
                let address_cell = row.model.cells[1].address + '';
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
                // STT	 STT Nhóm	Mã SV	Họ tên SV	GVHD	#HĐPB	fullName	Ghi chú
                // A       B           C       D           E       F       G           H
              // Mã nhóm  Mã SV	  Họ tên SV	  #HĐPB	   Ghi chú	 HD TV	 STT	     GVHD

                this.getSheet().mergeCells(`${'E'}${startAddress.substring(1)}:${'E'}${endInt}`);
                this.getSheet().mergeCells(`${'F'}${startAddress.substring(1)}:${'D'}${endInt}`);
                this.getSheet().mergeCells(`${'G'}${startAddress.substring(1)}:${'H'}${endInt}`);
                // this.getSheet().mergeCells(`${'H'}${startAddress.substring(1)}:${'E'}${endInt}`);
            }
        }
    }
   
    protected customizeColumns = () => {
        this.getSheet().getColumn(1).alignment = {
            vertical: "middle",
        }
    }

    private addTitleAndLogo = () => {
        let mainTitle = this.sheet.insertRow(1, [this.mainTitle])
        mainTitle.font = { name: "Times New Roman", size: 20, bold: true };
        mainTitle.alignment = { horizontal: 'center' };
        mainTitle.alignment.vertical = "middle";
        mainTitle.alignment.textRotation = 'vertical'
        this.getSheet().mergeCells('A1:H1');
        let subTitle = this.getSheet().insertRow(2, [this.subTitle]);
        subTitle.font = { size: 14, bold: true };
        subTitle.alignment = { horizontal: 'center' };
        this.getSheet().mergeCells('A2:H2');
    };
    public customizeSheet(): void {
        this.addTitleAndLogo()
        this.customizeHeaderColumn();
        this.customizeCells()
        this.customizeColumns()
    }
}
// const toDataURL = (url: string) => {
//     const promise = new Promise((resolve, reject) => {
//         var xhr = new XMLHttpRequest();
//         xhr.onload = function () {
//             var reader = new FileReader();
//             reader.readAsDataURL(xhr.response);
//             reader.onloadend = function () {
//                 resolve({ base64Url: reader.result });
//             };
//         };
//         xhr.open("GET", url);
//         xhr.responseType = "blob";
//         xhr.send();
//     });

//     return promise;
// };