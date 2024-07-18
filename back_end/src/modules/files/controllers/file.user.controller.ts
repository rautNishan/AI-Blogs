import fs from "fs";
import path from "path";
import { HttpStatusCode } from "../../../common/constants/http.status.code";
import { HttpException } from "../../../common/exceptions/http-exceptions";
import { FileImageUploadDto } from "../dtos/file.images.upload.dto";
import { FileService } from "../services/file.service";
import { FileEntity } from "../entities/file.entity";
export class FileUserController {
  private static _instance: FileUserController;

  private _fileService: FileService;
  private constructor() {
    this._fileService = FileService.getInstance();
  }

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
    try {
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
            console.log("This is Error: ", err);

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
      await this.saveFileInfoToDataBase(responseToSend);
      return responseToSend;
    } catch (error) {
      throw error;
    }
  }

  async deleteImage(fileName: string) {
    const filePath = path.join(__dirname, "../../../public/blogs", fileName);
    try {
      await fs.promises.unlink(filePath);
      return await this.deleteFileInfoFromDataBase(fileName);
    } catch (error) {
      throw new HttpException(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        "Failed to delete file"
      );
    }
  }

  async saveFileInfoToDataBase(file: FileImageUploadDto) {
    return await this._fileService.create(file);
  }

  async deleteFileInfoFromDataBase(image: string): Promise<FileEntity> {
    const existingImage: FileEntity = await this._fileService.findOneOrFail(
      image
    );
    return await this._fileService.softDelete(existingImage);
  }
}
