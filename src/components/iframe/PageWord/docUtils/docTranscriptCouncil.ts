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
                                            new Paragraph({ text: 'TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM', alignment: 'center' }),
                                            new Paragraph({ text: 'KHOA CÔNG NGHỆ THÔNG TIN', alignment: 'center' }),
                                            new Paragraph({ text: 'NGÀNH KỸ THUẬT PHẦN MỀM', alignment: 'center' }),
                                        ],
                                        verticalAlign: 'top',
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({ text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', alignment: 'center' }),
                                            new Paragraph({ text: 'Độc lập - Tự do - Hạnh phúc', alignment: 'center' }),
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
                                text: 'PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP',
                                bold: true,
                                size: 23,
                            }),
                        ],
                    }),
                    new Paragraph('Họ tên người đánh giá: .................................................................'),
                    new Paragraph('Vai trò của người đánh giá:  Chấm Poster  Thành viên hội đồng'),
                    new Paragraph('Tên đề tài: .................................................................'),
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph('STT')] }),
                                    new TableCell({ children: [new Paragraph('Nội dung đánh giá (CLO)')] }),
                                    new TableCell({ children: [new Paragraph('Điểm tối đa')] }),
                                    new TableCell({ children: [new Paragraph('Điểm đánh giá Sinh viên 1')] }),
                                    new TableCell({ children: [new Paragraph('Điểm đánh giá Sinh viên 2')] }),
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
                    new Paragraph('Nhận xét khác: .................................................................................................................. ..................................................................................................................................................................................................................................'),
                    new Paragraph({
                        alignment: 'right',
                        children: [
                            new TextRun({
                                text: 'TP. HCM, ngày.... tháng... năm ...\nNgười đánh giá\n(Ký và ghi rõ họ tên)\n.........',
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
