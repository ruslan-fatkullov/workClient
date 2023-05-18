<template>
    <div @click="$emit('undoAction')" class="dialog-wrap">
        <div @click.stop="" class="dialog-window">
            <div class="container">
                <h2>{{ title }}</h2>
                <div class="row jusify-content-senter">
                    <div class="button_group">
                        <div @click="$emit('confirmAction')" class="btn yes">Да
                        </div>
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, .7);
}

.dialog-window {
    
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.5);
    position: absolute;
    display: block;
    margin: auto;
    top: 50%;
    left: 50%;
    z-index: 99;
    transform: translate(-50%, -50%);
    background-color: #dfdfdf;
    border-radius: 10px;
    padding: 20px;

}

.dialog-window .btn {
    font-size: 20px;
    padding: 10px 20px;
    width: 150px;
}
.dialog-window h2{
    padding: 30px 0;
}

.dialog-window .btn:hover {
    background-color: #767676;
}

.dialog-window .yes {
    background-color: rgb(215, 40, 40);
}

.dialog-window .no {
    margin-left: 20px;
    background-color: rgb(145, 145, 145);
}

@media only screen and (max-width : 900px) {
    .button_group {
        display: flex;
        margin: auto;
    }

    .dialog-window .btn {
        padding: 10px 20px;
        width: 100%;
    }
}
</style>