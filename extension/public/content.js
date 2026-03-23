function scanImages() {
    const images = document.querySelectorAll('img');
    console.log(`Media Scanner: Found ${images.length} images on this page.`);

    images.forEach((img) => {
        if (img.width < 100 || img.height < 100 || !img.src) return; 

        chrome.runtime.sendMessage(
            { action: "analyze", url: img.src }, 
            (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Extension Error:", chrome.runtime.lastError.message);
                    return;
                }

                if (response && response.label) {
                    addBadge(img, response.label, response.confidence);
                }
            }
        );
    });
}

function addBadge(img, label, confidence) {
    if (img.parentNode.querySelector('.media-badge')) return;

    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';
    
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    
    const badge = document.createElement('div');
    badge.className = `media-badge badge-${label}`;
    badge.innerText = `${label.toUpperCase()} (${(confidence * 100).toFixed(0)}%)`;
    
    wrapper.appendChild(badge);
}

// Wait 2 seconds for images to load on news sites
window.addEventListener('load', () => {
    setTimeout(scanImages, 2000); 
});