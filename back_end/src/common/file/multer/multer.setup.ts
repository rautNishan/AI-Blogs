import multer, { StorageEngine } from "multer";
export const storage: StorageEngine = multer.memoryStorage();
