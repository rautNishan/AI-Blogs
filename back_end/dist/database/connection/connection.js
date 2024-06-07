"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnection = void 0;
const typeorm_1 = require("typeorm");
const DataBaseException_1 = require("../../exceptions/DataBaseException");
const database_config_1 = __importDefault(require("../config/database.config"));
class DBConnection {
    static connection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.dataSource) {
                this.dataSource = new typeorm_1.DataSource({
                    type: "postgres",
                    host: database_config_1.default.host,
                    port: Number(database_config_1.default.port) || 5432,
                    username: database_config_1.default.username,
                    password: database_config_1.default.password,
                    database: database_config_1.default.database,
                });
            }
            try {
                yield this.dataSource.initialize();
                console.log("Database Connected Successfully.....");
            }
            catch (error) {
                console.log("Failed to connect to database: ", error);
                throw error;
            }
        });
    }
    static getConnection() {
        if (!this.dataSource) {
            throw new DataBaseException_1.DatabaseException("Database is not even connected");
        }
        return this.dataSource;
    }
}
exports.DBConnection = DBConnection;
