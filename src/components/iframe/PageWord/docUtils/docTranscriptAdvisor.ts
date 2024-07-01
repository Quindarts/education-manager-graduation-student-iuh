import { convertRowEvaluations } from '@/utils/convertDataTable';
import { Document, Paragraph, Table, TableCell, TableRow, TextRun } from 'docx';

export default function docTranscriptAdvisor(evaluations: any) {
    const rows = convertRowEvaluations(evaluations);
    const doc = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        alignment: 'center',
                        children: [
                            new TextRun({
                                text: 'TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM',
                                bold: true,
                                size: 28, // 14px
                            }),
                            new TextRun({
                                text: '\nKHOA CÔNG NGHỆ THÔNG TIN\n=======//======',
                                size: 28, // 14px
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: 'center',
                        spacing: { after: 200 },
                        children: [
                            new TextRun({
                                text: 'PHIẾU CHẤM ĐIỂM KHÓA LUẬN TỐT NGHIỆP',
                                bold: true,
                                size: 28, // 14px
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '1. Tên đề tài:\n\n',
                                size: 28, // 14px
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '2. Nhóm thực hiện:\nHọ tên học viên 1: ...............................\nHọ tên học viên 2: ...............................',
                                size: 28, // 14px
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '3. Họ và tên người chấm điểm: ..............................',
                                size: 28, // 14px
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: '5. Vai trò của người đánh giá:  GV hướng dẫn  Phản biện  Thành viên HĐ',
                                size: 28, // 14px
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: 'center',
                        children: [
                            new TextRun({
                                text: 'NỘI DUNG ĐÁNH GIÁ',
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
                                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Nội dung', size: 28 })] })] }),
                                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Điểm tối đa', size: 28 })] })] }),
                                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Điểm đánh giá Sinh viên 1', size: 28 })] })] }),
                                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Điểm đánh giá Sinh viên 2', size: 28 })] })] }),
                                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'CÁC Ý KIẾN NHẬN XÉT', size: 28 })] })] }),
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
                                text: 'Các ý kiến khác: ..................................................................................................................',
                                size: 28, // 14px
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: 'right',
                        children: [
                            new TextRun({
                                text: 'TP. HCM, ngày.... tháng... năm ...\n',
                                italics: true,
                                size: 28, // 14px
                            }),
                            new TextRun({
                                text: 'Người chấm điểm\n',
                                bold: true,
                                size: 28, // 14px
                            }),
                            new TextRun({
                                text: '(Ký và ghi rõ họ tên)\n.........',
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