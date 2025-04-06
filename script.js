import { sdk } from '@farcaster/frame-sdk';

document.addEventListener('DOMContentLoaded', async () => {
 console.log('Loading UI...');

 // شبیه‌سازی لود محتوا (مثلاً درخواست API)
 setTimeout(async () => {
   // وقتی محتوا آماده شد
   document.querySelector('.skeleton').style.display = 'none';
   document.getElementById('content').style.display = 'block';

   // Splash Screen رو مخفی کن
   await sdk.actions.ready({ disableNativeGestures: true });
   console.log('App is ready!');
 }, 2000); // 2 ثانیه تاخیر برای شبیه‌سازی

 // رویداد دکمه Mint
 document.getElementById('mintButton').addEventListener('click', async () => {
   const response = await fetch('/api/mint', { method: 'POST' });
   const data = await response.json();
   alert(data.message);
 });
});
