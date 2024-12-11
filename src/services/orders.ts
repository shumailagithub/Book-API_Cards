"use server";

interface Order {
  id: string;
  bookId: string | number;
  customerName: string;
}

interface PlaceOrderResponse {
  orderId: string;
  message: string;
}

//--------------------------------------Place order
export async function placeOrders(
  token: string,
  bookId: string | number,
  clientName: string
): Promise<PlaceOrderResponse | string> {
  const response = await fetch("https://simple-books-api.glitch.me/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      bookId,
      customerName: clientName,
    }),
  });

  if (response.status !== 201) {
    return "Failed to place order";
  }

  const data: PlaceOrderResponse = await response.json();
  return data;
}

//---------------------------------------Get orders
export async function getOrders(token: string): Promise<Order[] | string> {
  const response = await fetch("https://simple-books-api.glitch.me/orders", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return "Failed to get orders";
  }

  const data: Order[] = await response.json();
  return data;
}

//---------------------------------------Delete order
export async function deleteOrder(
  token: string,
  orderId: string | number
): Promise<string> {
  const response = await fetch(
    `https://simple-books-api.glitch.me/orders/${orderId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    return "Failed to delete order";
  }

  return "Order deleted successfully";
}
