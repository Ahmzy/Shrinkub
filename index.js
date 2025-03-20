let btn = document.getElementById("shorten");
let newURL = document.getElementById("shorturl");
let tooltip = document.querySelector(".tooltiptext");  // Select the tooltip element

// Initially hide the tooltip
tooltip.style.display = "none";

btn.addEventListener('click', short);

newURL.onclick = () => {
    newURL.select();
    window.navigator.clipboard.writeText(newURL.value);

    // Show confirmation text in the tooltip when copied
    tooltip.textContent = "Copied!";
    setTimeout(() => {
        tooltip.textContent = "Click to copy"; // Reset tooltip text after 1.5 seconds
    }, 1500);
}

async function short() {
    let longURL = document.getElementById("longurl").value;
    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longURL)}`);
        const shortURL = await response.text();
        newURL.value = shortURL;

        // Show the tooltip when a URL is generated
        tooltip.style.display = "inline-block";
    } catch (error) {
        console.error('Error shortening URL:', error);
        tooltip.style.display = "none"; // Hide tooltip if the shortening fails
        return null;
    }
}
