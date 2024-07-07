import React, { useState } from "react";


const App = () => {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");

  const GetShortUrl = async () => {
    try {
      const response = await fetch("http://localhost:8000/url/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });
      const data = await response.json();
      console.log("Response data:", data);
      if (data && data.id) {
        setShortId(data.id);
      } else {
        console.error("shortId not found in response");
      }
    } catch (error) {
      console.error("Error fetching the short URL:", error);
    }
  };

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      <div className="text-4xl font-bold mb-6 text-gray-800">SHORTURL</div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter URL"
            value={url}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={GetShortUrl}
        >
          Create
        </button>
      </div>
      {shortId && (
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mt-6 flex items-center">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
            value={`http://localhost:8000/url/${shortId}`}
            readOnly
          />
          <button
            className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={() => navigator.clipboard.writeText(`http://localhost:8000/url/${shortId}`)}
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
