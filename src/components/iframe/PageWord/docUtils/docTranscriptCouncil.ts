import { convertRowEvaluations } from '@/utils/convertDataTable';
import { Document, Paragraph, Table, TableCell, TableRow, TextRun, WidthType } from 'docx';

function docTranscriptAdvisor(evaluations: any) {
    const rows = convertRowEvaluations(evaluations);

    const doc = new Document({
        sections: [
            {
                children: [
                    new Table({
                        width: {
                            size: 100,
                            type: WidthType.PERCENTAGE,
                        },
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({ text: 'INDUSTRIAL UNIVERSITY OF HO CHI MINH CITY', alignment: 'center' }),
                                            new Paragraph({ text: 'FACULTY OF INFORMATION TECHNOLOGY', alignment: 'center' }),
                                            new Paragraph({ text: 'SOFTWARE ENGINEERING', alignment: 'center' }),
                                        ],
                                        verticalAlign: 'top',
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({ text: 'CONG HOA XA HOI CHU NGHIA VIET NAM', alignment: 'center' }),
                                            new Paragraph({ text: 'Doc lap - Tu do - Hanh phuc', alignment: 'center' }),
                                        ],
                                        verticalAlign: 'top',
                                    }),
                                ],
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: 'center',
                        spacing: { before: 200, after: 400 },
                        children: [
                            new TextRun({
                                text: 'GRADUATION THESIS EVALUATION FORM',
                                bold: true,
                                size: 23,
                            }),
                        ],
                    }),
                    new Paragraph('Name of reviewer: .................................................................'),
                    new Paragraph('Role of reviewer:  Scoring Poster  Member of council'),
                    new Paragraph('Topic name: .................................................................'),
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph('STT')] }),
                                    new TableCell({ children: [new Paragraph('Content review (CLO)')] }),
                                    new TableCell({ children: [new Paragraph('Max score')] }),
                                    new TableCell({ children: [new Paragraph('Score of student 1')] }),
                                    new TableCell({ children: [new Paragraph('Score of student 2')] }),
                                    new TableCell({ children: [new Paragraph('Các ý kiến nhận xét')] }),
                                ],
                            }),
                            ...rows.map((row: any, index: number) => (
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph((index + 1).toString())] }),
                                        new TableCell({ children: [new Paragraph(row.name)] }),
                                        new TableCell({ children: [new Paragraph(row.scoreMax.toString())] }),
                                        new TableCell({ children: [new Paragraph('')] }),
                                        new TableCell({ children: [new Paragraph('')] }),
                                        new TableCell({ children: [new Paragraph('')] }),
                                    ],
                                })
                            )),
                        ],
                    }),
                    new Paragraph('Other comments: .................................................................................................................. ..................................................................................................................................................................................................................................'),
                    new Paragraph({
                        alignment: 'right',
                        children: [
                            new TextRun({
                                text: 'TP. HCM, day.... month... year ...\nInstructor scores\n(Sign and write full name)\n.........',
                                italics: true,
                            }),
                        ],
                    }),
                ],
            },
        ],
    });

    return doc;
}

export default docTranscriptAdvisor;
