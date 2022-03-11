# Topswop

## Introduction

**Topswop** is a web-app for trading second-hand clothes. It is built using [Svelte](https://svelte.dev/) and [DaisyUI](https://daisyui.com/) for the front-end, and [Firebase](https://firebase.google.com/) for the back-end.

Written by Team Foobar: [Dan Everson](https://github.com/dweverson), [Cat Hoang](https://github.com/CatHoang), [Syed Javaid](https://github.com/syedmjavaid), and [Maxim Parker](github.com/MaximParker).

Latest version 1.0.0 (11 March 2022).

---
## How to run a local copy
### 1. Install dependencies
```
$ npm i
```
At a minimim, `Firebase 9.6.7` must be installed.

### 2. Add your own Firebase config file
1. Create a new Firebase project and a new app within it
2. Go to `Project settings`
3. Scroll down to the code excerpt and copy the object called `firebaseConfig`. It should look like this:
```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```
4. Copy this object into a new file in `src > utils` called `firebaseConfig.js`, and export it like so:
```js
export const firebaseConfig = {
  // ...
};
```
Your local copy of Topswop will now have access to your Firebase app.

### 4. Add collections to Firestore Database
In order to function, the app requires certain collections be available in your Firestore Database (a.k.a. 'Cloud Firestore'). Start three collections in your app:
- `listings`
- `matches`
- `messages`

> Note: By design, a document is required in order to start a collection in Firestore, but the name and contents of this document are irrelevant. You should delete the dummy document immediately after starting the collection.

### 5. Start your local copy
```bash
HOST=0.0.0.0 npm run dev
```

---
## Acknowledgements

This project was completed as part of the front-end module on the [Northcoders](https://northcoders.com/) bootcamp. We couldn't have done this without the intensive 12 weeks of mentoring provided by their hard-working and friendly tutors.

---
Copyright (c) 2022