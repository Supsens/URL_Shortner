const shortid = require("shortid");
const URL = require("../models/url.js");

async function handleGenerateNewShortURL(req, res) {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'url is required' });

    try {
        let shortID = shortid.generate();
        
        // Check if a document with this shortId already exists
        let existingURL = await URL.findOne({ shortId: shortID });
        
        // If it exists, generate a new shortId and try again
        while (existingURL) {
            shortID = shortid.generate();
            existingURL = await URL.findOne({ shortId: shortID });
        }
        
        const newURL = new URL({
            shortId: shortID,
            redirectURL: url,
            visitHistory: [],
        });

        console.log("Attempting to save URL:", newURL);
        
        const savedURL = await newURL.save();
        
        console.log("URL saved successfully:", savedURL);

        return res.status(201).json({ id: shortID, savedURL });
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

async function handleGetURL(req, res) {
    const { shortId } = req.params;
    try {
        const entry = await URL.findOne({ shortId });
        if (entry) {
            // Increment visit count
            entry.visitHistory.push({ timestamp: Date.now() });
            await entry.save();
            
            // Redirect to the original URL
            return res.redirect(entry.redirectURL);
        } else {
            return res.status(404).json({ error: 'Short URL not found' });
        }
    } catch (error) {
        console.error("Error retrieving URL:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { handleGenerateNewShortURL, handleGetURL };