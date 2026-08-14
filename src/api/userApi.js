import API from "./api";

// Get all customers
export const getUsers = async () => {
  const response = await API.get("/users");
  return response.data;
};

// Delete customer
export const deleteUser = async (id) => {
  const response = await API.delete(`/users/${id}`);
  return response.data;
};