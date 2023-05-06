<template>
    <div class="footer">
        <div class="container ">
            <div class="row">
                <div class="col">Сайт</div>
                <div class="col">Новости</div>
                <div class="col">Контакты</div>
                <div class="col">
                    <h3 class="footer_header">Контакты</h3>
                    <p>ООО "ЭСВО"</p>
                    <p>Линия 17-я В.О., д. 4-6, лит. Е,</p>
                    <p>пом. 1Н, 2Н,</p>
                    <p>3Н, 4Н офис Т-414.</p>
                    <p>г. Санкт-Петербург,</p>
                    <p>Россия, 199034</p>
                    <p>+7 (812) 347-8757</p>
                    <a href="mailto:info@esvoavia.ru"><p>info@esvoavia.ru</p></a>
                </div>
            </div>
        </div>
        <div class="footer_copy">
            <p>© 2007-2023 ООО "ЭСВО"</p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style >
.footer {
    background-color: #222c36;
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
    margin-top: 3rem;
    border-top: 1px solid #303941;
    color: aliceblue;
    text-align: left;

}
.footer_header{
    color: #2cadb5;
}

.footer_copy {
    text-align: center;
    padding: 2rem;
    border-top: 1px solid #303941;
}

.footer_copy p {
    margin: 0;
}</style>