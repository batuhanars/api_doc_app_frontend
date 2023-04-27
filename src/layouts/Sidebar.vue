<template>
    <div id="sidebar-nav" class="sidebar">
        <div class="sidebar-scroll">
            <nav>
                <ul class="nav">
                    <li><a href="index" class=""><i class="lnr lnr-home"></i> <span>Anasayfa</span></a></li>
                    <li>
                        <a href="#subPages" data-toggle="collapse" class="collapsed"><i class="lnr lnr-enter"></i>
                            <span>Oturum İşlemleri</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                        <div id="subPages" class="collapse ">
                            <ul class="nav">
                                <li><a href="send-code" class="">Giriş Kodu &nbsp; <span
                                            class="label label-primary">POST</span></a>
                                </li>
                                <li><a href="login" class="">Kod Onayı &nbsp; <span
                                            class="label label-primary">POST</span></a></li>
                                <li><a href="user-info" class="">Üye Bilgileri &nbsp; <span
                                            class="label label-success">GET</span></a>
                                </li>
                                <li><a href="logout" class="">Üye Çıkışı &nbsp; <span
                                            class="label label-success">GET</span></a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup>

</script>