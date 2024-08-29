<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New Playlist</h4>
        <input
            type="text"
            required
            placeholder="Playlist Title"
            v-model="title"
        />
        <textarea
            required
            placeholder="Playlist description ..."
            v-model="description"
        ></textarea>
        <label>Upload playlist cover image</label>
        <input type="file" @change="handleChange">

        <div class="error">{{ fileError }}</div>
        <button v-if="!isPending">Create</button>
        <button v-else disabled>Saving...</button>
    </form>
</template>

<script>
export default {
    setup() {

    }
}
</script>

<style>
form {
    background: white;
}

input[type="file"] {
    border: 0;
    padding: 0;
}

label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
}

button {
    margin-top: 20px;
}
</style>
