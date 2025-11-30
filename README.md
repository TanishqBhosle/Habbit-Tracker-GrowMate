

# 🌱 **GrowMate – Smart Habit Coach**

A beautifully crafted, offline-first habit tracking app built with **React Native (Expo)** and **TypeScript**, designed to help you build better habits, stay consistent, and improve your daily life.

---

<p align="center">
  <img src="https://img.shields.io/badge/Expo-SDK%2051-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React%20Native-Mobile%20App-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Made%20with-TypeScript-3178C6?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Platform-Android-success?style=for-the-badge" />
</p>

---

## ✨ **Features**

### 📌 Habit Management

* Create, edit, delete, and duplicate habits
* Categories, colors, icons & frequency settings
* Smart reminders & detailed habit configuration

### 🔥 Streak Tracking

* Track daily/weekly progress
* Longest streak monitoring
* Motivational streak badge

### 📊 Weekly Insights & Analytics

* View weekly completions
* Category breakdowns
* Victory charts (bar/pie)
* Completion heatmap

### 🔔 Local Notifications

* Android-only reminders via **expo-notifications**
* Auto-scheduling of habit reminders
* Reschedules on habit edit
* Works fully inside **Expo Go**

### 📴 Offline-First

* All data stored locally with AsyncStorage
* Works without internet
* Auto-sync when app reopens

### 🎨 Modern UI/UX

* Clean and minimal UI
* Built with **React Native Paper**
* Smooth navigation and polished interactions
* Accessible & responsive design

---

## 🛠 **Tech Stack**

| Category         | Technology                 |
| ---------------- | -------------------------- |
| Framework        | Expo SDK 51+, React Native |
| Language         | TypeScript                 |
| Storage          | AsyncStorage               |
| State Management | Zustand                    |
| Navigation       | React Navigation v6        |
| UI Components    | React Native Paper         |
| Charts           | Victory Native             |
| Forms            | Formik + Yup               |
| Notifications    | expo-notifications         |

---

## 📥 **Installation**

Clone the project:

```bash
git clone <repository-url>
cd growmate
```

Install dependencies:

```bash
npm install
```

---

## 📦 **Library Install Commands**

```bash
# Navigation
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs

# AsyncStorage
npx expo install @react-native-async-storage/async-storage

# UI Components
npm install react-native-paper
npx expo install react-native-vector-icons

# Charts
npm install victory-native
npx expo install react-native-svg

# Forms & Validation
npm install formik yup

# Notifications
npx expo install expo-notifications

# State Management
npm install zustand
```

---

## 📁 **Project Structure**

```
growmate/
 ├── App.tsx
 ├── app.json
 ├── babel.config.js
 ├── tsconfig.json
 ├── src/
 │   ├── components/
 │   ├── screens/
 │   ├── navigation/
 │   ├── store/
 │   ├── services/
 │   ├── hooks/
 │   ├── utils/
 │   └── theme/
 └── assets/
```

---

## ▶️ **Running the App**

### Using Expo Go (Recommended)

```bash
npx expo start
```

Scan the QR code using the **Expo Go** app on your Android device.

---

## 📦 **Build APK with EAS**

Install EAS:

```bash
npm install -g eas-cli
```

Configure project:

```bash
eas build:configure
```

Build APK:

```bash
eas build -p android --profile preview
```

---

## 🔔 **Notification Setup**

GrowMate uses **expo-notifications** for Android reminders:

* Requests permission on launch
* Creates default notification channel
* Schedules reminders using user-selected times
* Updates or cancels reminders automatically when habits change

Works inside **Expo Go**.

---

## 🔒 **Privacy Policy**

Your privacy matters.
GrowMate stores **all data locally on your device** using AsyncStorage.
No data is transmitted, collected, or shared with external servers.

---

## 🎥 **Recording a Demo Video**

1. Open the app
2. Create a few habits
3. Mark habits as complete
4. Show streak increments
5. Display weekly insights
6. Demonstrate notifications
7. Use your device’s built-in screen recorder

---

## 🤝 **Contributing**

Pull requests are welcome!

1. Fork the repo
2. Create your feature branch
3. Commit changes
4. Push to branch
5. Submit PR

---

## 📜 **License**

This project is licensed under the **MIT License**.

---

##  **Figma WireFrame**
https://www.figma.com/board/PshQdJSefQ9pF7xUR0qjgn/GrowMate-Flowchart-Updated?node-id=0-1&p=f&t=zldjn0r87IxeG4QE-0

