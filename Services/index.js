import { GraphQLClient, gql, request } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const token = process.env.TOKEN;
const client = new GraphQLClient(graphqlAPI, {
  headers: {
    Authorization: `Bearer ${token}`,
  },    
});

// console.log(token);
// console.log(graphqlAPI);

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  // const result = await request(graphqlAPI, query);
  const result = await client.request(query)
  // console.log('Raw GraphQL response:', result);
  return result.postsConnection.edges;
};

// export const getPostDetails = async (slug) => {
//   const query = gql`
//     query GetPostDetails($slug : String!) {
//       post(where: {slug: $slug}) {
//         title
//         excerpt
//         featuredImage {
//           url
//         }
//         author{
//           name
//           bio
//           photo {
//             url
//           }
//         }
//         createdAt
//         slug
//         content {
//           raw
//         }
//         categories {
//           name
//           slug
//         }
//       }
//     }
//   `;

//   // const result = await request(graphqlAPI, query, { slug });
//   const result = await client.request(query, { slug })

//   return result.post;
// };

export const getRecentPosts = async () => {
  const query = gql`
    query GetRecentPosts {
      posts(orderBy: createdAt_DESC, first: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await client.request(query);
  // console.log(result)
  return result.posts;
};

// export const getRecentPosts = async () => {
//   const query = gql`
//     query GetRecentPosts {
//       postsConnection(orderBy: createdAt_DESC, first: 3) {
//         edges {
//           node {
//             title
//             slug
//             featuredImage {
//               url
//             }
//             createdAt
//           }
//         }
//       }
//     }
//   `;
//   const result = await client.request(query);
//   return result.postsConnection.edges.map(edge => edge.node);
// };

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await client.request(query, { slug, categories });
  console.log(result)
  return result.posts;
};



// export const getCategories = async () => {
//   const query = gql`
//     query GetGategories {
//         categories {
//           name
//           slug
//         }
//     }
//   `;

//   const result = await request(graphqlAPI, query);

//   return result.categories;
// };





// export const getAdjacentPosts = async (createdAt, slug) => {
//   const query = gql`
//     query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
//       next:posts(
//         first: 1
//         orderBy: createdAt_ASC
//         where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
//       ) {
//         title
//         featuredImage {
//           url
//         }
//         createdAt
//         slug
//       }
//       previous:posts(
//         first: 1
//         orderBy: createdAt_DESC
//         where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
//       ) {
//         title
//         featuredImage {
//           url
//         }
//         createdAt
//         slug
//       }
//     }
//   `;

//   const result = await request(graphqlAPI, query, { slug, createdAt });

//   return { next: result.next[0], previous: result.previous[0] };
// };

// export const getCategoryPost = async (slug) => {
//   const query = gql`
//     query GetCategoryPost($slug: String!) {
//       postsConnection(where: {categories_some: {slug: $slug}}) {
//         edges {
//           cursor
//           node {
//             author {
//               bio
//               name
//               id
//               photo {
//                 url
//               }
//             }
//             createdAt
//             slug
//             title
//             excerpt
//             featuredImage {
//               url
//             }
//             categories {
//               name
//               slug
//             }
//           }
//         }
//       }
//     }
//   `;

//   const result = await request(graphqlAPI, query, { slug });

//   return result.postsConnection.edges;
// };

// export const getFeaturedPosts = async () => {
//   const query = gql`
//     query GetCategoryPost() {
//       posts(where: {featuredPost: true}) {
//         author {
//           name
//           photo {
//             url
//           }
//         }
//         featuredImage {
//           url
//         }
//         title
//         slug
//         createdAt
//       }
//     }   
//   `;

//   const result = await request(graphqlAPI, query);

//   return result.posts;
// };

// export const submitComment = async (obj) => {
//   const result = await fetch('/api/comments', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(obj),
//   });

//   return result.json();
// };

// export const getComments = async (slug) => {
//   const query = gql`
//     query GetComments($slug:String!) {
//       comments(where: {post: {slug:$slug}}){
//         name
//         createdAt
//         comment
//       }
//     }
//   `;

//   const result = await request(graphqlAPI, query, { slug });

//   return result.comments;
// };


