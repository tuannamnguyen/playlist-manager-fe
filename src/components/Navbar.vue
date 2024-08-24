<template>
    <div class="navbar">
        <nav>
            <img src="@/assets/token.png">
            <h1>
                <router-link to="/">Playlist manager</router-link>
            </h1>
            <div class="links">
                <div>
                    <router-link to="/create_playlist">Create Playlist</router-link>
                    <router-link to="/my_playlist">My Playlist</router-link>
                </div>
                <span>Hi there, Nam</span>
            </div>
            <button>Sign Up</button>
            <button>Log In</button>
        </nav>
    </div>
</template>

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
