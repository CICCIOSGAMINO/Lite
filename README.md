Lite - WebApp Template
======================
[TOC]

v4.3.0 (package.json, CHANGELOG, index.html)

Simple web app template build on top of [Lit](https://github.com/lit) , Material Design and Web Platform. This PWA template is based on the bright way showed us from Polymer project and all web entusiasts!

**Let's get start** clone the repo with the template, get a brief view to the running template and start build your WebApp. 
```bash
git clone --depth=1 https://github.com/CICCIOSGAMINO/Lite.git . && rm -rf ./.git
```

Vite is the framework used to dev / build / bundle and server the Lite WebApp template. So let's get it a try:
```bash
# use Vite dev server
npm run dev
# build into dist folder
npm run build
# preview with the build files
npm run preview
```

# Colors
We build accessible color system dynamic and configurable. The main idea is grasp from interesting [post](https://web.dev/building-a-color-scheme/) of [Adam Argyle](https://nerdy.dev/). Thnks

# Images 
Images folder contains all images the app needs. You can create all the png logo images starting from a svg file with an automatic process write into  **script_svgtopng** script. Let's use it: 

https://developers.google.com/web/fundamentals/design-and-ux/browser-customization/

The **script_svgtopng.sh** will create all the png images you need for: 

+ all meta tag into index.html
+ images linked into manifest.json
+ website ico

That's the images create from the **script_svgtopng.sh** starting from the svg file you insert into the images folder (insert only one svg, squared file):

**To runs the script you need imageMagick and InkScape installed!**

```bash
# launch the script in a folder with a svg squared logo image to produce 
# all png the manifest.json needs 
./script_svgtopng.sh
```

# Splash Screen
A splash screen is a graphical element consisting of a fullscreen window containing an image .png (typically a logo), the current version of the software or / and the WebApp name. Splash screen disappears when the application's components are loaded and ready to be showed. Splash screen can be very useful in WebApp because if the index.html main file is well done the Splash Screen is immediately present to the user so we can hidden for some millis all the loading of the WebApp (Yep Js i'm watching you).

In public > images > splash directory you can modify the .svg file with the drawing you need for that device splash screen and when all your .svg file (or only the files you need, delete the others) running the script **script_createsplash.sh** the png files the index.html needs will be created.

# Mobile / Desktop
The two layout, mobile and desktop are handled by the media query set into the CSS and in the application main component *app-lite.js* where the property are triggered by the *matchMedia* method, defined with the listeners into the *connectedCallback* lifecycle.

Mobile / Desktop > min-width: 640px  -  CSS Media Query
Mobile / Desktop > this.mobileLayout  [true/false] - Property

# Header


# Sidenav


# Router
Routing and Dynamic import are handled by [@vaadin/router](https://vaadin.com/router) Thnks [vaadin](https://vaadin.com/).

```javascript
  // init Routing when the DOM's elements are ready
  firstUpdate () {
    this.#initRouter()
  }

  #initRouter () {
    const main = this.renderRoot.querySelector('#main')
    const router = new Router(main)
    router.setRoutes([
      {
        path: '/',
        component: 'home-view'
      },
      {
        path: '/one',
        component: 'one-view',
        action: () =>
        import('./views/one-view')
      },
      {
        path: '/two',
        component: 'two-view',
        action: () =>
        import('./views/two-view')
      },
      {
        path: '/three',
        component: 'three-view',
        action: () =>
        import('./views/three-view')
      },
      {
        path: '(.*)',
        component: 'not-found-view',
        action: () =>
        import('./views/not-found-view')
      }
    ])
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

# TODO
Nothing to do? Don't worry ... here the list:

- [ ] Insert the screenshots in manifest
```json
"screenshots" : [
  {
    "src": "screenshot1.webp",
    "sizes": "1280x720",
    "type": "image/webp"
  },
  {
    "src": "screenshot2.webp",
    "sizes": "1280x720",
    "type": "image/webp"
  }
]
```

- [ ] Insert some App shortcuts as example
```json
"shortcuts" : [
  {
    "name": "New Feature",
    "url": "/features/feature?action=jumplist",
    "icons": [
      {
        "src": "/icon-feature.1.png",
        "type": "image/png",
        "sizes": "192x192"
      }
    ]
  }
]
```
- [ ] Thinking / Implement an easy footer layout
- [ ] WebApp examples of implementation of base template
- [ ] Handle the y11 internationalization
- [ ] Handle an easy state property eg.
- [ ] Handle the Offline / Online snackbar
- [ ] Examples, one page for each interesting API (ShareAPI, Notification ...)