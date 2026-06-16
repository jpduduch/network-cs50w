# CS50w Project 4 — Network

A customized project from CS50w's Threads/Twitter-style social network built with **Django** on the backend and **React + Vite** on the frontend.

> Developed as part of [CS50's Web Programming with Python and JavaScript](https://cs50.harvard.edu/web/).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Django, Python |
| Frontend | React, Vite |
| Database | SQLite (development) |
| Styling | CSS / Bootstrap |

---

## Project Structure

```
project4/
├── manage.py
├── project4/           # Django settings
├── network/            # main app
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   ├── templates/
│   └── static/
│       └── network/
│           └── react/ # ← Vite compiled output (auto-generated)
└── frontend/           # React source code
    ├── src/
    │   └── main.jsx
    ├── vite.config.js
    └── package.json
```
