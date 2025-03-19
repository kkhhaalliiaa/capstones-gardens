import { useEffect, useState } from "react";
import { Trash2, CheckCircle, User, MessageSquare } from "lucide-react";
import axios from "axios";
import "../../public/css/Admin.css";

const API_BASE_URL = "http://localhost:3002";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState("comments");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/users`);
      console.log("Fetched Users:", res.data);
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/comments`);
      console.log("Fetched Comments:", res.data);
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${API_BASE_URL}/comments/${commentId}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    console.log(
      "Current User Role ID:",
      JSON.parse(localStorage.getItem("user"))?.role_id
    ); // Debugging log
    fetchUsers();
    fetchComments();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-main-content">
        <div className="admin-tab-container">
          <button
            className={`admin-tab-button ${
              activeTab === "comments" ? "admin-tab-active" : ""
            }`}
            onClick={() => setActiveTab("comments")}
          >
            <div className="admin-tab-button-content">
              <MessageSquare className="admin-icon" />
              Comments
            </div>
          </button>
          <button
            className={`admin-tab-button ${
              activeTab === "users" ? "admin-tab-active" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            <div className="admin-tab-button-content">
              <User className="admin-icon" />
              Users
            </div>
          </button>
        </div>

        {/* Comments Section */}
        {activeTab === "comments" && (
          <div className="admin-section-container">
            <h2 className="admin-section-title">Recent Comments</h2>
            <div className="admin-section-content">
              {comments.length > 0 ? (
                <div className="admin-comments-list">
                  {comments.map((comment) => (
                    <div key={comment.id} className="admin-comment-card">
                      <div className="admin-comment-header">
                        <p className="admin-user-name">{comment.name}</p>
                        <p className="admin-comment-date">
                          {new Date(comment.created_at).toLocaleString()}
                        </p>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="admin-delete-button"
                          aria-label="Delete comment"
                        >
                          <Trash2 className="admin-icon" />
                        </button>
                      </div>
                      <p className="admin-comment-content">{comment.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="admin-empty-message">No comments to display</p>
              )}
            </div>
          </div>
        )}

        {/* Users Section */}
        {activeTab === "users" && (
          <div className="admin-section-container">
            <h2 className="admin-section-title">User Management</h2>
            <div className="admin-section-content">
              {users.length > 0 ? (
                <table className="admin-users-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Join Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.user_id}>
                        <td className="admin-user-name-cell">
                          {user.first_name} {user.last_name}
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <span
                            className={`admin-badge ${
                              user.role_id === 1
                                ? "admin-role-badge"
                                : "admin-member-badge"
                            }`}
                          >
                            {user.role_id === 1 ? "Admin" : "User"}
                          </span>
                        </td>
                        <td>{new Date(user.join_date).toLocaleDateString()}</td>
                        <td>
                          <span
                            className={`admin-badge ${
                              user.status === "Active"
                                ? "admin-active-badge"
                                : "admin-inactive-badge"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteUser(user.user_id)}
                            className="admin-delete-button"
                            aria-label="Delete user"
                          >
                            <Trash2 className="admin-icon" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="admin-empty-message">No users to display</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
