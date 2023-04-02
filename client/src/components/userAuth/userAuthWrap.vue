<template>
  <div class="userForm">
    <form>
      <h2>Авторизация</h2>
      <div class="form_group">
        <label for="email">Email</label>
        <input type="email" placeholder="Введите email" />
      </div>
      <div class="form_group">
        <label for="password">Пароль</label>
        <input type="password" placeholder="Введите пароль" />
      </div>
      <button>Войти</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.userForm {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #b9b6b9;
  background-color: #ecebec;
}
.form_group {
  margin-left: 30px;
}
</style>