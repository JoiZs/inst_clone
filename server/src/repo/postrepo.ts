import dataSource from "../datasource";
import { Post } from "../entities/post";

const PostRepo = dataSource.getRepository(Post);

export default PostRepo;
