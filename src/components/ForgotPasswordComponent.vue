<template>
    <form class="forgot-pass-from">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
            <button v-on:click="getCode" type="button" id="get-code">Получить код</button>
        </div>
        <div class="form-group code-group">
            <input type="text" id="code1" name="code1" pattern="[0-9]" maxlength="1" required>
            <input type="text" id="code2" name="code2" pattern="[0-9]" maxlength="1" required>
            <input type="text" id="code3" name="code3" pattern="[0-9]" maxlength="1" required>
            <input type="text" id="code4" name="code4" pattern="[0-9]" maxlength="1" required>
        </div>
        <div class="form-group">
            <router-link class="btn-back" to="/" exact>Вернуться</router-link>
            <button type="submit">Подтвердить</button>
        </div>
    </form>
</template>

<script>

export default {
    data: function () {
        return {

            //codeInput: document.querySelectorAll('.code-group')
        }
    },
    methods: {
        getCode: function () {
            const codeInputs = document.querySelectorAll('.code-group input');
            codeInputs[0].focus();
            codeInputs.forEach((input, index) => {
                input.addEventListener('keyup', (e) => {
                    const currentInput = e.target;
                    if (currentInput.value.length === 1) {
                        if (index < codeInputs.length - 1) {
                            codeInputs[index + 1].focus();
                        } else {
                            codeInputs[index].blur();
                        }
                    } else if (currentInput.value.length === 0) {
                        if (index > 0) {
                            codeInputs[index - 1].focus();
                        }
                    }
                });
            });
        }
    }
}
</script>

<style>
.forgot-pass-from {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    padding: 2rem;
    background-color: #fdf4e3;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

input[type="email"],
input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.btn-back {
    margin-right: 15px;
}

.code-group {
    display: flex;
    justify-content: center;
}

.code-group input[type="text"] {
    flex: 1;
    margin-right: 0.5rem;
    max-width: 30px;
    text-align: center;
}

button {
    padding: 0.5rem;
    font-size: 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

button:hover {
    background-color: #0069d9;
}

input[type="submit"] {
    background-color: #28a745;
}

input[type="submit"]:hover {
    background-color: #218838;
}

.error {
    color: red;
    margin-top: 0.5rem;
}
</style>