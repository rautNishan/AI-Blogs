import { DataSource } from "typeorm";
import { DatabaseException } from "../../exceptions/database-exception";
import databaseConfig from "../config/database.config";

export class DBConnection {
  private static dataSource: DataSource;

  public static async connection() {
    console.log("Trying to connect....");
    if (!this.dataSource) {
      this.dataSource = new DataSource({
        type: "postgres",
        host: databaseConfig.host,
        port: Number(databaseConfig.port) || 5432,
        username: databaseConfig.username,
        password: databaseConfig.password,
        database: databaseConfig.database,
        entities: ["./src/**/*.entity{.ts,.js}"],
        migrations: ["./src/database/migrations/*{.ts,.js}"],
      });
    }
    try {
      await this.dataSource.initialize();
      console.log("Database Connected Successfully.....");
    } catch (error: any) {
      console.log("Failed to connect to database: ", error);
      throw error;
    }
  }

  public static getConnection(): DataSource {
    if (!this.dataSource) {
      throw new DatabaseException("Database is not even connected");
    }
    return this.dataSource;
  }
}
