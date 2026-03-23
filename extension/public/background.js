// Listen for messages from content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "analyze") {
        console.log("Background received URL to analyze:", request.url);
        
        // Send the URL to our Python FastAPI backend
        fetch("http://localhost:8000/analyze-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image_url: request.url })
        })
        .then(res => res.json())
        .then(data => {
            console.log("Backend response:", data);
            sendResponse(data);
        })
        .catch(err => {
            console.error("Error connecting to backend:", err);
            sendResponse({ error: "Backend connection failed" });
        });
        
        // Return true to tell Chrome we will send the response asynchronously
        return true; 
    }
});