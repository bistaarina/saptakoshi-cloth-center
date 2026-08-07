import API from "./api";

// Place Order
export const placeOrder = async (orderData) => {
  const res = await API.post("/orders", orderData);
  return res.data;
};

// Get All Orders
export const getOrders = async () => {
  const res = await API.get("/orders");
  return res.data;
};

// Get My Orders
export const getMyOrders = async (userId) => {
  const res = await API.get(`/orders/user/${userId}`);
  return res.data;
};

// Update Order Status
export const updateOrderStatus = async (id, status) => {
  const res = await API.put(`/orders/${id}`, {
    status,
  });

  return res.data;
};

// Cancel Order
export const cancelOrder = async (id) => {
  const res = await API.put(`/orders/cancel/${id}`);
  return res.data;
};

// Delete Order
export const deleteOrder = async (id) => {
  const res = await API.delete(`/orders/${id}`);
  return res.data;
};
