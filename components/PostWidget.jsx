// "use client";
// import React, { useState, useEffect } from 'react';
// import moment from 'moment';
// import Link from 'next/link';
// import Image from 'next/image';
// import { getSimilarPosts, getRecentPosts } from '../services';


// const PostWidget = ({ categories, slug }) => {
//   const [relatedPosts, setRelatedPosts] = useState([]);

//   useEffect(() => {
//     if (slug) {
//       getSimilarPosts(categories, slug).then((result) => {
//         setRelatedPosts(result);
//       });
//     } else {
//       getRecentPosts().then((result) => {
//         setRelatedPosts(result);
//       });
//     }
//   }, [slug, categories]);

//   return (
//     <div className="bg-white bg-opacity-10 text-white backdrop-filter backdrop-blur-sm shadow-lg rounded-lg p-8 pb-12 mb-8">
//       <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
//       {relatedPosts.map((post, index) => (
//         <div key={index} className="flex items-center w-full mb-4">
//           <div className="w-16 flex-none">
//             <Image
//               // loader={grpahCMSImageLoader}
//               alt={post.title}
//               height="60px"
//               width="60px"
//               unoptimized
//               className="align-middle rounded-full"
//               src={post.featuredImage.url}
//             />
//           </div>
//           <div className="flex-grow ml-4">
//             <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
//             <Link href={`/post/${post.slug}`} className="text-md" key={index}>{post.title}</Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostWidget

"use client";
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { getSimilarPosts, getRecentPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      }).catch(error => console.error('Error fetching similar posts:', error));
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      }).catch(error => console.error('Error fetching recent posts:', error));
    }
  }, [slug, categories]);


  return (
    <div className="bg-white bg-opacity-10 text-white backdrop-filter backdrop-blur-sm shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <Image
              alt={post.title}
              height="60px"
              width="60px"
              unoptimized
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <Link href={`/post/${post.slug}`} className="text-md">{post.title}</Link>
          </div>
        </div>
      )
      )}
    </div>
  );
};

export default PostWidget;
