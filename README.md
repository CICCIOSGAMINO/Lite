Lite - PWA Starter Pack
=======================
[TOC]

Simple web app template build on top of [Lit](https://github.com/lit) , Material Design and Web Platform. This PWA template is based on the bright way showed us from Polymer project and all web entusiasts!

# Vite
Vite is the framework used to dev / build the Lite WebApp template. So let's check !

```bash
# use Vite dev server
npm run dev
# build into dist folder
npm run build
# preview with the build files
npm run preview
```

# /images 
Images folder contains all images the app needs. You can create all the png logo images starting from a svg file with an automatic process write into  **script_svgtopng** script. Let's use it: 

https://developers.google.com/web/fundamentals/design-and-ux/browser-customization/

The **script_svgtopng.sh** will create all the png images you need for: 

+ all meta tag into index.html
+ images linked into manifest.json
+ website ico

That's the images create from the **script_svgtopng.sh** starting from the svg file you insert into the images folder (insert only one svg, squared file):

+ favicon.ico
+ manifest/icon48x48.png
+ manifest/icon48x48.png
+ manifest/icon48x48.png
+ manifest/icon96x96.png
+ manifest/icon128x128.png
+ manifest/icon144x144.png
+ manifest/icon192x192.png
+ manifest/icon256x256.png
+ manifest/icon384x384.png
+ manifest/icon512x512.png
+ favicon/favicon-16.png
+ favicon/favicon-32.png
+ favicon/favicon-64.png
+ favicon/favicon-96.png

```bash
# launch the script in a folder with a svg squared logo image to produce 
# all png the manifest.json needs 
./script_svgtopng.sh
```

**To runs the script you need imageMagick and InkScape installed!**

# WebApp Icons 
+ icon .ico           : images/favicon.ico

## Android/Chrome
+ tabs-icon (48x48)     : images/manifest/icon48x48.png
+ tabs-icon (96x96)     : images/manifest/icon96x96.png
+ normal-icon (128x128) : images/manifest/icon128x128.png
+ normal-icon (144x144) : images/manifest/icon144x144.png
+ hires-icon (192x192)  : images/manifest/icon192x192.png
+ hires-icon (256x256)  : images/manifest/icon256x256.png
+ hires-icon (384x384)  : images/manifest/icon384x384.png

## IOS Icons 
+ ios-icon (152x152)  : images/manifest/ios-icon.png
+ ipad-icon (72x72)   : images/manifest/icon72x72.png
+ iphone-retina-icon (120x120)  : images/manifest/icon120x120.png
+ ipad-retina-icon (152x152)    : images/manifest/icon152x152.png
+ iphone-x-icon (180x180)       : images/manifest/icon180x180.png

## Windows 8/10
+ small (70x70)     : images/manifest/icon70x70.png
+ medium (150x150)  : images/manifest/icon150x150.png
+ big (310x310)     : images/manifest/icon310x310.png

## Handle the mwc-icon-button click 
With LitElement at the base handling the click or other events on the material design mwc-icon-button it's easy as

# Views Dynamic Import
The key in speed up the loading time it's avoid the static imports whenever is possible. Preferred dynamic imports they're going to be better for reduce code size down the wire. This pattern is implemented here with the little helper function **lazyLoad**, basically creates a place to put a dynamic import and it takes a template that just going to pass the template forward and render that template when the dynamic import is done.

```javascript
class LitMailApp extends LitElement {
  // ... 
  _renderCurrentView () {
    switch (this.currentView) {
      case 'inbox':
        return lazyLoad(
          import('./litmail-inbox.js'),
          html`<litmail-inbox .data=${this.data}></litmail-inbox>)`)
      case 'thread':
        return lazyLoad(
          import('./litmail-thread.js'),
          html`<litmail-thread .data=${this.data}></litmail-thread>`)
      default: return html`<h3>Default View</h3>`
    }
  }
}
```

# Async Tasks
Async tasks can dispatch a CustomEvent with a promise into the detail payload, the main app component the *<app-lite>* extends the **PendingContainer** class to permit to the main app component to listening and set the **_hasPendingChildren** and **_pendingCount** properties. The **_pendingCount** is the actually active pending tasks (or children for a parent component) number, when no active pending tasks are present the **_hasPendingChildren** property is set to false, this property is binded to material design web component *</mwc-linear-progress>* to show into UI when tasks are active, of course you can build and handle a parent/child architecture with different components as a **PendingContainer** for async child tasks! Here the pattern implemented in *<app-lite>* : 
```javascript
// pending-container.js
export const PendingContainer = (base) =>
    ... 
        _hasPendingChildren: Boolean,
        _pendingCount: Number
    ...
  }

// app-lite.js
class AppLite extends PendingContainer(LitElement) { 
  ... 
  render () {
    return html`
      <!-- Progress Bar for Async tasks -->
      <mwc-linear-progress 
        indeterminate 
        .closed="${!this._hasPendingChildren}">
      </mwc-linear-progress>
    `
  }
}
```