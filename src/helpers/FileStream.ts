import xlsx from "xlsx";

export class FileStream {
  constructor(private readonly file: Express.Multer.File) { }

  *xlsxToJson() {
    const fileBuffer = this.file.buffer;

    const wb = xlsx.read(fileBuffer, { type: "buffer" });

    const sheetName = wb.SheetNames[0];

    for (const record of xlsx.utils.sheet_to_json(wb.Sheets[sheetName])) {
      yield record;
    }
  }
}
