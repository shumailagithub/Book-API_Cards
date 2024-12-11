interface Book {
  id: number;
  name: string;
  type: string;
  available: boolean;
}

async function fetchBooks(): Promise<Book[]> {
  const response = await fetch("https://simple-books-api.glitch.me/books");

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
}

// Example usage:
fetchBooks()
  .then((books) => {
    console.log("Fetched books:", books);
  })
  .catch((error) => {
    console.error(error.message);
  });
