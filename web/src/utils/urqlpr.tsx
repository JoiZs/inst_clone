import { authExchange } from "@urql/exchange-auth";
import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { makeOperation } from "urql/core";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useContext } from "react";
import { TokenContext } from "../context/token";
import { CreatePostMutation } from "../generated/graphql";

const GqlProvider = ({ children }: any) => {
  const [token, setToken] = useContext(TokenContext);

  const getAuth = async ({ authState }: any) => {
    if (!authState) {
      if (token) {
        return { token: token };
      }
      return null;
    }
    const refresh = async () => {
      const { exp }: any = jwtDecode(token);
      if (exp * 1000 <= Date.now()) {
        const res: any = await axios({
          method: "POST",
          url: process.env.REACT_APP_RFTKURL,
          withCredentials: true,
        });

        if (res.data.actoken) {
          setToken(res.data.actoken);
          return { token: res.data.actoken };
        }
      }
      return null;
    };

    refresh();
    return null;
  };

  const addAuthToOperation = ({ authState, operation }: any) => {
    if (!authState || !authState.token) {
      return operation;
    }

    const fetchOptions =
      typeof operation.context.fetchOptions === "function"
        ? operation.context.fetchOptions()
        : operation.context.fetchOptions || {};

    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          authorization: `Bearer ${authState.token}`,
        },
      },
    });
  };

  const didAuthError = ({ error }: any) => {
    return error.message.includes("Not Authenticated");
  };

  const willAuthError = ({ authState }: any) => {
    if (!authState) return true;
    return false;
  };

  const client = createClient({
    url: process.env.REACT_APP_SERVERURL!,
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          Content: () => null,
          Post: () => null,
          Insu: () => null,
        },
        updates: {
          Mutation: {
            createPost(_result, args, cache, _info) {
              cache.invalidate("Query", "posts");
            },
            postment(_result, args, cache, _info) {
              cache.invalidate("Query", "ments");
            },
          },
        },
      }),
      authExchange({
        getAuth,
        addAuthToOperation,
        didAuthError,
        willAuthError,
      }),
      fetchExchange,
    ],
    fetchOptions: {
      credentials: "include",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  return <Provider value={client}>{children}</Provider>;
};

export default GqlProvider;
