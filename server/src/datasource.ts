import { DataSource } from "typeorm";
import { Insu, Post, Comment } from "./entities";

const dataSource = new DataSource({
  type: "postgres",
  username: process.env.DB_USERNAME!.toString(),
  password: process.env.DB_PASSWORD!.toString(),
  database: process.env.DB_DATABASE!.toString(),
  entities: [Insu, Post,Comment],
  synchronize: true,
  logging: true,
});

export default dataSource;
