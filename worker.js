addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

function paymentHTML(qrImageUrl, upiLink, amount) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pay to Samarth</title>
    <link href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: "Balsamiq Sans", cursive;
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #440a67, #330867, #200441);
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .container {
        max-width: 450px;
        padding: 30px;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 16px;
        box-shadow: 0 0 30px rgba(255, 0, 255, 0.8), 0 0 60px rgba(255, 0, 255, 0.8), inset 0 0 20px rgba(255, 0, 255, 0.5);
      }

      h1 {
        text-align: center;
        margin-bottom: 30px;
      }

      #qrCode {
        text-align: center;
        margin-top: 30px;
        border: 2px solid #6b146d;
        padding: 10px;
        border-radius: 8px;
        background-color: #330867;
      }

      #qrCode img {
        max-width: 100%;
        height: auto;
      }

      #payButton {
        text-align: center;
        margin-top: 30px;
      }

      #notFound {
        font-size: 1.5rem;
        font-weight: bold;
        color: white;
        background-color: red;
        padding: 8px 25px;
        margin-top: 30px;
        border-radius: 3px;
        text-align: center;
        box-shadow: 0 0 5px red, 0 0 10px red, 0 0 20px red, 0 0 30px red;
        animation: glow 1.5s infinite;
      }

      @keyframes glow {
        0% {
          box-shadow: 0 0 5px red, 0 0 10px red, 0 0 15px red, 0 0 20px red;
        }
        50% {
          box-shadow: 0 0 10px red, 0 0 30px red, 0 0 40px red, 0 0 50px red;
        }
        100% {
          box-shadow: 0 0 5px red, 0 0 10px red, 0 0 15px red, 0 0 20px red;
        }
      }

      #payButton a {
        color: #fff;
        text-decoration: none;
        border: none;
        padding: 15px 30px;
        border-radius: 8px;
        background: linear-gradient(135deg, #ae5aea, #6b146d);
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.3);
        display: inline-block;
        font-weight: 600;
      }

      #payButton a:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.6), 0 14px 32px rgba(0, 0, 0, 0.4);
      }

      .upiId {
        text-align: center;
        margin-top: 20px;
        font-size: 18px;
        font-weight: 600;
        border: 2px solid #6b146d;
        padding: 10px;
        border-radius: 8px;
      }
      
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Pay to Samarth</h1>
      ${amount ? `<div class="upiId">Pay Amt: Rs. ${amount}</div>` : ''}
      <div id="qrCode">
        <img src="${qrImageUrl}" alt="QR Code" draggable="false">
      </div>
      <div id="payButton">
        <a href="${upiLink}" id="payLink">Pay Now</a>
      </div>
    </div>
    <script>
      document.getElementById('payLink').click();
      history.replaceState({}, document.title, location.pathname);
    </script>
  </body>
</html>
  `;
}

function landingHTML() {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generate Payment URL</title>
    <link href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: "Balsamiq Sans", cursive;
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #440a67, #330867, #200441);
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
  
      .container {
        max-width: 450px;
        padding: 30px;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 16px;
        box-shadow: 0 0 30px rgba(255, 0, 255, 0.8), 0 0 60px rgba(255, 0, 255, 0.8), inset 0 0 20px rgba(255, 0, 255, 0.5);
      }
  
      h1 {
        text-align: center;
        margin-bottom: 30px;
      }
  
      label {
        display: block;
        margin-top: 10px;
      }
  
      input {
        width: calc(100% - 22px);
        padding: 10px;
        margin-top: 5px;
        border-radius: 8px;
        border: 2px solid #6b146d;
        background-color: #330867;
        color: #fff;
      }
  
      #generateButton {
        text-align: center;
        margin-top: 30px;
      }
  
      #generateButton button {
        font-family: "Balsamiq Sans", cursive;
        color: #fff;
        text-decoration: none;
        border: none;
        padding: 15px 30px;
        border-radius: 8px;
        background: linear-gradient(135deg, #ae5aea, #6b146d);
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.3);
        display: inline-block;
        font-weight: 600;
      }
  
      #generateButton button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.6), 0 14px 32px rgba(0, 0, 0, 0.4);
      }
  
      #generatedURLContainer {
        margin-top: 20px;
        padding: 10px;
        border: 2px solid #6b146d;
        border-radius: 8px;
        background-color: #330867;
        display: none;
        position: relative;
        word-wrap: break-word;
      }
  
      #generatedURL {
        text-align: left;
        margin: 0;
        background-color: rgba(0, 0, 0, 0.7);
        color: #fff;
      }
  
      #copyButton {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 16px;
      }
  
      #copyButton:hover {
        transform: translateY(-52
