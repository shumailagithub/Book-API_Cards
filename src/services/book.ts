async function fetchBooks(p0: string){
    const books = await fetch('https://simple-books-api.glitch.me/books');
    if(books.ok){
        "failed to fetch books"

    }
    return books.json();
}