const express = require("express");
const items = require("./data/items");

const app = express();
const PORT = 3000;

//Home
app.get("/", (req, res) => {
  const cards = items
    .map(
      (item) => `
    <article>
    <h3>
    <a href="/items/${item.slug}">${item.title}</a>
    </h3>
    <p><strong>Category:</strong> ${item.category}</p>
    <p><strong>Venue:</strong> ${item.venue}</p>
    <p>${item.description}</p>
    <img src="${item.image}" alt="${item.title}"/>
    </article>
    `,
    )
    .join("");

  res.send(`
    <!doctype html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discover Local Music</title>
    <link rel="stylesheet"           
    href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
>
    </head> 
    <body>
    <main class="cointer">
    <h1>Discover Local Music</h1>
    <p>Find upcoming music events around campus and town.</p>
    ${cards}
    </main>
    </body>
    </html>
    `);
});

//Detail Page
app.get("/items/:slug", (req, res) => {
  const item = items.find((item) => item.slug === req.params.slug);

  if (!item) {
    return res.status(404).send(
      `
            <!doctype html>
            <html lang="en">
            <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>404 - Not Found</title>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
          />
        </head>
        <body>
          <main class="container">
            <h1>404 - Item Not Found</h1>
            <p>We couldn't find that event.</p>
            <a href="/">Back to all events</a>
          </main>
        </body>
            </html>
            `,
    );
  }
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${item.title}</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
        />
      </head>
      <body>
        <main class="container">
          <a href="/">← Back to list</a>
          <h1>${item.title}</h1>
          <img src="${item.image}" alt="${item.title}" />
          <p><strong>Category:</strong> ${item.category}</p>
          <p><strong>Venue:</strong> ${item.venue}</p>
          <p><strong>Date & Time:</strong> ${item.dateTime}</p>
          <p><strong>Ticket Price:</strong> ${item.ticketPrice}</p>
          <p>${item.description}</p>
        </main>
      </body>
    </html>
  `);
});

// Catch-all 404 route
app.use((req, res) => {
  res.status(404).send(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>404 - Not Found</title>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
          />
        </head>
        <body>
          <main class="container">
            <h1>404 - Page Not Found</h1>
            <p>This route does not exist.</p>
            <a href="/">Go home</a>
          </main>
        </body>
      </html>
    `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
