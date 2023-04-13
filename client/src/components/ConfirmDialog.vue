<template>
    <div @click="$emit('undoAction')" class="dialog-wrap">
        <div class="dialog-window">
            <div class="container">
                <h2>{{ title }}</h2>
                <div class="row">
                    <div class="col">
                        <div @click="$emit('confirmAction')" class="btn yes">Да
                        </div>
                    </div>
                    <div class="col">
                        <div @click="$emit('undoAction')" class="btn no">Отменить</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: this.dialogTitle
        }
    },
    props: {
        dialogTitle: String
    }
}
</script>

<style scoped>
.dialog-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.dialog-window {
    box-shadow: 0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
    position: absolute;
    display: block;
    margin: auto;
    top: 50%;
    left: 50%;
    z-index: 99;
    transform: translate(-50%, -50%);
    background-color: #cee665;
    border-radius: 10px;
    padding: 20px;

}

.dialog-window .btn {
    font-size: 24px;
    background-color: rgb(101, 235, 106);
    padding: 10px 20px;
}

.dialog-window .yes {
    background-color: rgb(215, 40, 40);
}

.dialog-window .no {
    background-color: rgb(185, 239, 37);
}

</style>