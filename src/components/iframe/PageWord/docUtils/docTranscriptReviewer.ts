import { convertRowEvaluations } from '@/utils/convertDataTable';
import { Document, Paragraph, Table, TableCell, TableRow, TextRun } from 'docx';

export default function docTranscriptReviewer(evaluations: any) {
    const rows = convertRowEvaluations(evaluations);
    const doc = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        alignment: 'center',
                        children: [
                            new TextRun({
                                text: 'INDUSTRIAL UNIVERSITY OF HO CHI MINH CITY',
                                bold: true,
                                size: 28, // 14px
                            }),
                            new TextRun({
                                text: 'FACULTY OF INFORMATION TECHNOLOGY',
                                size: 28, // 14px
                            }),
                            new Paragraph({
                                alignment: 'center',
                                children: [
                                    new TextRun({ text: '=======//======\n', size: 28 }),
                                ],
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: 'center',
                        spacing: { after: 200 },
                        children: [
                            new TextRun({
                                text: 'GRADUATION THESIS EVALUATION FORM',
                                bold: true,
                                size: 28, // 14px
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '1. Topic name:\n\n',
                                size: 28, // 14px
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '2. Group student:\nName of student 1: ...............................\nName of student 2: ...............................',
                                size: 28, // 14px
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '3. Name of reviewer: ..............................',
                                size: 28, // 14px
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '5. Role of reviewer:  Intructor  Reviewer  Member of council',
                                size: 28, // 14px
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: 'center',
                        children: [
                            new TextRun({
                                text: 'CONTENT REVIEW',
                                bold: true,
                                size: 28, // 14px
                            }),
                        ],
                    }),
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'STT', size: 28 })] })] }),
                                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Content', size: 28 })] })] }),
                                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Max score', size: 28 })] })] }),
                                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Evaluation score of student 1', size: 28 })] })] }),
                                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Evaluation score of student 2', size: 28 })] })] }),
                                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'COMMENTS', size: 28 })] })] }),
                                ],
                            }),
                            ...rows.map((row: any, index: number) => (
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: (index + 1).toString(), size: 28 })] })] }),
                                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: row.name, size: 28 })] })] }),
                                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: row.scoreMax.toString(), size: 28 })] })] }),
                                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '', size: 28 })] })] }),
                                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '', size: 28 })] })] }),
                                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '', size: 28 })] })] }),
                                    ],
                                })
                            )),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: 'Other comment: ..................................................................................................................',
                                size: 28, // 14px
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: 'right',
                        children: [
                            new TextRun({
                                text: 'TP. HCM, day.... month... year ...\n',
                                italics: true,
                                size: 28, // 14px
                            }),
                            new TextRun({
                                text: 'Name of lecturer\n',
                                bold: true,
                                size: 28, // 14px
                            }),
                            new TextRun({
                                text: '(Sign and write full name)\n.........',
                                italics: true,
                                size: 28, // 14px
                            }),
                        ],
                    }),
                ],
            },
        ],
    });
    return doc
};