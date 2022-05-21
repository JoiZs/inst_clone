import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AuthResolver, MentResolver, PostResolver } from "./resolvers";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dataSource from "./datasource";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const main = async () => {
  const app = express();
  const port = process.env.PORT || 4000;

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
  app.use(cookieParser());

  const auroute = require("./routes/authrou");

  await dataSource.initialize();

  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, PostResolver, MentResolver],
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  await apollo.start();
  apollo.applyMiddleware({
    app,
    cors: { credentials: true, origin: process.env.CLIENT_URL },
  });

  app.use("/", auroute);

  app.listen(process.env.PORT, () =>
    console.log(`Server is Up (PORT): ${port}`)
  );
};

main().catch((err) => {
  console.log(err);
});
