import{S as c,i as a}from"./assets/vendor-5ObWk2rO.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const f="48120556-fdb679f2a2804b1816b5c1c88",u="https://pixabay.com/api/";function p(s){const e=`${u}?key=${f}&q=${s.split(" ").join("%20")}&image_type=photo&orientation=horizontal&safesearch=true`;return fetch(e).then(o=>{if(!o.ok)throw new Error(`HTTP error! Status: ${o.status}`);return o.json()}).then(o=>o.hits)}const d=document.querySelector(".gallery");function m(s){d.innerHTML=s.map(e=>`
        <li class = item>
        <div class = conteiner-img>
          <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" />
        </div>
      </a>
      <div class = image-info>
          <p class = info-title>Likes <span class = info-value>${e.likes}</span></p>
          <p class = info-title>Views <span class = info-value>${e.views}</span></p>
          <p class = info-title>Comments <span class = info-value>${e.comments}</span></p>
          <p class = info-title>Downloads <span class = info-value>${e.downloads}</span></p>
      </div>
        </li>
      `).join("")}const h=document.querySelector(".search-form"),y=document.querySelector(".search-input"),g=document.querySelector(".gallery"),l=document.querySelector(".loader-wrapper");function L(){l.style.display="flex"}function v(){l.style.display="none"}let w=new c(".gallery a",{captionsData:"alt",captionDelay:250});h.addEventListener("submit",s=>{s.preventDefault();const e=y.value.trim();if(e===""){a.show({messageColor:"#fff",color:"#EF4040",position:"topRight",message:"Please enter a search term!"});return}g.innerHTML="",L(),p(e).then(o=>{if(o.length===0){a.show({messageColor:"#fff",color:"#EF4040",position:"topRight",maxWidth:432,message:"Sorry, there are no images matching your search query. Please try again!"});return}m(o),w.refresh()}).catch(o=>{console.log(o)}).finally(()=>{v()})});
//# sourceMappingURL=index.js.map
