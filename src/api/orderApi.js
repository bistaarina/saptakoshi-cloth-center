import API from "./api";

// Place Order
export const placeOrder = async (orderData) => {
  const response = await API.post("/orders", orderData);
  return response.data;
};

// Get All Orders
export const getOrders = async () => {
  const response = await API.get("/orders");
  return response.data;
};

// Get My Orders
export const getMyOrders = async (userId) => {
  const response = await API.get(`/orders/user/${userId}`);
  return response.data;
};

// Update Order Status
export const updateOrderStatus = async (id, status) => {
  const response = await API.put(`/orders/${id}`, { status });
  return response.data;
};

// Cancel Order
export const cancelOrder = async (id) => {
  const response = await API.put(`/orders/cancel/${id}`);
  return response.data;
};

// Delete Order
export const deleteOrder = async (id) => {
  const response = await API.delete(`/orders/${id}`);
  return response.data;
};