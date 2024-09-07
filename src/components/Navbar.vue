<template>
    <div class="navbar">
        <nav>
            <img src="@/assets/token.png">
            <h1>
                <router-link to="/">Playlist Manager</router-link>
            </h1>
            <div class="links">
                <div v-if="isAuthenticated">
                    <router-link to="/playlists/create">Create Playlist</router-link>
                    <router-link to="/playlists/user">My Playlist</router-link>
                    <span>Hi there, Nam</span>
                    <button @click="handleLogout">Logout</button>
                </div>
            </div>
            <button @click="handleSignUp" v-if="!isAuthenticated">Sign Up</button>
            <button @click="handleLogin" v-if="!isAuthenticated">Log In</button>
        </nav>
    </div>
</template>

<script>
export default {
    methods: {
        handleLogin() {
            this.$auth0.loginWithRedirect({
                appState: {
                    target: "/",
                },
            });
        },
        handleSignUp() {
            this.$auth0.loginWithRedirect({
                appState: {
                    target: "/",
                },
                authorizationParams: {
                    screen_hint: "signup",
                },
            });
        },
        handleLogout() {
            this.$auth0.logout({
                logoutParams: {
                    returnTo: window.location.origin,
                },
            });
        }
    },
    data() {
        return {
            isAuthenticated: this.$auth0.isAuthenticated,
        };
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

span {
    font-size: 14px;
    display: inline-block;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
}
</style>
