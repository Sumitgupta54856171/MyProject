## MyProject – Biometric Authentication App

MyProject is a **React Native** demo application that showcases a **modern, secure login experience** using:

- **Email + password authentication**
- **Biometric authentication** (Fingerprint / Face ID – Android native module)
- **Local data persistence** with `AsyncStorage`
- A small, **clean UI** built with React Native components and `lucide-react-native` icons.

This project is designed so that **anyone opening the code or app can immediately understand the user flow and architecture.**

---

## Overview

The app implements a simple but realistic **account and login flow**:

- **Sign Up**: User creates an account with name, email, and password.
- **Enable Biometrics (optional)**: During sign up, the user can enable biometric login.
- **Login**: User can log in either:
  - With **biometrics**, or
  - With **email + password**.
- **Home**: Once authenticated, the user lands on a profile-style home screen that shows:
  - Basic user information
  - The active login method
  - Options to **log out** or **delete the account**.

> **Note**: This project is intended as an **educational/demo app**. It stores credentials locally with `AsyncStorage` and does **not** talk to any backend server. Do not use this setup as‑is in production.

---

## Key Features

- **User registration**
  - Name, email, password, confirm password
  - Form validation with **Yup** + **Formik**
  - Local storage of user credentials with `AsyncStorage`

- **Biometric authentication**
  - Optional biometric setup at sign-up via `BiomatericModule` (custom Android native module)
  - Toggle component (`BiometricToggle`) with a clear call-to-action
  - Uses native biometric prompt (fingerprint / face) for authentication

- **Login options**
  - **Biometric Login**: If biometric login is enabled
  - **Password Login**: Fallback or alternative via `PasswordLogin` screen

- **Home / Profile screen**
  - Shows user name and email from storage
  - Displays the **current login method** (e.g. Biometric)
  - Provides **Log Out** and **Delete Account** actions

- **Modern UI**
  - Simple, clean layouts with consistent spacing
  - Icons from `lucide-react-native`
  - Custom bottom navigation and prominent biometric FAB on the Home screen

---

## Application Flow (High-Level)

The diagram below shows how a user moves through the app.

```mermaid
flowchart TD
    A[App launch] --> B{Existing user data<br/>in AsyncStorage?}
    B -- No --> C[Sign Up screen<br/>(Sigin)]
    B -- Yes --> D[Login screen]

    C --> C1[Fill form<br/>name/email/password]
    C1 --> C2[Optional: Enable biometric<br/>via BiometricToggle]
    C2 --> C3[Validate with Yup]
    C3 --> C4[Save userData to AsyncStorage]
    C4 --> D

    D --> E{Login method?}
    E -- Biometric --> F[Check biometric flag<br/>+ availability]
    F --> G[Show native biometric prompt]
    G -->|Success| H[Save userInfo<br/>(method, timestamp)]
    H --> I[Home screen]
    G -->|Fail| D

    E -- Password --> J[PasswordLogin screen]
    J --> K[Read userData<br/>from AsyncStorage]
    K --> L{Email & password match?}
    L -- Yes --> I
    L -- No --> D

    I --> M[Log Out]
    I --> N[Delete Account]
    M --> D
    N --> O[Clear userData & userInfo] --> C
```

---

## Screens & Components

- **`App.tsx`**
  - Sets up `NavigationContainer` and **stack navigation**.
  - Screens:
    - `SignUp` → `Sigin` component
    - `Login` → `Login` component
    - `Home`  → `Homescreen` component

- **`UI/Sigin.tsx` (Sign Up)**
  - Handles **user registration** with `Formik` + `Yup`.
  - Stores user data in `AsyncStorage` via `stooreData` from `Utils/storage.tsx`.
  - Integrates `BiometricToggle` to allow enabling biometric login.
  - On success, navigates to the `Login` screen.

- **`UI/Login.tsx` (Biometric / Password selection)**
  - Default landing for existing users.
  - Two main actions:
    - **Login with Biometrics** → triggers `handleBiometricSetup` using `BiomatericModule`.
    - **Login with Password** → toggles to render the `PasswordLogin` component.
  - Stores biometric usage details in `AsyncStorage` (`userInfo`).

- **`UI/PasswordLogin.tsx`**
  - Simple email + password form using `Formik` + `Yup`.
  - Reads `userData` from `AsyncStorage` with `getData`.
  - If credentials match, navigates to `Home`.

- **`UI/Home.tsx` (Homescreen)**
  - Reads `userData` and `userInfo` (login method & last login time) from storage.
  - Displays:
    - User avatar (first letter of name)
    - Email
    - Current login method (e.g. Biometric + method type)
  - Actions:
    - **Log Out** → removes login info and goes back to `Login`.
    - **Delete Account** → clears stored user data and returns to `SignUp`.
  - Includes a **bottom navigation** and central biometric FAB.

- **`UI/components/BiometricToggle.tsx`**
  - Reusable toggle card that visually explains biometric login.
  - Wraps a `Switch` and icon inside a card-style row.

- **`Utils/storage.tsx`**
  - `stooreData(value)` → stores minimal user profile in `AsyncStorage` under `userData`.
  - `getData()` → reads and parses `userData` from `AsyncStorage`.

---

## Architecture & Tech Stack

- **Framework**: `React Native 0.84.0`
- **Language**: TypeScript (via `@react-native/typescript-config`)
- **Navigation**: `@react-navigation/native` + `@react-navigation/native-stack`
- **State & Forms**:
  - React hooks (`useState`, `useEffect`)
  - `Formik` for form state
  - `Yup` for validation
- **Storage**: `@react-native-async-storage/async-storage`
- **UI & Icons**:
  - Core React Native components
  - `lucide-react-native` icon set
- **Biometrics (Android)**:
  - Custom native Kotlin module `BiomatericModule` (under `android/app/src/main/java/com/myproject`)

---

## Getting Started

> **Prerequisite**: Make sure you have completed the official React Native
> [“Set Up Your Environment” guide](https://reactnative.dev/docs/set-up-your-environment)
> for your platform (Android and/or iOS).

### 1. Install dependencies

From the project root:

```sh
npm install
```

### 2. Start the Metro bundler

```sh
npm start
```

### 3. Run the app on a device/emulator (debug)

- **Android (debug build)**

  **Requirements**:

  - Android Studio installed
  - Android SDK + at least one Android Virtual Device (AVD) _or_ a physical Android device with USB debugging enabled

  **Run**:

  ```sh
  npm run android
  ```

- **iOS (debug build)**  
  _Only applicable if you add an iOS native biometric module and open the project in Xcode._

  **Requirements**:

  - Xcode installed (macOS only)
  - iOS Simulator or a physical iOS device

  **Run**:

  ```sh
  npm run ios
  ```

If everything is set up correctly, the app will launch and show the **Sign Up** or **Login** flow depending on whether `userData` is already present.

---

## Android build (APK / AAB)

These steps create installable builds that can be shared or uploaded to the Play Store.

> **Tip**: Make sure you can run the app in **debug** first before attempting a release build.

### Generate a signed release APK (quick installable file)

1. **Create a keystore** (one-time):

   ```sh
   keytool -genkeypair -v -storetype PKCS12 -keystore myproject-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias myproject
   ```

2. **Move the keystore** into `android/app/` and configure it in:

   - `android/gradle.properties` (keystore passwords and alias)
   - `android/app/build.gradle` (signingConfigs and buildTypes → release)

3. **Build the release APK** from the project root:

   ```sh
   cd android
   ./gradlew assembleRelease
   ```

4. The APK will be located at:

   - `android/app/build/outputs/apk/release/app-release.apk`

### Generate a signed AAB (Play Store bundle)

1. From the `android` folder:

   ```sh
   ./gradlew bundleRelease
   ```

2. The AAB file will be located at:

   - `android/app/build/outputs/bundle/release/app-release.aab`

You can upload this `.aab` to the **Google Play Console** for internal testing or production release.

---

## iOS build (Archive / App Store)

> This project is currently focused on **Android biometrics**.  
> iOS support requires adding an equivalent biometric native module and configuring Xcode.

Once an iOS native module is in place, you can:

1. Open `ios/MyProject.xcworkspace` in **Xcode**.
2. Select a **Generic iOS Device** or a physical device as the build target.
3. From the Xcode menu, choose **Product → Archive**.
4. Use the **Organizer** window to:
   - Distribute the app via **TestFlight**, or
   - Upload to the **App Store**.

---

## Biometric Module Notes

- The project includes a custom Android native module (`BiomatericModule`) responsible for:
  - Checking biometric availability.
  - Returning the active biometric method (e.g. fingerprint or face).
  - Showing the native biometric prompt.
- The Java/Kotlin code lives under:
  - `android/app/src/main/java/com/myproject/...`
- To support **iOS biometrics**, you would need to:
  - Implement an equivalent native module in Swift/Objective‑C.
  - Expose similar JS methods as `BiomatericModule`.

---

## Typical User Journey

1. **New user opens the app**
   - Sees the **Sign Up** screen.
   - Fills in name, email, password, confirm password.
   - Optionally enables **biometric login** using the toggle.
   - Submits and is redirected to the **Login** screen.

2. **User logs in**
   - Chooses **Login with Biometrics**:
     - App checks if biometrics are enabled and available.
     - Shows the native prompt.
     - On success, saves login info and navigates to **Home**.
   - Or chooses **Login with Password**:
     - Enters email and password.
     - App validates against stored `userData`.
     - On success, navigates to **Home**.

3. **On the Home screen**
   - User sees their initials, name, email, and login method.
   - Can **Log Out** (return to Login) or **Delete Account** (clear local data).

---

## Limitations & Next Steps

- **No backend**: All data is stored locally with `AsyncStorage`. In a real app, you would:
  - Move user data and authentication to a secure backend.
  - Use secure tokens (e.g. JWT) and proper encryption.
- **Biometrics**:
  - Currently focused on Android with a custom module.
  - iOS support would require an additional native implementation.
- **Security**:
  - Passwords are not encrypted at rest.
  - This is acceptable for a demo, but not for production.

You can use this project as a **starting point** to integrate:

- Real backend authentication (REST / GraphQL)
- More robust error handling and logging
- Multi-factor authentication flows

---

## License

This project is provided as‑is for learning and experimentation. Adapt the license text here as needed for your use case.
