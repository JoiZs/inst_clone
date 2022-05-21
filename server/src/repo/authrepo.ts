import dataSource from "../datasource";
import { Insu } from "../entities";

const AuthRepo = dataSource.getRepository(Insu);

export default AuthRepo;
