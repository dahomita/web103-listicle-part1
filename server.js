const express = require("express");
const pool = require("./server/config/db.js");

const app = express();
const PORT = 3000;

function renderNotFoundPage(message, linkText = "Go home", linkHref = "/") {
  return `
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
          <h1>404 - Not Found</h1>
          <p>${message}</p>
          <a href="${linkHref}">${linkText}</a>
        </main>
      </body>
    </html>
  `;
}
app.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let queryText = "SELECT * FROM events ORDER BY id ASC";
    let queryParams = [];
    if (category) {
      queryText = `
        SELECT * FROM events
        WHERE category ILIKE $1
        ORDER BY id ASC
      `;
      queryParams = [`%${category}%`];
    }
    const result = await pool.query(queryText, queryParams);
    const items = result.rows;
    const cards = items
      .map(
        (item) => `
      <article>
        <h3><a href="/items/${item.slug}">${item.title}</a></h3>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Venue:</strong> ${item.venue}</p>
        <p>${item.description}</p>
        <img src="${item.image}" alt="${item.title}" />
      </article>
    `,
      )
      .join("");
    res.send(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Discover Local Music</title>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
          />
        </head>
        <body>
          <main class="container">
            <h1>Discover Local Music</h1>
            <p>Find upcoming music events around campus and town.</p>
            <form method="GET" action="/">
              <label for="category">Search by category</label>
              <input
                id="category"
                name="category"
                type="text"
                placeholder="e.g. Jazz"
                value="${category || ""}"
              />
              <button type="submit">Search</button>
            </form>
            ${cards || "<p>No events found.</p>"}
          </main>
        </body>
      </html>
    `);
  } catch (err) {
    console.error("Error loading home page:", err);
    res.status(500).send("Internal Server Error");
  }
});
// Detail page
app.get("/items/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query("SELECT * FROM events WHERE slug = $1", [
      slug,
    ]);
    const item = result.rows[0];
    if (!item) {
      return res
        .status(404)
        .send(
          renderNotFoundPage(
            "We couldn't find that event.",
            "Back to all events",
            "/",
          ),
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
            <p><strong>Date & Time:</strong> ${item.date_time}</p>
            <p><strong>Ticket Price:</strong> ${item.ticket_price}</p>
            <p>${item.description}</p>
          </main>
        </body>
      </html>
    `);
  } catch (err) {
    console.error("Error loading detail page:", err);
    res.status(500).send("Internal Server Error");
  }
});
// Catch-all 404
app.use((req, res) => {
  res.status(404).send(renderNotFoundPage("This route does not exist."));
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
