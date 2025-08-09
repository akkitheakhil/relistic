# 📋 Relistic

[![Expo](https://img.shields.io/badge/Expo-000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Styled Components](https://img.shields.io/badge/Styled--Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)](https://styled-components.com/)
[![Reanimated](https://img.shields.io/badge/Reanimated-FF6F00?style=for-the-badge)](https://docs.swmansion.com/react-native-reanimated/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

Relistic is a **collaborative list-sharing app** built with **React Native** and **Expo**, designed for a **modern, minimal UI** and **real-time collaboration**.  
Whether you’re planning groceries, tracking tasks, or organizing group events — Relistic makes it easy to create, share, and update lists together.

---

## ✨ Features

- 👫 **Collaborative Lists** – Share lists with friends, family, or teammates in real-time.
- 🎨 **Modern UI** – Built with Styled Components for a clean, customizable design.
- ⚡ **Smooth Animations** – Powered by React Native Reanimated for delightful interactions.
- 🔄 **Real-Time Sync** – See updates instantly without refreshing.
- 📱 **Cross-Platform** – Works on iOS, Android, and Web (via Expo).

---

## 🛠 Tech Stack

- **React Native** – Mobile framework for iOS & Android
- **Expo** – Fast development and deployment
- **React Native Reanimated** – Fluid animations & gestures
- **Styled Components** – Theme-driven styling

---

## 🚀 Getting Started

### 1️⃣ Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended)
- [Yarn](https://yarnpkg.com/) or npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### 2️⃣ Installation
```bash
# Clone the repo
git clone https://github.com/akkitheakhil/relistic.git

# Navigate to the project
cd relistic

# Install dependencies
yarn install
# or
npm install

# Start development server
yarn start
# or
npm start
```
## 📂 Project Structure

```plaintext
relistic/
├── app/                     # Expo App Router pages & layouts
│   ├── _layout.tsx           # Root layout file
│   └── (tabs)/               # Tab navigation group
│       ├── _layout.tsx       # Tabs layout (navigation container)
│       ├── index.tsx         # Dashboard tab
│       ├── list.tsx          # List tab
│       ├── reminders.tsx     # Reminders tab
│       └── profile.tsx       # Profile tab
├── components/               # Reusable UI components
├── hooks/                    # Custom React hooks
├── theme/                    # Styled-components theme files
├── services/                 # API calls & data fetching logic
├── utils/                    # Helper functions
├── assets/                   # Images, icons, fonts
├── types/                    # Type declarations
└── README.md
```

## 🧑‍💻 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open a PR or create an issue.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

> 💡 **Relistic** — *Make lists that live and grow with your team.*