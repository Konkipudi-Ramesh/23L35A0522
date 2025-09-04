import express from "express"
import { createShortUrl, redirectUrl, getStats } from "./control.js"

const app = express()
app.use(express.json()) // needed to read JSON body from Postman

// Routes
app.post("/create", createShortUrl)       // Create short URL
app.get("/:shortcode", redirectUrl)       // Redirect
app.get("/stats/:shortcode", getStats)    // Stats

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000")
})
