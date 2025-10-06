// sample1.js — using only safe features
fetch("/api/data").then(res => res.json()).then(data => {
  console.log(data);
});
