<template>
    <div class="container-fluid">
        <h3 class="page-title">Üye Giriş Kodu Gönderme</h3>
        <h4 class="page-title"><span style="margin-right: 7px"
                class="label label-default">https://yolhizmeti.com/api/v1/corporate/send-code</span><span
                class="label label-primary">POST</span></h4>
        <div class="row">
            <div class="col-md-5">
                <div class="panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">Request</h3>
                    </div>
                    <div class="panel-body">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Parametre</th>
                                    <th>Tür</th>
                                    <th>Durum</th>
                                    <th>Açıklama</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>phone</td>
                                    <td>string</td>
                                    <td>zorunlu</td>
                                    <td>Hataya ait açıklama mesajı.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- END TABLE HOVER -->
            </div>
            <div class="col-md-7">
                <!-- TABLE HOVER -->
                <div class="panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">HTTP Durum Kodları</h3>
                    </div>
                    <div class="panel-body">
                        <pre>200 - Tamam Her şey beklendiği gibi çalıştı.
400 - Hatalı istek. Çoğunlukla gerekli olan bir parametrenin eksik olması nedeniyle kabul edilmez.
401 - Geçersiz/Yetkisiz API Token kodu.
402 - Parametreler geçerli fakat istek başarısız oldu.
403 - Yasaklanış yada pasife alınmış token kodu. İsteği gerçekleştirme izni yok.
404 - Bulunamadı! İstenen kaynak mevcut değil.
405 - Geçersiz method. Kaynak bir GET veya POST yöntemi bekliyor olabilir, ancak bir DELETE veya PUT yöntemi alırsa, yapılan istek 405 olarak reddedilecektir.
409 - Web sunucusu üzerinde önceden belitrilmiş bir kural veya versiyon farklılıklarından dolayı oluşan uyumsuzluğun neden olduğu hata mesajıdır.
429 - API Token kodu ile çok fazla istek yapıldı.
500, 502, 503, 504 - Sunucu Hataları! Yazılım tarafında bir şeyler ters gitti.</pre>
                    </div>
                </div>
                <!-- END TABLE HOVER -->
            </div>
        </div>
    </div>
</template>

<script setup>

</script>