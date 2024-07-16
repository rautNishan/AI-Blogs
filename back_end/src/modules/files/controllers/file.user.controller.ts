import { HttpStatusCode } from "../../../common/constants/http.status.code";
import { HttpException } from "../../../common/exceptions/http-exceptions";
import { FileImageUploadDto } from "../dtos/file.images.upload.dto";
import fs from "fs";
import path from "path";
export class FileUserController {
  private static _instance: FileUserController;
  private constructor() {}

  public static getInstance() {
    if (!FileUserController._instance) {
      FileUserController._instance = new FileUserController();
    }
    return FileUserController._instance;
  }

  async uploadImage(file: {
    mimeType: string;
    buffer: Buffer;
    originalName: string;
    size: number;
  }): Promise<FileImageUploadDto> {
    const date = Date.now();
    const filePath = path.join(
      __dirname,
      "../../../public/blogs",
      `${date}-${file.originalName}`
    );

    let responseToSend: FileImageUploadDto = {
      path: filePath,
      fileName: `${date}-${file.originalName}`,
      mime: file.mimeType,
      size: file.size,
      description: null,
    };
    const filePromise = new Promise((resolve, reject) => {
      fs.writeFile(filePath, file.buffer, (err: Error) => {
        if (err) {
          reject(
            new HttpException(
              HttpStatusCode.INTERNAL_SERVER_ERROR,
              "Failed to Upload File"
            )
          );
        } else {
          resolve(responseToSend);
        }
      });
    });
    await filePromise;
    console.log("This is FilePromise: ", filePromise);

    return responseToSend;
  }
}
