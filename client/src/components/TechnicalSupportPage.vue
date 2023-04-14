<template>
    <div class="tech-support">
        <h1>Техническая поддержка</h1>
        <div class="container form-tech-support">
            <form @submit.prevent="sendMessage()">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="email">Введите ваш email</label>
                            <input v-model=email type="text" placeholder="Введите адресс электронной почты" id="email">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="fullName">Ваши ФИО</label>
                            <input v-model=fullName type="text" placeholder="Как к вам можно обращаться?" id="fullName">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">

                        <div class="form-group">
                            <textarea v-model=message placeholder="Подробно опишите вашу проблему" id="message" cols="30"
                                rows="100"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">

                        <div class="form-group">
                            <button type="submit" class="btn btn-primary send-help-button"
                                :disabled="isDisable ? disabled : ''">Отправить</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import store from '../store'
export default {
    data() {
        return {
            isDisable: false,
            email: "",
            fullName: "",
            message: "",
        }
    },
    methods: {
        sendMessage() {
            store.dispatch("sendMessageAction", {email: this.email, fullName: this.fullName, message: this.message})
        },
        computedFields() {
            if (this.email != "" && this.fullName != "" && this.message != "") {
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
        email(){
            this.computedFields()
        },
        fullName(){
            this.computedFields()
        }
    }
}
</script>

<style scopes >
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
    padding: 40px;
    font-size: 28px;
    border-radius: 5px;
    border: none;
    outline: none;
}

.form-group textarea {
    height: 250px;
}

.form-group .btn {
    width: 100%;
    padding: 25px 0;
    font-size: 35px;
}
</style>