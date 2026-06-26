# Simba Beverages Limited - Tanzania 🦁

Simba Beverages Limited (a proud member of the Premidis Group) is one of Tanzania's premier beverage manufacturers. This repository contains the complete cross-platform codebase for the Simba Beverages brand portal—comprising the split & unified high-performance web landing page, the React Vite web application, and the React Native mobile application.

---

## 📂 Repository Structure

The repository is organized into three major frontend deployments:

1. **Vanilla Web Frontend (Root)**:
   - [index.html](file:///d:/Simba_beverages/index.html) / [styles.css](file:///d:/Simba_beverages/styles.css) / [script.js](file:///d:/Simba_beverages/script.js) — Clean modular frontend source files.
   - [simba-beverages.html](file:///d:/Simba_beverages/simba-beverages.html) — Unified, compiled single-file website (highly portable).
2. **React Web App**:
   - [SimbaReactWeb/](file:///d:/Simba_beverages/SimbaReactWeb) — Premium React conversion of the portal built with Vite.
3. **React Native Mobile App**:
   - [SimbaMobileApp/](file:///d:/Simba_beverages/SimbaMobileApp) — Cross-platform React Native app for Android and iOS.

---

## 🌟 Key Features

### 🌍 1. Tanzanian Regional Rebranding
The entire portal is localized and configured for **Tanzania**:
- Corporate Headquarters: Plot 1204, Industrial Area, Dar es Salaam.
- Contact Details: Country dialing prefix `+255` and web extensions `.co.tz`.
- Localized regional client reviews (Dar es Salaam, Arusha).

### 📦 2. Official Premidis Product Catalog
Aligned with the official Premidis Group product line:
1. **Nkolo Mboka**: Premium traditional wine crafted with natural ingredients.
2. **Ola Kombucha**: Probiotic-rich organic fermented sparkling tea.
3. **Ginger Punch**: Zesty spiced beverage brewed from finest local ginger root.
4. **Hard Rock**: High-performance stamina and focus energy drink.

### 🍷 3. Realistic 3D Scroll-Driven Pour Animation
Upgraded SVG physics engine simulating a realistic golden-amber liquid pour:
- **Tapering 3D Flow**: The stream starts wide at the mouth (24px sheet) and tapers to 6px at the glass entry under gravity acceleration, featuring a 3D cylindrical lens gradient.
- **Dynamic sloshing liquid**: Fluid level inside the bottle remains horizontal relative to the ground (counter-rotation) and drains downwards as you scroll.
- **Heavy crystal Tumbler**: Features a 25px thick crystal glass base with refraction vectors and sloshing sine-wave ripples on the liquid surface.
- **Splash & Bubbles**: Splash droplets launch in parabolic arcs from the impact point, and bubbles rise from the bottom, popping exactly at the live rising surface.

### 📊 4. B2B Pricing Calculator & Catalogue
Wholesalers and distributors can compute volume discounts (5%, 10%, 15% tiers) in real-time, generate custom bulk order quotes, and auto-populate contact enquiry forms.

---

## ⚡ Scroll Performance Tuning

Scroll animations are highly optimized to resolve layout lag and CPU bottlenecks:
- **Layout Caching**: Caches scene offsets to prevent forced synchronous layouts (browser reflows) during scroll updates.
- **Offscreen Suspension**: Uses an `IntersectionObserver` to completely suspend scroll listeners, bubble calculations, and particle physics loops when the section is out of the viewport (reducing idle CPU to 0%).
- **GPU Compositor Promotion**: Animating groups are promoted to their own hardware layers (`will-change: transform, opacity` and `transform: translateZ(0)`) to bypass browser repaint cycles.

---

## 🚀 How to Run the Applications

### A. Running the Vanilla Website
Simply open `index.html` or the unified `simba-beverages.html` in any web browser.

To recompile changes to the unified file, open **PowerShell** and run:
```powershell
./build.ps1
```
To verify exact code parity between split and unified files:
```powershell
./compare.ps1
```

### B. Running the React Web Application
1. Navigate to the folder:
   ```bash
   cd SimbaReactWeb
   ```
2. Install dependencies & run development server:
   ```bash
   npm install
   npm run dev
   ```

### C. Running the React Native Mobile Application
1. Navigate to the folder:
   ```bash
   cd SimbaMobileApp
   ```
2. Install dependencies & run Expo:
   ```bash
   npm install
   npm start
   ```

---

## 🏢 Member of Premidis Group
*Crafting Refreshment For Every Moment · Dar es Salaam, Tanzania*
