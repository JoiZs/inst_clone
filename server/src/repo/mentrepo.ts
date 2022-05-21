import dataSource from "../datasource";
import { Comment } from "../entities";

const MentRepo = dataSource.getRepository(Comment);

export default MentRepo;
