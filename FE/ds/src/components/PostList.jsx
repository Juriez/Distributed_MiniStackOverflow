import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function PostList({ token }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [fileExtension, setFileExtension] = useState("c");
  const [showingUserPosts, setShowingUserPosts] = useState(false);
  const [codeSnippets, setCodeSnippets] = useState({});

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const fetchPosts = async () => {
    const res = await fetch(`http://localhost/post`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPosts(data);
    setShowingUserPosts(false);
  };

  const fetchUserPosts = async () => {
    const res = await fetch(`http://localhost/post/mypost`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPosts(data);
    setShowingUserPosts(true);
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

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("fileExtension", fileExtension);
    if (content) {
      formData.append("content", content);
    }
    if (file) {
      formData.append("codeSnippet", file);
    }

    const res = await fetch(`http://localhost/post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      setTitle("");
      setContent("");
      setFile(null);
      alert("Post created successfully");
      fetchPosts();
    } else {
      alert("Error creating post");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">Create a Post</h2>
          <button
            onClick={showingUserPosts ? fetchPosts : fetchUserPosts}
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition"
          >
            {showingUserPosts ? "View Posts by Others" : "View My Posts"}
          </button>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
        />
        <select
          value={fileExtension}
          onChange={(e) => setFileExtension(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        >
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="py">Python</option>
        </select>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 mb-3"
        />
        <button
          onClick={handleCreatePost}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition mb-4"
        >
          Create Post
        </button>
      </div>

      <div className="w-full max-w-xl mt-6">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
          {showingUserPosts ? "My Posts" : "Posts by Others"}
        </h2>
        {posts.length ? (
          posts.map((post) => (
            <div key={post._id} className="bg-white p-4 mb-4 shadow-md rounded-lg">
              <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>

              {post.codeSnippetUrl && (
                <>
                  <button
                    onClick={() => fetchCodeSnippet(post.codeSnippetUrl, post._id)}
                    className="text-blue-500 hover:underline mt-2"
                  >
                    Load Code Snippet
                  </button>
                  {codeSnippets[post._id] && (
                    <pre className="bg-gray-200 text-sm text-gray-800 p-3 rounded-lg mt-2 overflow-auto">
                      <code>{codeSnippets[post._id]}</code>
                    </pre>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
}

PostList.propTypes = {
  token: PropTypes.string.isRequired,
};

export default PostList;
