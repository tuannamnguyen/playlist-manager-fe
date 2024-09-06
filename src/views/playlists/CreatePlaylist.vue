<template>
    <form>
        <h4>Create New Playlist</h4>
        <input type="text" required placeholder="Playlist title" />
        <textarea required placeholder="Playlist description..."></textarea>

        <button v-if="!isPending">Create</button>
        <button v-else disabled>Saving...</button>
    </form>
</template>


<script>
export default {
    setup() {
        let isPending = false;
        return {isPending}
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

</style>
