"use strict";
var precacheConfig = [
    [
      "/static/react/static/css/main.c1650bcf.css",
      "565758683d81cceb25fa1af4c544be5c",
    ],
    [
      "/static/react/static/media/angry.481d3b52.jpg",
      "481d3b523ed0b5c21a44b6a20806df06",
    ],
    [
      "/static/react/static/media/happy.f511244f.jpg",
      "f511244f6aa4ed1c95cbfc31feea318a",
    ],
    [
      "/static/react/static/media/neutral.da5de01f.jpg",
      "da5de01f1ebd7b1a4ddb455b281828be",
    ],
    [
      "/static/react/static/media/sad.c7890f89.jpg",
      "c7890f8983f2e94ead2e3fb39da9603a",
    ],
    [
      "/static/react/static/media/surprised.63a63625.jpg",
      "63a636251819d676629c8eca1c00876b",
    ],
    [
      "C:/Users/schma/Documents/4th Yr/FYP/FINALE/FYP_Software201819/fer_model/templates/index.html",
      "3be8404149860d528e0e211939a835fd",
    ],
  ],
  cacheName =
    "sw-precache-v3-sw-precache-webpack-plugin-" +
    (self.registration ? self.registration.scope : ""),
  ignoreUrlParametersMatching = [/^utm_/],
  addDirectoryIndex = function (e, t) {
    var n = new URL(e);
    return "/" === n.pathname.slice(-1) && (n.pathname += t), n.toString();
  },
  cleanResponse = function (t) {
    return t.redirected
      ? ("body" in t ? Promise.resolve(t.body) : t.blob()).then(function (e) {
          return new Response(e, {
            headers: t.headers,
            status: t.status,
            statusText: t.statusText,
          });
        })
      : Promise.resolve(t);
  },
  createCacheKey = function (e, t, n, r) {
    var a = new URL(e);
    return (
      (r && a.pathname.match(r)) ||
        (a.search +=
          (a.search ? "&" : "") +
          encodeURIComponent(t) +
          "=" +
          encodeURIComponent(n)),
      a.toString()
    );
  },
  isPathWhitelisted = function (e, t) {
    if (0 === e.length) return !0;
    var n = new URL(t).pathname;
    return e.some(function (e) {
      return n.match(e);
    });
  },
  stripIgnoredUrlParameters = function (e, n) {
    var t = new URL(e);
    return (
      (t.hash = ""),
      (t.search = t.search
        .slice(1)
        .split("&")
        .map(function (e) {
          return e.split("=");
        })
        .filter(function (t) {
          return n.every(function (e) {
            return !e.test(t[0]);
          });
        })
        .map(function (e) {
          return e.join("=");
        })
        .join("&")),
      t.toString()
    );
  },
  hashParamName = "_sw-precache",
  urlsToCacheKeys = new Map(
    precacheConfig.map(function (e) {
      var t = e[0],
        n = e[1],
        r = new URL(t, self.location),
        a = createCacheKey(r, hashParamName, n, /\.\w{8}\./);
      return [r.toString(), a];
    })
  );
function setOfCachedUrls(e) {
  return e
    .keys()
    .then(function (e) {
      return e.map(function (e) {
        return e.url;
      });
    })
    .then(function (e) {
      return new Set(e);
    });
}
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(function (r) {
        return setOfCachedUrls(r).then(function (n) {
          return Promise.all(
            Array.from(urlsToCacheKeys.values()).map(function (t) {
              if (!n.has(t)) {
                var e = new Request(t, { credentials: "same-origin" });
                return fetch(e).then(function (e) {
                  if (!e.ok)
                    throw new Error(
                      "Request for " +
                        t +
                        " returned a response with status " +
                        e.status
                    );
                  return cleanResponse(e).then(function (e) {
                    return r.put(t, e);
                  });
                });
              }
            })
          );
        });
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
}),
  self.addEventListener("activate", function (e) {
    var n = new Set(urlsToCacheKeys.values());
    e.waitUntil(
      caches
        .open(cacheName)
        .then(function (t) {
          return t.keys().then(function (e) {
            return Promise.all(
              e.map(function (e) {
                if (!n.has(e.url)) return t.delete(e);
              })
            );
          });
        })
        .then(function () {
          return self.clients.claim();
        })
    );
  }),
  self.addEventListener("fetch", function (t) {
    if ("GET" === t.request.method) {
      var e,
        n = stripIgnoredUrlParameters(
          t.request.url,
          ignoreUrlParametersMatching
        ),
        r = "index.html";
      (e = urlsToCacheKeys.has(n)) ||
        ((n = addDirectoryIndex(n, r)), (e = urlsToCacheKeys.has(n)));
      var a = "/static/react/index.html";
      !e &&
        "navigate" === t.request.mode &&
        isPathWhitelisted(["^(?!\\/__).*"], t.request.url) &&
        ((n = new URL(a, self.location).toString()),
        (e = urlsToCacheKeys.has(n))),
        e &&
          t.respondWith(
            caches
              .open(cacheName)
              .then(function (e) {
                return e.match(urlsToCacheKeys.get(n)).then(function (e) {
                  if (e) return e;
                  throw Error(
                    "The cached response that was expected is missing."
                  );
                });
              })
              .catch(function (e) {
                return (
                  console.warn(
                    'Couldn\'t serve response for "%s" from cache: %O',
                    t.request.url,
                    e
                  ),
                  fetch(t.request)
                );
              })
          );
    }
  });
