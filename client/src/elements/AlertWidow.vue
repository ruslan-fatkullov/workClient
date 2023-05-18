<template>
    <div class="wrapper">

        <div class="alert_window">{{ alertMessage }}</div>
    </div>
</template>

<script>
export default {
    props: {
        alertMessage: String
    }
}
</script>

<style>
.wrapper{
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
}
.alert_window {
    display: block;
    position: fixed;
    padding: 10px;
    width: auto;
    top: 10%;
    border-radius: 20px;
    color: #000;
    background-color: rgb(220, 220, 220);
    font-size: 24px;
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
@media only screen and (max-width : 900px) {
    .alert_window{
        font-size: 16px;
    }
}
</style>