export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '{Path_name}' && url.searchParams.get('id') === '{ID}') {
      
      const PASSWORD = '{Your_Password}';
      const COOKIE_NAME = 'lofi_unlocked';
      
      const cookieHeader = request.headers.get('Cookie') || '';
      if (cookieHeader.includes(`${COOKIE_NAME}=true`)) {
        return fetch(request);
      }

      let isError = false;

      if (request.method === 'POST') {
        const formData = await request.formData();
        const enteredPassword = formData.get('password');

        if (enteredPassword === PASSWORD) {
          return new Response('Success! Reloading...', {
            status: 302,
            headers: {
              'Location': url.toString(),
              'Set-Cookie': `${COOKIE_NAME}=true; Path=/; HttpOnly; Max-Age=86400`
            }
          });
        } else {
          isError = true;
        }
      }
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Access Restricted</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background-color: #121212;
              color: #ffffff;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .login-box {
              background: #1e1e1e;
              padding: 40px;
              border-radius: 12px;
              box-shadow: 0 8px 24px rgba(0,0,0,0.5);
              text-align: center;
              max-width: 320px;
              width: 100%;
            }
            h2 { margin-top: 0; font-size: 22px; margin-bottom: 20px; }
            p { color: #aaaaaa; font-size: 14px; margin-bottom: 20px; }
            input[type="password"] {
              width: 100%;
              padding: 12px;
              margin-bottom: 20px;
              border: 1px solid #333;
              border-radius: 6px;
              background: #2a2a2a;
              color: white;
              box-sizing: border-box;
              font-size: 16px;
            }
            input[type="password"]:focus { outline: none; border-color: #007bff; }
            button {
              background-color: #007bff;
              color: white;
              border: none;
              padding: 12px 20px;
              width: 100%;
              border-radius: 6px;
              cursor: pointer;
              font-size: 16px;
              font-weight: bold;
              transition: background 0.2s;
            }
            button:hover { background-color: #0056b3; }
            .error { color: #ff4d4f; font-size: 14px; margin-bottom: 15px; background: rgba(255,77,79,0.1); padding: 10px; border-radius: 6px; }
          </style>
        </head>
        <body>
          <div class="login-box">
            <h2>Private Livestream</h2>
            <p>Please enter a password to view the stream</p>
            ${isError ? '<div class="error">The password was incorrect</div>' : ''}
            <form method="POST" action="">
              <input type="password" name="password" placeholder="Enter password" required autofocus>
              <button type="submit">Unlock</button>
            </form>
          </div>
        </body>
        </html>
      `;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
      });
    }
    return fetch(request);
  }
};
