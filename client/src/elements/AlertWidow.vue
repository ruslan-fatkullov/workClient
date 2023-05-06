<template>
    <div class="alert_window">{{ alertMessage }}</div>
</template>

<script>
export default {
    props: {
        alertMessage: String
    }
}
</script>

<style>
.alert_window {
    display: block;
    position: fixed;
    padding: 10px;
    width: auto;
    left: 40%;
    top: 10%;
    border-radius: 20px;
    color: #000;
    border: 2px solid;
    background-color: rgb(224, 224, 217);
    animation: slideUp 2s ease infinite;
}

@keyframes slideUp {
    0% {
        opacity: 0;
        transform: translateY(0);
    }

    20% {
        opacity: 1;
        transform: translateY(10px);
    }

    80% {
        opacity: 1;
        transform: translateY(10px);
    }

    100% {
        opacity: 0;
        transform: translateY(0);
    }
}
</style>