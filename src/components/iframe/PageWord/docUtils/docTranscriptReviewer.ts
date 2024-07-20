import { convertRowEvaluations } from '@/utils/convertDataTable';
import { Document, HeightRule, Paragraph, ShadingType, Table, TableCell, TableRow, TextRun, VerticalAlign, WidthType } from 'docx';

export default function docTranscriptReviewer(evaluations: any) {
    const rows = convertRowEvaluations(evaluations);

    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        margin: {
                            top: 720, // 0.5 inch
                            bottom: 720, // 0.5 inch
                            left: 720, // 0.5 inch
                            right: 720, // 0.5 inch
                        },
                    }
                },
                children: [
                    new Paragraph({
                        alignment: 'center',
                        children: [
                            new TextRun({
                                text: 'INDUSTRIAL UNIVERSITY OF HO CHI MINH CITY',
                                bold: true,
                                size: 28,
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: 'center',
                        children: [
                            new TextRun({
                                text: '\nFACULTY OF INFORMATION TECHNOLOGY',
                                size: 28,
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: 'center',
                        children: [
                            new TextRun({
                                text: '=======//======',
                                size: 28,
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: 'center',
                        spacing: { before: 200, after: 200 },
                        children: [
                            new TextRun({
                                text: 'CAPSTONE PROJECT EVALUATION FORM',
                                bold: true,
                                size: 28,

                            }),
                        ],
                    }),
                    new Paragraph({
                        spacing: { after: 400 },
                        children: [
                            new TextRun({
                                text: '1. Topic name: ',
                                size: 24,
                            }),
                        ],

                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '2. Instructors:  ',
                                size: 24,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '3. Team: ',
                                size: 24,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '     First student name:                                                            Student code 1: ',
                                size: 24,


                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '     First student name:                                                            Student code 2: ',
                                size: 24,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `4. Evaluator's full name:`,
                                size: 24,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '5. Role of the evaluator:      Instructor    Reviewer     Member of Council',
                                size: 24,
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: 'center',
                        children: [
                            new TextRun({
                                text: 'CONTENTS',
                                bold: true,
                                size: 24,
                            }),
                        ], spacing: { before: 150, after: 150 }
                    }),
                    new Table({
                        width: {
                            size: 100,
                            type: WidthType.PERCENTAGE,
                        },
                        columnWidths: [4000, 5505],

                        rows: [
                            new TableRow({
                                height: {
                                    value: 722,
                                    rule: HeightRule.EXACT,
                                },
                                children: [

                                    new TableCell({
                                        width: {
                                            size: 5,
                                            type: WidthType.PERCENTAGE,
                                        },
                                        shading: {
                                            type: ShadingType.SOLID,
                                            color: "#d9ecfb", // Màu nền
                                        },
                                        verticalAlign: VerticalAlign.CENTER,
                                        children: [new Paragraph({ children: [new TextRun({ text: 'CLO', size: 23 })], alignment: 'center', })],
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 40,
                                            type: WidthType.PERCENTAGE,
                                        },
                                        shading: {
                                            type: ShadingType.SOLID,
                                            color: "#d9ecfb", // Màu nền
                                        },
                                        verticalAlign: VerticalAlign.CENTER,
                                        children: [new Paragraph({ children: [new TextRun({ text: 'Content', size: 23 })], alignment: 'center', })]
                                    }),
                                    new TableCell({
                                        verticalAlign: VerticalAlign.CENTER,
                                        width: {
                                            size: 15,
                                            type: WidthType.PERCENTAGE,
                                        },
                                        shading: {
                                            type: ShadingType.SOLID,
                                            color: "#d9ecfb", // Màu nền
                                        },
                                        children: [new Paragraph({ children: [new TextRun({ text: 'Max point', size: 23 })], alignment: 'center' })]
                                    }),
                                    new TableCell({
                                        width: {
                                            type: WidthType.PERCENTAGE,
                                            size: 10,
                                        },
                                        verticalAlign: VerticalAlign.CENTER,
                                        shading: {
                                            type: ShadingType.SOLID,
                                            color: "#d9ecfb", // Màu nền
                                        },
                                        children: [new Paragraph({ children: [new TextRun({ text: 'Score student 1', size: 23 })], alignment: 'center', })]
                                    }),
                                    new TableCell({
                                        verticalAlign: VerticalAlign.CENTER,
                                        shading: {
                                            type: ShadingType.SOLID,
                                            color: "#d9ecfb", // Màu nền
                                        },
                                        width: {
                                            type: WidthType.PERCENTAGE,
                                            size: 10,
                                        },
                                        children: [new Paragraph({ children: [new TextRun({ text: 'Score student 2', size: 23 })], alignment: 'center', })]
                                    }),
                                    new TableCell({
                                        width: {
                                            type: WidthType.PERCENTAGE,
                                            size: 20,
                                        },
                                        shading: {
                                            type: ShadingType.SOLID,
                                            color: "#d9ecfb", // Màu nền
                                        },
                                        verticalAlign: VerticalAlign.CENTER,
                                        children: [new Paragraph({
                                            alignment: 'center',
                                            children: [new TextRun({ text: 'NOTES ', size: 20 }), new TextRun({ text: '(if applicable)', size: 23 })]
                                        })]
                                    }),
                                ],
                            }),
                            ...rows.map((row: any, index: number) => (
                                new TableRow({
                                    height: {
                                        value: 700,
                                        rule: HeightRule.EXACT,
                                    },
                                    children: [
                                        new TableCell({ verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: 'center', children: [new TextRun({ text: (index + 1).toString(), size: 23 })] })] }),
                                        new TableCell({ verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: row.name, size: 23 })] })] }),
                                        new TableCell({ verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: 'center', children: [new TextRun({ text: row.scoreMax.toString(), size: 23 })] })] }),
                                        new TableCell({ verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: 'center', children: [new TextRun({ text: '', size: 23 })] })] }),
                                        new TableCell({ verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: 'center', children: [new TextRun({ text: '', size: 23 })] })] }),
                                        new TableCell({ verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: '', size: 23 })] })] }),
                                    ],
                                })
                            )),
                            new TableRow({
                                height: {
                                    value: 600,
                                    rule: HeightRule.EXACT,
                                },
                                children: [

                                    new TableCell({
                                        width: {
                                            size: 5,
                                            type: WidthType.PERCENTAGE,
                                        },
                                        verticalAlign: VerticalAlign.CENTER,
                                        children: [new Paragraph({ children: [new TextRun({ text: '', size: 23 })], alignment: 'center', })],
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 40,
                                            type: WidthType.PERCENTAGE,
                                        },
                                        verticalAlign: VerticalAlign.CENTER,
                                        children: [new Paragraph({ children: [new TextRun({ text: 'Total', size: 23, bold: true })], alignment: 'center', })]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 15,
                                            type: WidthType.PERCENTAGE,
                                        },
                                        verticalAlign: VerticalAlign.CENTER,
                                        children: [new Paragraph({ children: [new TextRun({ text: '100', size: 23, bold: true })], alignment: 'center' })]
                                    }),
                                    new TableCell({
                                        width: {
                                            type: WidthType.PERCENTAGE,
                                            size: 10,
                                        },
                                        verticalAlign: VerticalAlign.CENTER,
                                        children: [new Paragraph({ children: [new TextRun({ text: '', size: 23 })], alignment: 'center', })]
                                    }),
                                    new TableCell({
                                        verticalAlign: VerticalAlign.CENTER,
                                        width: {
                                            type: WidthType.PERCENTAGE,
                                            size: 10,
                                        },
                                        children: [new Paragraph({ children: [new TextRun({ text: '', size: 23 })], alignment: 'center', })]
                                    }),
                                    new TableCell({
                                        width: {
                                            type: WidthType.PERCENTAGE,
                                            size: 20,
                                        },
                                        verticalAlign: VerticalAlign.CENTER,
                                        children: [new Paragraph({
                                            alignment: 'center',
                                            children: [new TextRun({ text: ' ', size: 20 })]
                                        })]
                                    }),
                                ],

                            })
                        ],
                    }),
                    new Paragraph({
                        spacing: { before: 200 },
                        children: [
                            new TextRun({
                                text: 'Other comments:',
                                size: 24,
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '.............................................................................................................................................................................',
                                size: 24,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '.............................................................................................................................................................................',
                                size: 24,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '.............................................................................................................................................................................',
                                size: 24,
                            }),
                        ],
                    }),
                    new Paragraph({
                        spacing: { before: 200, after: 150 },
                        alignment: 'center',
                        children: [
                            new TextRun({
                                text: '                                                                                                   Ho Chi Minh City, date    month     year   \n',
                                italics: true,
                                size: 24,
                            }),

                        ],
                    }),
                    new Paragraph({
                        alignment: 'center',

                        children: [
                            new TextRun({
                                text: '                                                                                                                    Evaluator',
                                bold: true,
                                size: 24,
                            }),
                        ],
                    }),
                ],


            },
        ],
    });
    return doc
};