import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
} from "../api/userApi";
import "../styles/AdminCustomers.css";

function AdminCustomers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search
  const handleSearch = (e) => {
    e.preventDefault();

    setSearch(
      searchText.trim().toLowerCase()
    );
  };

  // Delete customer
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteUser(id);

      alert("Customer deleted successfully!");

      fetchUsers();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete customer."
      );
    }
  };

  // Filter customers
  const filteredUsers = users.filter((user) => {
    const name =
      user.fullName?.toLowerCase() || "";

    const email =
      user.email?.toLowerCase() || "";

    return (
      search === "" ||
      name.includes(search) ||
      email.includes(search)
    );
  });

  if (loading) {
    return (
      <div className="customers-loading">
        <div className="loading-spinner"></div>

        <p>Loading customers...</p>
      </div>
    );
  }

  return (
    <div className="admin-customers-page">

      {/* Header */}
      <div className="customers-page-header">

        <div>
          <h1>Customer Management</h1>

          <p>
            View and manage your registered customers.
          </p>
        </div>

        <div className="customers-count">
          <strong>
            {filteredUsers.length}
          </strong>

          <span>
            {search
              ? "Matching Customers"
              : "Total Customers"}
          </span>
        </div>

      </div>

      {/* Search */}
      <div className="customers-filters">

        <form
          onSubmit={handleSearch}
          className="customer-search-form"
        >
          <input
            type="text"
            placeholder="🔎 Search by name or email..."
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
          />

          <button type="submit">
            Search
          </button>
        </form>

        <button
          type="button"
          className="clear-customer-filter"
          onClick={() => {
            setSearchText("");
            setSearch("");
          }}
        >
          Clear
        </button>

      </div>

      {/* Results */}
      <div className="customers-results">

        Showing{" "}
        <strong>{filteredUsers.length}</strong>{" "}
        of{" "}
        <strong>{users.length}</strong>{" "}
        customers

      </div>

      {/* Empty */}
      {filteredUsers.length === 0 ? (

        <div className="no-customers">

          <div className="no-customers-icon">
            👥
          </div>

          <h2>
            No Customers Found
          </h2>

          <p>
            No customers match your search.
          </p>

        </div>

      ) : (

        <div className="customers-table-wrapper">

          <table className="customers-table">

            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.map((user) => (

                <tr key={user._id}>

                  {/* Customer */}
                  <td>

                    <div className="customer-info">

                      <div className="customer-avatar">
                        {user.fullName
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <strong>
                        {user.fullName}
                      </strong>

                    </div>

                  </td>

                  {/* Email */}
                  <td>
                    {user.email}
                  </td>

                  {/* Role */}
                  <td>

                    <span
                      className={`role-badge ${
                        user.role
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>

                  {/* Date */}
                  <td>
                    {user.createdAt
                      ? new Date(
                          user.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {/* Actions */}
                  <td>

                    {user.role === "admin" ? (

                      <span className="admin-protected">
                        Protected
                      </span>

                    ) : (

                      <button
                        className="delete-customer-btn"
                        onClick={() =>
                          handleDelete(user._id)
                        }
                      >
                        Delete
                      </button>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default AdminCustomers;