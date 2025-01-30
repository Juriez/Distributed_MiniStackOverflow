import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NotificationList({ token }) {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  const fetchNotifications = async () => {
    const res = await fetch(`http://localhost/notification`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setNotifications(data);
  };

  const markAsViewed = async (id) => {
    await fetch(`http://localhost/notification/${id}/view`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotifications();
  };

  const viewPost = (pid, nid) => {
    markAsViewed(nid);
    navigate(`/post/${pid}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Notifications</h2>
        
        {notifications.length ? (
          notifications.map(notification => (
            <div
              key={notification._id}
              className={`p-4 mb-3 flex justify-between items-center rounded-lg shadow-md transition-all ${
                notification.viewed ? 'bg-gray-200' : 'bg-gray-50'
              }`}
            >
              <p className="text-gray-800">{notification.message}</p>
              <button
                onClick={() => viewPost(notification.postId, notification._id)}
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition duration-300"
              >
                View Post
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No notifications available.</p>
        )}
      </div>
    </div>
  );
}

NotificationList.propTypes = {
  token: PropTypes.string.isRequired,
};

export default NotificationList;
