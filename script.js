document.addEventListener('DOMContentLoaded',()=>{
const btns=document.querySelectorAll('.nav-btn');const panels=document.querySelectorAll('.panel');
btns.forEach(btn=>btn.addEventListener('click',()=>{
btns.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
panels.forEach(p=>p.classList.remove('active'));document.getElementById(btn.dataset.target).classList.add('active');
}));});