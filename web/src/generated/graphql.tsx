import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  mentCreatedAt: Scalars['DateTime'];
  mentId: Scalars['String'];
  mentLiked: Scalars['Int'];
  mentPostID: Scalars['String'];
  mentReplied?: Maybe<Scalars['String']>;
  mentText: Scalars['String'];
  mentUser: Insu;
  mentUserID: Scalars['String'];
};

export type Content = {
  __typename?: 'Content';
  url: Scalars['String'];
};

export type Insu = {
  __typename?: 'Insu';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  fullname: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Resp;
  delment: Resp;
  delpost: Resp;
  login: Resp;
  logout: Resp;
  postment: Resp;
  register: Resp;
  revokerft: Resp;
};


export type MutationCreatePostArgs = {
  postcreateinp: PostCreateInp;
};


export type MutationDelmentArgs = {
  mentId: Scalars['String'];
};


export type MutationDelpostArgs = {
  postid: Scalars['String'];
};


export type MutationLoginArgs = {
  loginInp: LoginInp;
};


export type MutationPostmentArgs = {
  mentinp: MentInpType;
};


export type MutationRegisterArgs = {
  reginp: RegInp;
};


export type MutationRevokerftArgs = {
  id: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  postComment?: Maybe<Array<Comment>>;
  postContent?: Maybe<Array<Content>>;
  postCreatedAt: Scalars['DateTime'];
  postID: Scalars['String'];
  postLiked: Scalars['Int'];
  postText?: Maybe<Scalars['String']>;
  postUpdatedAt: Scalars['DateTime'];
  postUser: Insu;
  postUserID: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  auser: Insu;
  me: Insu;
  ments: Array<Comment>;
  posts: Array<Post>;
  singlepost: Post;
};


export type QueryAuserArgs = {
  username: Scalars['String'];
};


export type QuerySinglepostArgs = {
  postid: Scalars['String'];
};

export type ResType = {
  __typename?: 'ResType';
  message: Scalars['String'];
  type: Scalars['String'];
};

export type Resp = {
  __typename?: 'Resp';
  data?: Maybe<ResType>;
  error?: Maybe<ResType>;
};

export type LoginInp = {
  cred: Scalars['String'];
  password: Scalars['String'];
};

export type MentInpType = {
  mentPostID: Scalars['String'];
  mentReplyID?: InputMaybe<Scalars['String']>;
  mentText: Scalars['String'];
};

export type PostContentInp = {
  url: Scalars['String'];
};

export type PostCreateInp = {
  postContent?: InputMaybe<Array<PostContentInp>>;
  postText?: InputMaybe<Scalars['String']>;
};

export type RegInp = {
  email: Scalars['String'];
  fullname: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Insu', username: string, fullname: string, posts?: Array<{ __typename?: 'Post', postID: string, postLiked: number, postContent?: Array<{ __typename?: 'Content', url: string }> | null }> | null } };

export type AuserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type AuserQuery = { __typename?: 'Query', auser: { __typename?: 'Insu', username: string, fullname: string, posts?: Array<{ __typename?: 'Post', postID: string, postLiked: number, postContent?: Array<{ __typename?: 'Content', url: string }> | null }> | null } };

export type LoginMutationVariables = Exact<{
  loginInp: LoginInp;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Resp', data?: { __typename?: 'ResType', type: string, message: string } | null, error?: { __typename?: 'ResType', type: string, message: string } | null } };

export type RegisterMutationVariables = Exact<{
  reginp: RegInp;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'Resp', data?: { __typename?: 'ResType', type: string, message: string } | null, error?: { __typename?: 'ResType', type: string, message: string } | null } };

export type RevokerftMutationVariables = Exact<{
  revokerftId: Scalars['String'];
}>;


export type RevokerftMutation = { __typename?: 'Mutation', revokerft: { __typename?: 'Resp', data?: { __typename?: 'ResType', type: string, message: string } | null, error?: { __typename?: 'ResType', type: string, message: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'Resp', data?: { __typename?: 'ResType', type: string, message: string } | null, error?: { __typename?: 'ResType', type: string, message: string } | null } };

export type CommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type CommentsQuery = { __typename?: 'Query', ments: Array<{ __typename: 'Comment', mentId: string, mentText: string, mentCreatedAt: any, mentLiked: number, mentReplied?: string | null, mentPostID: string, mentUser: { __typename?: 'Insu', username: string } }> };

export type PostmentMutationVariables = Exact<{
  mentinp: MentInpType;
}>;


export type PostmentMutation = { __typename?: 'Mutation', postment: { __typename?: 'Resp', data?: { __typename?: 'ResType', type: string, message: string } | null, error?: { __typename?: 'ResType', type: string, message: string } | null } };

export type DelmentMutationVariables = Exact<{
  mentId: Scalars['String'];
}>;


export type DelmentMutation = { __typename?: 'Mutation', delment: { __typename?: 'Resp', data?: { __typename?: 'ResType', type: string, message: string } | null, error?: { __typename?: 'ResType', type: string, message: string } | null } };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', postID: string, postText?: string | null, postLiked: number, postUserID: string, postCreatedAt: any, postUser: { __typename?: 'Insu', username: string }, postContent?: Array<{ __typename?: 'Content', url: string }> | null }> };

export type SinglepostQueryVariables = Exact<{
  postid: Scalars['String'];
}>;


export type SinglepostQuery = { __typename?: 'Query', singlepost: { __typename?: 'Post', postID: string, postText?: string | null, postLiked: number, postCreatedAt: any, postContent?: Array<{ __typename?: 'Content', url: string }> | null, postUser: { __typename?: 'Insu', username: string } } };

export type CreatePostMutationVariables = Exact<{
  postcreateinp: PostCreateInp;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Resp', data?: { __typename?: 'ResType', type: string, message: string } | null, error?: { __typename?: 'ResType', type: string, message: string } | null } };

export type DelpostMutationVariables = Exact<{
  postid: Scalars['String'];
}>;


export type DelpostMutation = { __typename?: 'Mutation', delpost: { __typename?: 'Resp', data?: { __typename?: 'ResType', type: string, message: string } | null, error?: { __typename?: 'ResType', type: string, message: string } | null } };


export const MeDocument = gql`
    query Me {
  me {
    username
    fullname
    posts {
      postID
      postLiked
      postContent {
        url
      }
    }
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const AuserDocument = gql`
    query Auser($username: String!) {
  auser(username: $username) {
    username
    fullname
    posts {
      postID
      postLiked
      postContent {
        url
      }
    }
  }
}
    `;

export function useAuserQuery(options: Omit<Urql.UseQueryArgs<AuserQueryVariables>, 'query'>) {
  return Urql.useQuery<AuserQuery>({ query: AuserDocument, ...options });
};
export const LoginDocument = gql`
    mutation Login($loginInp: loginInp!) {
  login(loginInp: $loginInp) {
    data {
      type
      message
    }
    error {
      type
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($reginp: regInp!) {
  register(reginp: $reginp) {
    data {
      type
      message
    }
    error {
      type
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const RevokerftDocument = gql`
    mutation Revokerft($revokerftId: String!) {
  revokerft(id: $revokerftId) {
    data {
      type
      message
    }
    error {
      type
      message
    }
  }
}
    `;

export function useRevokerftMutation() {
  return Urql.useMutation<RevokerftMutation, RevokerftMutationVariables>(RevokerftDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    data {
      type
      message
    }
    error {
      type
      message
    }
  }
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const CommentsDocument = gql`
    query Comments {
  ments {
    __typename
    mentId
    mentUser {
      username
    }
    mentText
    mentCreatedAt
    mentLiked
    mentReplied
    mentPostID
  }
}
    `;

export function useCommentsQuery(options?: Omit<Urql.UseQueryArgs<CommentsQueryVariables>, 'query'>) {
  return Urql.useQuery<CommentsQuery>({ query: CommentsDocument, ...options });
};
export const PostmentDocument = gql`
    mutation Postment($mentinp: mentInpType!) {
  postment(mentinp: $mentinp) {
    data {
      type
      message
    }
    error {
      type
      message
    }
  }
}
    `;

export function usePostmentMutation() {
  return Urql.useMutation<PostmentMutation, PostmentMutationVariables>(PostmentDocument);
};
export const DelmentDocument = gql`
    mutation Delment($mentId: String!) {
  delment(mentId: $mentId) {
    data {
      type
      message
    }
    error {
      type
      message
    }
  }
}
    `;

export function useDelmentMutation() {
  return Urql.useMutation<DelmentMutation, DelmentMutationVariables>(DelmentDocument);
};
export const PostsDocument = gql`
    query Posts {
  posts {
    postID
    postText
    postLiked
    postUser {
      username
    }
    postContent {
      url
    }
    postUserID
    postCreatedAt
  }
}
    `;

export function usePostsQuery(options?: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const SinglepostDocument = gql`
    query Singlepost($postid: String!) {
  singlepost(postid: $postid) {
    postID
    postText
    postContent {
      url
    }
    postUser {
      username
    }
    postLiked
    postCreatedAt
  }
}
    `;

export function useSinglepostQuery(options: Omit<Urql.UseQueryArgs<SinglepostQueryVariables>, 'query'>) {
  return Urql.useQuery<SinglepostQuery>({ query: SinglepostDocument, ...options });
};
export const CreatePostDocument = gql`
    mutation CreatePost($postcreateinp: postCreateInp!) {
  createPost(postcreateinp: $postcreateinp) {
    data {
      type
      message
    }
    error {
      type
      message
    }
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const DelpostDocument = gql`
    mutation Delpost($postid: String!) {
  delpost(postid: $postid) {
    data {
      type
      message
    }
    error {
      type
      message
    }
  }
}
    `;

export function useDelpostMutation() {
  return Urql.useMutation<DelpostMutation, DelpostMutationVariables>(DelpostDocument);
};