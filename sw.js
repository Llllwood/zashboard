if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let a={};const f=e=>i(e,l),o={module:{uri:l},exports:a,require:f};s[l]=Promise.all(n.map((e=>o[e]||f(e)))).then((e=>(r(...e),a)))}}define(["./workbox-3e8df8c8"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-CjvQfSGu.js",revision:null},{url:"assets/index-DSHuF4za.css",revision:null},{url:"assets/index-Skxa5iSL.css",revision:null},{url:"assets/MiSans-VF-tRsyHePl.css",revision:null},{url:"assets/PingFangSC-Regular-CdqjaR4Y.css",revision:null},{url:"assets/SarasaUiSC-Regular-DAQC5TvS.css",revision:null},{url:"index.html",revision:"d14fc17d30f4a6ee88cd5538fa412a16"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"favicon.svg",revision:"7f1c4521acc10694fefef8f72dd2ea5f"},{url:"pwa-192x192.png",revision:"021df52501f4357c03eebd808f40dc6a"},{url:"pwa-512x512.png",revision:"d2f759aaabcb2c44ff52b27fde3de6e0"},{url:"pwa-maskable-192x192.png",revision:"7cd11dc5f0490b349d23eef5591d10e5"},{url:"pwa-maskable-512x512.png",revision:"8c97dc367a85a5a1eba523b24f79d03b"},{url:"manifest.webmanifest",revision:"c452912633990899ffe790f985ad0db9"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
