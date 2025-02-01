import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SinglePost = ({ token }) => {
  const { postId } = useParams(); 
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [codeSnippets, setCodeSnippets] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`http://localhost/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCodeSnippet = async (url, postId) => {
    try {
      const res = await fetch(url);
      const content = await res.text();
      setCodeSnippets((prev) => ({ ...prev, [postId]: content }));
    } catch (error) {
      console.error("Error fetching code snippet:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-900 to-purple-700">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-900 to-purple-700">
        <p className="text-gray-200 text-lg">Post not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-purple-700 p-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h2>

        {post.codeSnippetUrl && (
          <>
            <button
              onClick={() => fetchCodeSnippet(post.codeSnippetUrl, post._id)}
              className="mb-4 text-blue-500 hover:underline"
            >
              Load Code Snippet
            </button>
            {codeSnippets[post._id] && (
              <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm overflow-auto max-h-60">
                <code>{codeSnippets[post._id]}</code>
              </pre>
            )}
          </>
        )}

        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

SinglePost.propTypes = {
  token: PropTypes.string.isRequired,
};

export default SinglePost;
