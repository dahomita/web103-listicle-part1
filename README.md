# WEB103 Project 1 - Listicle Part 1

Submitted by: **Tam Dang**

About this web app: **This app is a list-based web application that helps users discover local music events. Users can browse events on the home page and click each event to view a detailed page with full information.**

Time spent: **2** hours

---

## Required Features

The following **required** functionality is completed:

- [x] The web app uses only HTML, CSS, and JavaScript without a frontend framework
- [x] The web app displays a title
- [x] The web app displays at least five unique list items, each with at least three displayed attributes
- [x] The user can click on each item in the list to see a detailed view of it, including all fields
- [x] Each detail view is a unique endpoint (for example, `/items/acoustic-night`)
- [x] The web app serves an appropriate 404 page when no matching route is defined
- [x] The web app is styled using PicoCSS

---

## Video Walkthrough

Here's a walkthrough of implemented required features:

![Video Walkthrough](https://imgur.com/a/qmcZEGw)

---

## Notes

Describe any challenges encountered while building the app:

- I structured shared attributes for all event items so they can later map cleanly to a database schema.
- I used Express routing with `/:slug` style detail pages and tested unmatched routes to ensure a proper 404 page.

---

## License

Copyright [2026] [Tam Dang]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

<http://www.apache.org/licenses/LICENSE-2.0>
