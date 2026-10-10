# Float Tube

A tiny always-on-top YouTube player for Windows. It floats above VS Code, browsers and other apps (including fullscreen ones), so you can watch while you work without split screen.

A browser extension can't draw over other apps, so this is a small Electron desktop app.

## Features

- Frameless window that stays on top of every other window
- Full YouTube inside: browse, search, or paste a URL in the top bar
- Opacity slider, plus click-through mode so clicks reach the app underneath
- Global hotkeys that work from any app

## Requirements

- Windows
- [Node.js](https://nodejs.org/) 18 or newer

## Setup

```
npm install
npm start
```

On Windows you can also double-click `FloatTube.bat` after `npm install`. Copy it to your Desktop as a shortcut if you like.

## Hotkeys

| Shortcut | Action |
| --- | --- |
| `Ctrl+Alt+Y` | Show or hide the player |
| `Ctrl+Alt+C` | Toggle click-through |
| `Ctrl+Alt+↑` / `Ctrl+Alt+↓` | Raise or lower opacity |

## Usage notes

- Drag the top bar to move the window, and drag the edges to resize it.
- In click-through mode you can't click the player's own controls. Press `Ctrl+Alt+C` again to turn it off.
- Your YouTube login isn't shared with your normal browser, so sign in inside the app if you want your account. Ads still show unless you have Premium.

## Project layout

- `main.js`: window setup, always-on-top level, global hotkeys
- `preload.js`: safe bridge between the UI and the main process
- `index.html`: top bar and the embedded YouTube view
