import { createApp } from 'vue'
import App from './App.vue'
import { ElButton,ElIcon,ElScrollbar,ElCard,ElNotification,ElMessage,ElInput,ElMessageBox } from 'element-plus';
import 'element-plus/dist/index.css'
import registerDirectives from '@/components/directives'
// import VuePrismEditor from 'vue-prism-editor'
// import 'vue-prism-editor/src/styles.css'
//https://antonreshetov.github.io/vue-unicons/

const app = createApp(App);
    app.config.globalProperties.$log=ElNotification;
    app.config.globalProperties.$message=ElMessage;
    app.config.globalProperties.$confirm=ElMessageBox.confirm;
    window.confirm = ElMessageBox.confirm;

registerDirectives(app);

app
    .use(ElButton)
    .use(ElIcon)
    .use(ElScrollbar)
    .use(ElCard)
    .use(ElInput)
    // .use(VuePrismEditor)
    .mount('#app');
