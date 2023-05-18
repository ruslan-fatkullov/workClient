<template>
    <div class="footer">
        <div class="container footer_main">
            <div class="row">
                <div class="col-12 col-lg-3 footer_block footer_description"><img src="../assets/logo-footer.png" alt="">
                    <p>Разработка, производство
                        и модернизация авиационных
                        учебно-тренировочных средств</p>
                </div>
                <div class="col-lg-3 footer_block">
                    <h3 class="footer_header">Продукты</h3>
                    <p>
                        <a href="https://www.esvoavia.ru/products/aviaczionnye-trenazhyory/">Авиационные тренажёры</a>
                    </p>
                    <p>
                        <a href="https://www.esvoavia.ru/sistemy-podvizhnosti-2/">Системы подвижности</a>
                    </p>
                    <p>
                        <a href="https://www.esvoavia.ru/products/ukk/"> Учебные классы</a>
                    </p>
                    <p>
                        <a href="https://www.esvoavia.ru/promyshlennoe-oborudovanie/">Промышленное оборудование</a>
                    </p>
                    <p>
                        <a href="https://www.esvoavia.ru/shturmanskoe-snaryazhenie/">Штурманское снаряжение</a>
                    </p>
                </div>
                <div class="col-lg-3 footer_block">
                    <h3 class="footer_header">О компании</h3>
                    <p><a href="https://www.esvoavia.ru/novosti/">Новости</a></p>
                    <p><a href="https://www.esvoavia.ru/istoriya/">История</a></p>
                    <p><a href="https://www.esvoavia.ru/o-kompanii/#geo">География проектов</a></p>
                </div>
                <div class="col-lg-3 footer_block contacts">
                    <h3 class="footer_header">Контакты</h3>
                    <p>ООО "ЭСВО"</p>
                    <p>Линия 17-я В.О., д. 4-6, лит. Е,</p>
                    <p>пом. 1Н, 2Н,</p>
                    <p>3Н, 4Н офис Т-414.</p>
                    <p>г. Санкт-Петербург,</p>
                    <p>Россия, 199034</p>
                    <p>+7 (812) 347-8757</p>
                    <a href="mailto:info@esvoavia.ru">
                        <p>info@esvoavia.ru</p>
                    </a>
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

<style scoped>
.footer {
    background-color: #222c36;
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
    border-top: 1px solid #303941;
    color: aliceblue;
    text-align: left;
    line-height: 1;

    
    overflow: auto;
    overflow-x: hidden;

}

.footer_main {
    padding: 3rem 0;
}

.footer_header {
    color: #2cadb5;
}

.footer_copy {
    text-align: center;
    padding: 2rem 0;
    border-top: 1px solid #303941;
}

.footer_copy p {
    margin: 0;
}

.footer_description p {
    margin-top: 10px;
}

.footer_block a {
    text-decoration: none;
    color: #ffffff;
}

.footer_block a:hover {
    color: #2cadb5;
}

.contacts a {
    text-decoration: none;
    color: #2cadb5;
}

@media only screen and (max-width : 991px) {

    .footer p,
    h3,
    img {
        margin-left: 30px;
        font-size: 14px;
    }

    .footer_block {
        margin-top: 30px;
    }

    .footer_description {
        position: relative;
    }

    .footer_description img {
        display: block;
        margin-left: auto;
        margin-right: auto
    }
}
</style>