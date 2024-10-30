import Book from "../models/bookModel.js";

// Create Books
const createBook = async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.status(400).json({ error: "You are not allowed" });

    const { title, coverPage, author, genre, publicationDate, bio } = req.body;
    if (!title || !coverPage || !author || !genre || !publicationDate)
      return res.status(400).json({ error: "Fill all required fields" });

    const newBook = new Book({
      title,
      coverPage,
      author,
      genre,
      publicationDate,
      bio,
    });
    await newBook.save();

    res.status(200).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in createBook:", error.message);
  }
};

// Update Book
const updateBook = async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.status(400).json({ error: "You are not allowed" });
    const { title, coverPage, author, genre, publicationDate, bio } = req.body;
    const bookId = req.params.id;

    const dbBook = await Book.findById(bookId);
    if (!dbBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    dbBook.title = title || dbBook.title;
    dbBook.coverPage = coverPage || dbBook.coverPage;
    dbBook.author = author || dbBook.author;
    dbBook.genre = genre || dbBook.genre;
    dbBook.publicationDate = publicationDate || dbBook.publicationDate;
    dbBook.bio = bio || dbBook.bio;

    const updateBook = await dbBook.save();

    res.status(200).json(updateBook);
  } catch (error) {
    console.log("Error in updateBook:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export { createBook, updateBook };
// //Logout User
// const getUsers = async (req, res) => {
//   try {
//   } catch (error) {
//     console.log("Error in getUsers:", error.message);
//     return res.status(500).json({ error: error.message });
//   }
// };
