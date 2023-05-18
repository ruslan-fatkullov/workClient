<template>
    <div class="tech-support">
        <h1>Заявка в техническую поддержку</h1>
        <div class="container form-tech-support">
            <div class="row justify-content-center">

                <div class="col-lg-8">
                    <form @submit.prevent="sendMessage()">

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="email">Введите ваш email</label>
                                    <input v-model=email type="text" placeholder="Введите адресс электронной почты"
                                        id="email">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="fullName">Ваши ФИО</label>
                                    <input v-model=fullName type="text" placeholder="Как к вам можно обращаться?"
                                        id="fullName">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group message_field">
                                    <textarea cols="40" rows="3" v-model=message
                                        placeholder="Подробно опишите вашу проблему" id="message"></textarea>
                                    <div class="button_wrap">
                                        <button type="submit" class="sendHELP"
                                            v-bind:disabled="!isDisable">Отправить</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>



        </div>
    </div>
    <AlertWidowVue v-if="isAlert" v-bind:alertMessage="alertMess"></AlertWidowVue>
</template>

<script>
import AlertWidowVue from '../elements/AlertWidow.vue'
import store from '../store'


export default {
    data() {
        return {
            isDisable: false,
            email: "",
            fullName: "",
            message: "",

            alertMess: "",
            isAlert: false
        }
    },
    methods: {

        sendMessage() {
            store.dispatch("sendMessageAction", {
                email: this.email,
                fullName: this.fullName,
                message: this.message
            }).then(() => {
                this.email = "";
                this.fullName = "";
                this.message = "";

                this.alertMess = "Сообщение отправлено в поддержку"
                this.isAlert = true
                setTimeout(() => {
                    this.isAlert = false
                }, 2000)

            })
        },
        computedFields() {
            if (this.email !== "" && this.fullName !== "" && this.message !== "") {
                this.isDisable = true
                return
            }
            this.isDisable = false
        }
    },
    watch: {
        message() {
            this.computedFields()
        },
        email() {
            this.computedFields()
        },
        fullName() {
            this.computedFields()
        }
    },
    mounted() {
        store.dispatch('setLinkListAction', [{ label: "Главная", link: "/" }, { label: "Техническая поддержка", link: "/techSupport" }])
    },
    components: {
        AlertWidowVue
    }
}
</script>

<style scoped>
.sendHELP {
    font-size: 1.4rem;
    border: none;
    padding: 10px 15px;
    border-radius: 5px 0 5px 0;
    background-color: #007aaf;
    color: #fff;
}
.button_wrap{
    display: flex;
    justify-content: end;
}

.sendHELP:disabled:hover {
    background-color: #007aaf;
    opacity: .6;
}

.sendHELP:disabled {
    opacity: .6;
}

.sendHELP:hover {
    background-color: #0092d1;
}

.message_field {
    display: block;
    background-color: #fff;
    border-radius: 5px;


}

.message_field input[type="text"] {
    height: 500px;
    word-break: break-word;
}

.tech-support {
    color: aliceblue;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    width: 100%;
    font-size: 24px;
    margin-bottom: 2%;
}

.form-group input[type="text"],
textarea {
    width: 100%;
    height: 50px;
    padding: 30px;
    font-size: 20px;
    border-radius: 5px;
    border: none;
    outline: none;
}

.form-group textarea {
    height: 250px;
}

.form-group .btn {
    width: 100%;
    padding: 15px 0;
    font-size: 35px;
}

.form-tech-support {
    padding: 0 15px;
}
</style>