import express from "express"
import { createBook, deleteBook, getBook, getBooks, updateBook } from "../controllers/bookController.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router()

router.get("/getbook/:id",protectRoute,getBook)
router.get("/getbooks",protectRoute,getBooks)
router.post("/create",protectRoute,createBook)
router.post("/update/:id",protectRoute,updateBook)
router.delete("/delete/:id",protectRoute,deleteBook)

export default router