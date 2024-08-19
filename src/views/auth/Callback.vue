<template>
    <div class="callback">
        <!-- Empty content container -->
        <div class="content-container">
            <!-- Optional loading indicator -->
            <p>Processing authentication...</p>
        </div>
    </div>
</template>

<style>
.callback {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.content-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    background: white;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05);
}
</style>
