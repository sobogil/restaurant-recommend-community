import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../services/api'; // 특정 게시물 가져오기 API

const PostDetail = () => {
  const { postId } = useParams(); // URL에서 postId 파라미터 가져오기
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(postId);
        console.log("success");
        setPost(response.data); // API에서 가져온 게시물 데이터 설정
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {/* 기타 게시물 필드 */}
    </div>
  );
};

export default PostDetail;