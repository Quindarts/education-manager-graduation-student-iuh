import { convertRowEvaluations } from '@/utils/convertDataTable';
import { Document, HeightRule, Paragraph, ShadingType, Table, TableCell, TableRow, TextRun, VerticalAlign, WidthType } from 'docx';

export default function docTranscriptReviewer({
    topicName,
    groupStudentName,
    students,
    evaluatorFullName,
    lecturerSupport,
    evaluations,
    fileType = 'many'
}: any) {
    console.log("🚀 ~ groupStudentName:", groupStudentName)

    const fileName = 'Phiếu chấm_Nhóm sv_' + groupStudentName + '_' + evaluatorFullName
    const rows = convertRowEvaluations(evaluations);
    const lineSpacing = 200
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
                        spacing: { after: lineSpacing },
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
                        spacing: { after: lineSpacing },
                        children: [
                            new TextRun({
                                text: '\nFACULTY OF INFORMATION TECHNOLOGY',
                                size: 28,
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: 'center',
                        spacing: { after: lineSpacing },
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
                        spacing: { after: lineSpacing },
                        children: [
                            new TextRun({
                                text: `1. Topic name: ${topicName} `,
                                size: 24,
                            }),
                        ],
                    }),
                    new Paragraph({
                        spacing: { after: lineSpacing },
                        children: [
                            new TextRun({
                                text: `2. Instructors: ${lecturerSupport}`,
                                size: 24,
                            }),
                        ],
                    }),
                    new Paragraph({
                        spacing: { after: lineSpacing },
                        children: [
                            new TextRun({
                                text: `3. Team: ${groupStudentName}`,
                                size: 24,
                            }),
                        ],
                    }),
                    new Paragraph({
                        spacing: { after: lineSpacing },
                        children: [
                            new TextRun({
                                text: `     First student name: ${students && students[0]?.fullName}                                                        Student code 1: ${students && students[0]?.username}`,
                                size: 24,
                            }),
                        ],
                    }),
                    new Paragraph({
                        spacing: { after: lineSpacing },
                        children: [
                            new TextRun({
                                text: `     Second student name: ${students && students[1]?.fullName}                                                  Student code 2: ${students && students[1]?.username}`,
                                size: 24,
                            }),
                        ],
                    }),
                    new Paragraph({
                        spacing: { after: lineSpacing },
                        children: [
                            new TextRun({
                                text: `4. Evaluator's full name: ${fileType === 'many' ? evaluatorFullName.split('_')[1] : evaluatorFullName}`,
                                size: 24,
                            }),
                        ],
                    }),
                    new Paragraph({
                        spacing: { after: lineSpacing },
                        children: [
                            new TextRun({
                                text: '5. Role of the evaluator:      Instructor    Reviewer     Member of Council',
                                size: 24,
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: 'center',
                        spacing: { after: lineSpacing },
                        children: [
                            new TextRun({
                                text: 'CONTENTS',
                                bold: true,
                                size: 24,
                            }),
                        ],
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
                                            color: "#d9ecfb",
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
                                            color: "#d9ecfb",
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
                                            color: "#d9ecfb",
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
                                            color: "#d9ecfb",
                                        },
                                        children: [new Paragraph({ children: [new TextRun({ text: 'Score student 1', size: 23 })], alignment: 'center', })]
                                    }),
                                    new TableCell({
                                        verticalAlign: VerticalAlign.CENTER,
                                        shading: {
                                            type: ShadingType.SOLID,
                                            color: "#d9ecfb",
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
                                            color: "#d9ecfb",
                                        },
                                        verticalAlign: VerticalAlign.CENTER,
                                        children: [new Paragraph({
                                            alignment: 'center',
                                            children: [new TextRun({ text: 'NOTES ', size: 20 }), new TextRun({ text: '(if applicable)', size: 23 })]
                                        })]
                                    }),
                                ],
                            }),
                            ...rows.map((row, index) => (
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
                                        verticalAlign: VerticalAlign.CENTER,
                                        width: {
                                            type: WidthType.PERCENTAGE,
                                            size: 20,
                                        },
                                        children: [new Paragraph({ children: [new TextRun({ text: '', size: 23 })], alignment: 'center', })]
                                    }),
                                ],
                            }),
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
    return fileType === 'many' ? { doc, fileName } : doc
};