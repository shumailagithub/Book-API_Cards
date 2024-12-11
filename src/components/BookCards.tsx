"use client";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { fetchBooks } from "@/services/api";
import Link from "next/link";

// Define a type for the book structure
interface Book {
  id: number;
  name: string;
  type: string;
  available: boolean;
}

interface BookCardsProps {
  href: string;
  func: (id: number) => void;
}

function BookCards({ href, func }: BookCardsProps) {
  // State now uses the Book type
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const books = await fetchBooks();
      setBooks(books);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-10">
        {books.map((book, index) => (
          <Card
            key={index}
            className="flex gap-6 hover:scale-[1.02] duration-200 overflow-hidden"
          >
            <Image
              src={`/book${book.id}.png`}
              alt="Book image"
              width={100}
              height={100}
            />

            <div className="relative w-full flex flex-col gap-4 text-start">
              <h2 className="text-[24px] font-bold">{book.name}</h2>
              <p>{book.type}</p>
              <p
                className={book.available ? "text-green-500" : "text-red-500"}
              >
                {book.available ? "Available" : "Not Available"}
              </p>

              <div className="absolute bottom-0 right-0 p-2">
                <Link href={href}>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      func(book.id);
                    }}
                  >
                    Place an Order
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default BookCards;
