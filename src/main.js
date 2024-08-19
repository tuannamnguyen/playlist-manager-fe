import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// Global Styles
import { createAuth0 } from '@auth0/auth0-vue'
import './assets/main.css'

const app = createApp(App);

app.use(router).use(
    createAuth0({
        domain: import.meta.env.AUTH0_DOMAIN,
        clientId: import.meta.env.AUTH0_CLIENT_ID,
        authorizationParams: {
            redirect_uri: import.meta.env.AUTH0_CALLBACK_URL,
        },
    })
)
