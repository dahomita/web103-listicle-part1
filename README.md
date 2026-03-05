# WEB103 Project 2 - Discover Local Music

Submitted by: **Tam Dang**

About this web app: **Discover Local Music is a list-based web app that displays local music events from a PostgreSQL database. Users can browse events on the home page and click each event to view a detailed page.**

Time spent: **1** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured database table for the list items**
  - [x] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command `SELECT * FROM events;` to display your table contents.**

The following **optional** features are implemented:

- [x] The user can search for items by a specific attribute (category)

The following **additional** features are implemented:

- [x] Custom 404 page for unknown routes and missing item detail pages
- [x] Detail pages use slug-based routes (`/items/:slug`)
- [x] Styled with PicoCSS for clean, responsive layout

## Video Walkthrough

Here's a walkthrough of implemented required features:

![Video Walkthrough](https://imgur.com/a/qmcZEGw)

GIF created with **Kap**

## Notes

A key challenge was configuring PostgreSQL connection settings with Render, especially SSL requirements.  
Another challenge was moving from in-memory list data to SQL queries while preserving the same route structure and UI from Part 1.

## License

Copyright [2026] [Tam Dang]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
