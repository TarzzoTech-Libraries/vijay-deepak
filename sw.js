const CACHE_STATIC_NAME = "static-v2";
const CACHE_DYNAMIC_NAME = "dynamic-v2";
const STATIC_FILES = [
  "/",
  "/index.html",
  "/css/font/flaticon.css",
  "/css/font/Flaticon.ttf",
  "/css/font/Flaticon.woff",
  "/css/font/Flaticon.woff2",
  "/css/lib/bootstrap.min.css",
  "/css/custom-bootstrap.css",
  "/css/style.css",
  "/css/home.css",
  "/css/about.css",
  "/css/service-section.css",
  "/css/skills.css",
  "/css/education.css",
  "/css/experience.css",
  "/css/work.css",
  "/css/contact.css",
  "/js/lib/jquery.min.js",
  "/js/lib/bootstrap.min.js",
  "/js/promise.js",
  "/js/fetch.js",
  "/js/main.js",
  "/img/icon/vjsd-white.png",
  "https://fonts.googleapis.com/css?family=Playfair+Display+SC|Quicksand",
  "https://fonts.googleapis.com/css?family=Bitter",
  "/img/profile-pic.jpg",
  "/img/project/Npm-logo.svg",
  "/img/project-client-bg-img.jpg",
  "/img/project/html.png",
  "/img/project/css.png",
  "/img/project/js.png",
  "/img/project/reactjs.png",
  "/img/project/c-sharp.png",
  "/img/project/sql.png",
  "/img/project/sp.png",
  "/img/bg-img.jpg"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(cache => {
      console.log("[Service Worker] Precaching App Shell");
      cache.addAll(STATIC_FILES);
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(keysList => {
      return Promise.all(
        keysList.map(key => {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log("[Service Worker] Removing the old Cache.", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

function isInArray(str, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === str) {
      return true;
    }
  }
  return false;
}

self.addEventListener("fetch", function(event) {
  // console.log("[Service Worker] Fetching Some Data ...", event);
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      } else {
        return fetch(event.request)
          .then(res => {
            return caches.open(CACHE_DYNAMIC_NAME).then(cache => {
              // this condition is to avoid chrome-extension error on console
              if (event.request.url.indexOf("http") === 0) {
                cache.put(event.request.url, res.clone());
              }
              return res;
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
  );
});
