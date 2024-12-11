"use client";

import { Card } from '@/components/ui/card';
import { deleteOrder, getOrders } from '@/services/orders';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

const ShowOrders: React.FC = () => {
  const [orders, setOrders] = useState<
    { id: number; bookId: number; customerName: string }[]
  >([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const localToken = localStorage.getItem("accessToken");
      setToken(localToken);

      if (localToken) {
        const fetchedOrders = await getOrders(localToken);

        if (fetchedOrders !== "Failed to get orders") {
          setOrders(fetchedOrders);
        } else {
          alert(fetchedOrders);
        }
      } else {
        alert("Token not found. Please login again.");
      }
    };

    fetchData();
  }, []);

  const deleteFunc = async (orderId: number) => {
    if (!token) {
      alert("Token not found. Please login again.");
      return;
    }

    const data = await deleteOrder(token, orderId);

    if (data !== "Failed to delete order") {
      alert("Order deleted successfully");
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } else {
      alert("Failed to delete order");
    }
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mb-8 text-white">
        Here&apos;s Your Orders
      </h1>

      <div className="grid grid-cols-3 gap-10">
        {orders.map((order) => (
          <Card key={order.id} className="flex gap-10 overflow-hidden">
            <Image
              src={`/book${order.bookId}.png`}
              alt="Book image"
              width={100}
              height={100}
            />

            <div className="flex flex-col gap-4 mt-4">
              <h2 className="text-[14px]">Order Id: {order.id}</h2>
              <p className="font-bold">Book Id: {order.bookId}</p>
              <p>Customer Name: {order.customerName}</p>

              <div className="w-full flex justify-end items-center">
                <Trash2
                  cursor="pointer"
                  onClick={() => {
                    deleteFunc(order.id);
                  }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShowOrders;
