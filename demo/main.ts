import { createApp } from 'vue';
import App from './App.vue';
import DrawSignPdf from 'draw-sign-pdf';
import '../dist/style.css';

const app = createApp(App);
app.use(DrawSignPdf);
app.mount('#app'); 