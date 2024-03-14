import { ExcelReader } from "node-excel-stream";
import readline from "readline";
import { Readable, Writable, pipeline } from "stream";
export class FileStream {
  constructor(private readonly file: Express.Multer.File) { }

  async xlsxToJson<T>(cb: (data: T) => void) {
    const fileBuffer = this.file.buffer;
    const readable = new Readable();
    readable.push(fileBuffer);
    readable.push(null);

    const reader = new ExcelReader(readable, {
      sheets: [
        {
          name: "Pokemons",
          rows: {
            headerRow: 1,
            allowedHeaders: [
              {
                name: "Name",
                key: "username",
              },
            ],
          },
        },
      ],
    });

    reader.eachRow((rowData, rowNum, sheetSchema) => {
      console.log({ rowData, rowNum, sheetSchema });
    });
  }
}
