<template>
    <div class="navbar">
        <nav>
            <img src="@/assets/token.png" />
            <h1>
                <router-link :to="{ name: 'Home' }">Playlister</router-link>
            </h1>
            <div class="links">
                <button @click="handleSubmit" v-if="user">Logout</button>
                <router-link class="btn" :to="{ name: 'Signup' }" v-if="!user"
                    >Sign Up</router-link
                >
                <router-link class="btn" :to="{ name: 'Login' }" v-if="!user"
                    >Log In</router-link
                >
            </div>
        </nav>
    </div>
</template>

<script>
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";

export default {
    setup() {
        const router = useRouter();
        const { logout, error } = useLogout();
        const { user } = getUser()

        const handleSubmit = async () => {
            await logout();
            router.push({ name: "Login" });
        };


        return { handleSubmit, user };
    },
};
</script>

<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
}
nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}
nav img {
    max-height: 60px;
}
nav h1 {
    margin-left: 20px;
}
nav .links {
    margin-left: auto;
}
nav .links a,
button {
    margin-left: 16px;
    font-size: 14px;
}
</style>