import Head from 'next/head'
import { PostCard, PostWidget, Categories } from "@/components";
import { getPosts } from '../Services';

const Home = async () => {
  let posts = [];
  try {
    posts = await getPosts();
    console.log(posts)
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Minsung Kim</title>
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
