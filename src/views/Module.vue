<template>
  <div class="container-fluid">
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
      "
    >
      <div style="display: flex; align-items: center">
        <h3 class="page-title" style="margin: 0" v-if="editTitle">
          Üye Giriş Kodu Gönderme
        </h3>
        <input type="text" class="form-control" value="Üye Giriş Kodu Gönderme" v-else />
        <a href="#" @click="editTitle = false" v-if="editTitle">
          <i
            class="fas fa-pen text-primary"
            style="font-size: 16px; margin-left: 15px"
          ></i>
        </a>
        <a href="#" @click="editTitle = true" v-else>
          <i
            class="fas fa-times text-danger"
            style="font-size: 16px; margin-left: 15px"
          ></i>
        </a>
      </div>
    </div>
    <h4 class="page-title" style="display: flex; align-items: center">
      <div v-if="editEndpoint">
        <span style="margin-right: 7px" class="label label-default"
          >https://yolhizmeti.com/api/v1/corporate/send-code</span
        >
        <span class="label label-primary">POST</span>
      </div>
      <div v-else class="row">
        <div class="col-md-8" style="padding-right: 0">
          <input
            type="text"
            class="form-control"
            value="https://yolhizmeti.com/api/v1/corporate/send-code"
          />
        </div>
        <div class="col-md-4">
          <select class="form-control" value="POST">
            <option value="">GET</option>
            <option value="">POST</option>
            <option value="">PUT</option>
            <option value="">DELETE</option>
          </select>
        </div>
      </div>
      <a
        href="#"
        style="font-size: 16px; margin-left: 15px"
        v-if="editEndpoint"
        @click="editEndpoint = false"
      >
        <i class="fas fa-pen"></i>
      </a>
      <a
        href="#"
        style="font-size: 16px; margin-left: 15px"
        v-else
        @click="editEndpoint = true"
      >
        <i class="fas fa-times text-danger"></i>
      </a>
    </h4>
    <div class="row">
      <div class="col-md-5">
        <div class="panel">
          <div class="panel-heading">
            <div style="display: flex; justify-content: space-between">
              <h3 class="panel-title">Request</h3>
              <a
                href="#"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#createParameter"
                ><i class="fas fa-plus"></i> Parametre Ekle</a
              >
            </div>
          </div>
          <div class="panel-body">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Parametre</th>
                  <th>Tür</th>
                  <th>Durum</th>
                  <th>Açıklama</th>
                  <th style="text-align: end"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>phone</td>
                  <td>string</td>
                  <td>zorunlu</td>
                  <td>Hataya ait açıklama mesajı.</td>
                  <td style="text-align: end">
                    <a
                      href=""
                      class="btn btn-sm btn-primary"
                      data-toggle="modal"
                      data-target="#editParameter"
                      style="margin-right: 7px"
                    >
                      <i class="fas fa-pen"></i>
                    </a>
                    <a href="" class="btn btn-sm btn-danger">
                      <i class="fas fa-trash"></i>
                    </a>
                  </td>
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
            <pre>
200 - Tamam Her şey beklendiği gibi çalıştı.
400 - Hatalı istek. Çoğunlukla gerekli olan bir parametrenin eksik olması nedeniyle kabul edilmez.
401 - Geçersiz/Yetkisiz API Token kodu.
402 - Parametreler geçerli fakat istek başarısız oldu.
403 - Yasaklanış yada pasife alınmış token kodu. İsteği gerçekleştirme izni yok.
404 - Bulunamadı! İstenen kaynak mevcut değil.
405 - Geçersiz method. Kaynak bir GET veya POST yöntemi bekliyor olabilir, ancak bir DELETE veya PUT yöntemi alırsa, yapılan istek 405 olarak reddedilecektir.
409 - Web sunucusu üzerinde önceden belitrilmiş bir kural veya versiyon farklılıklarından dolayı oluşan uyumsuzluğun neden olduğu hata mesajıdır.
429 - API Token kodu ile çok fazla istek yapıldı.
500, 502, 503, 504 - Sunucu Hataları! Yazılım tarafında bir şeyler ters gitti.</pre
            >
          </div>
        </div>
        <!-- END TABLE HOVER -->
      </div>
    </div>
    <Modal
      id="createParameter"
      title="Parametre Ekle"
      aria-labelledby="createParameterLabel"
      label-id="createParameterLabel"
    >
      <form>
        <div class="modal-body">
          <Input type="text" label="Başlık" for-label="title" />
          <Input type="text" label="Tür" for-label="type" />
          <Input type="text" label="Durum" for-label="status" />
          <Input type="text" label="Açıklama" for-label="description" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Kapat
          </button>
          <button type="submit" class="btn btn-primary">Kaydet</button>
        </div>
      </form>
    </Modal>
    <Modal
      id="editParameter"
      title="Parametre Güncelle"
      aria-labelledby="editParameterLabel"
      label-id="editParameterLabel"
    >
      <form>
        <div class="modal-body">
          <Input type="text" label="Başlık" for-label="title" />
          <Input type="text" label="Tür" for-label="type" />
          <Input type="text" label="Durum" for-label="status" />
          <Input type="text" label="Açıklama" for-label="description" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Kapat
          </button>
          <button type="submit" class="btn btn-primary">Güncelle</button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import Input from "../components/Input.vue";

const editEndpoint = ref(true);
const editTitle = ref(true);
</script>
