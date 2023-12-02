importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

workbox.core.setCacheNameDetails({
  prefix: "PhrassedChatCache",
  precache: "precache",
  runtime: "runtime",
});

if (workbox) {
  workbox.precaching.precacheAndRoute([{"revision":"bd045522fdcdd7932279251e86bb47bf","url":"build/bundle.css"},{"revision":"c5baf227d47e0cc35e2f3d4d291d1b05","url":"build/bundle.js"},{"revision":"c64beab291de80970aa4887a5a1c9135","url":"favicon.png"},{"revision":"48c5b50f1ca59a13a25291d7ceada925","url":"global.css"},{"revision":"a9c4783e66aa74faf6f9175039c89818","url":"index.html"},{"revision":"9c2e49da0f71fc9696df9c6f26930c54","url":"logo-192.png"},{"revision":"969c573d518c9b22995a5ed9e5a59ce5","url":"logo-512.png"},{"revision":"68d4ad7aca9bbdddefbf02c4d25de457","url":"manifest.json"},{"revision":"3bf4a556a0c9c9c03e6a1e68e88866f3","url":"trash.svg"},{"revision":"dd9bb11ec31c4c5a42f79124c2fd1fea","url":"up.svg"}]);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

const { registerRoute } = workbox.routing;
const { NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;

registerRoute(
  /\.js$/,
  new StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: "js-cache",
  })
);

registerRoute(
  /\.css$/,
  // Use cache but update in the background.
  new StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: "css-cache",
  })
);

workbox.routing.registerRoute(
  // Cache image files.
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  // Use the cache if it's available.
  new CacheFirst({
    // Use a custom cache name.
    cacheName: "image-cache",
    plugins: [
      new ExpirationPlugin({
        // Cache only 20 images.
        maxEntries: 20,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

self.addEventListener("install", function (event) {
  console.log("Installing service worker");
  if (self.skipWaiting) {
    console.log("Installing update now!");
    self.skipWaiting();
  }
});
