# IdeaHub 🌟

[![Node.js](https://img.shields.io/badge/Node.js-v20-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-v4.18-blue?logo=express)](https://expressjs.com/)
[![HTML5](https://img.shields.io/badge/HTML5-orange?logo=html5)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-blue?logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Phase 2 Complete](https://img.shields.io/badge/Phase%202-Complete-brightgreen)](#)

A full-stack web application to **share, store, and track original ideas**.  
Built as a personal MVP to prevent good ideas from getting lost or stolen, with focus on **security, usability, and originality tracking**.  

---

## 🧩 Overview

IdeaHub allows users to:

- Sign up and log in with **hashed passwords** (bcryptjs)  
- Submit ideas securely with **timestamps for originality proof**  
- Prevent unauthorized submissions (login required)  
- Track ideas by user and submission time  
- Serve as a foundation for future enhancements like voting, dashboards, and premium features  

---

## 💻 Tech Stack

- **Frontend:** HTML, CSS  
- **Backend:** Node.js, Express.js  
- **Data storage:** JSON (Phase 2)  
- **Security:** bcryptjs for password hashing, session-based authentication  

---

## 📂 Repo Structure

idea-hub/
│
├─ backend/
│ ├─ data.json # Stores users & ideas
│ └─ server.js # Main server script
├─ frontend/
│ ├─ index.html
│ ├─ login.html
│ ├─ signup.html
│ ├─ submit.html
│ └─ style.css
│
├─ .gitignore
├─ LICENSE # MIT License
├─ package-lock.json
├─ package.json
└─ README.md


---

## 🚀 Features

**Phase 1:**
- Basic navigation between pages  
- Core frontend & backend setup  

**Phase 2:**
- Signup with hashed passwords (bcryptjs)  
- Login with session tracking  
- Submit ideas with **timestamps** for originality  
- Submit page locked until login  

**Phase 3+ (Planned):**
- Display all ideas on homepage  
- User dashboards with edit/delete options  
- UI improvements & interactive elements  
- Search, filters, and voting system  

---

## 🛡️ Security & Originality

- **Passwords are hashed** and never stored in plain text  
- **Submit timestamps** ensure the first submission is automatically recognized as original  
- **Rate limiter** prevents brute-force login attacks  
- **Session management** ensures secure idea submission  

---

## ⚡ How to Run

1. Clone the repo:  
```bash
git clone <link of your forked repo>

2. cd to your local folder

3. run 'npm install'

4. run 'node backend/server.js'

5. Go to 'http://localhost:3000' on your browser
```
## License
This project is licensed under the MIT License.

## Note
This project was built as a personal MVP in 2025 to practice full-stack development and secure idea management.  

All code is written by me for learning purposes and phased enhancements.  

PS: Contributions from others are welcome.