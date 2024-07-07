const express = require("express");
const router = require("./routes/url.js");  // Changed this line
const { connectdb } = require("./connect.js");
const cors=require("cors")

const app = express();
app.use(cors());
// Middleware
app.use(express.json());

// Connect to database
connectdb();

// Routes
app.use("/url", router);  // This should now work correctly

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server started at PORT:${PORT}`);
});