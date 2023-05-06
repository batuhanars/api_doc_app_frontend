<template>
    <div class="col-md-5">
        <div class="panel">
            <div class="panel-heading">
                <div style="display: flex; justify-content: space-between">
                    <h3 class="panel-title">Request</h3>
                    <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#createParameter"
                        @click.prevent="createParameter"><i class="fas fa-plus"></i> Parametre Ekle</a>
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
                        <Parameter v-for="parameter in parameters" :key="parameter.id" :parameter="parameter"
                            @emit-parameter="editParameter" @delete-parameter="deleteParameter" />
                    </tbody>
                </table>
            </div>
        </div>
        <!-- END TABLE HOVER -->
        <Modal id="createParameter" title="Parametre Ekle" aria-labelledby="createParameterLabel"
            label-id="createParameterLabel">
            <form @submit.prevent="addParameter">
                <div class="modal-body">
                    <Input type="text" label="Başlık" for-label="title" v-model:modelValue="parameter.title"
                        :error="storeValidation.title" />
                    <div class="form-group">
                        <label for="status" class="form-label">Durum</label>
                        <select v-model="parameter.type" class="form-control">
                            <option value="string">string</option>
                            <option value="integer">integer</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="status" class="form-label">Durum</label>
                        <select v-model="parameter.status" class="form-control">
                            <option value="zorunlu">zorunlu</option>
                            <option value="opsiyonel">opsiyonel</option>
                        </select>
                    </div>
                    <Input type="text" label="Açıklama" for-label="description" v-model:modelValue="parameter.description"
                        :error="storeValidation.description" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                        Kapat
                    </button>
                    <button type="submit" class="btn btn-primary">Kaydet</button>
                </div>
            </form>
        </Modal>
        <Modal id="editParameter" title="Parametre Güncelle" aria-labelledby="editParameterLabel"
            label-id="editParameterLabel">
            <form @submit.prevent="updateParameter">
                <div class="modal-body">
                    <Input type="text" label="Başlık" for-label="title" v-model:modelValue="parameter.title"
                        :error="updateValidation.title" />
                    <div class="form-group">
                        <label for="status" class="form-label">Durum</label>
                        <select v-model="parameter.type" class="form-control">
                            <option value="string">string</option>
                            <option value="integer">integer</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="status" class="form-label">Durum</label>
                        <select v-model="parameter.status" class="form-control">
                            <option value="zorunlu">zorunlu</option>
                            <option value="opsiyonel">opsiyonel</option>
                        </select>
                    </div>
                    <Input type="text" label="Açıklama" for-label="description" v-model:modelValue="parameter.description"
                        :error="updateValidation.description" />
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
import { onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { useParameterStore } from "../store/parameter";
import Modal from "./Modal.vue";
import Parameter from "./Parameter.vue";
import Input from "./Input.vue";
import { useToast } from "vue-toast-notification";
import Swal from "sweetalert2";
import { storeToRefs } from "pinia";

const parameterStore = useParameterStore();
const route = useRoute();
const toast = useToast();

const { parameters, storeValidation, updateValidation } = storeToRefs(parameterStore);

const parameter = reactive({
    id: "",
    title: "",
    type: "",
    status: "",
    description: "",
});

const createParameter = () => {
    parameter.id = "";
    parameter.title = "";
    parameter.type = "string";
    parameter.status = "zorunlu";
    parameter.description = "";
};

const addParameter = () => {
    parameterStore.storeParameter(parameter, route.params.module).then((data) => {
        toast.success(data.success);
    });
};

const editParameter = ({ id, title, type, status, description }) => {
    parameter.id = id;
    parameter.title = title;
    parameter.type = type;
    parameter.status = status;
    parameter.description = description;
};

const updateParameter = () => {
    parameterStore.updateParameter(parameter, route.params.module).then((data) => {
        toast.success(data.success);
    });
};

const deleteParameter = (parameter) => {
    Swal.fire({
        title: "Emin misin?",
        text: "Bu parametreyi silmek istiyor musunuz?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "İptal",
        confirmButtonText: "Evet! Sil",
    }).then((result) => {
        if (result.isConfirmed) {
            parameterStore.deleteParameter(parameter.id, route.params.module).then((data) => {
                toast.success(data.success);
            });
        }
    });
};

watch(
    () => route.params.module,
    (value) => {
        parameterStore.getParameters(value);
    }
);

onMounted(() => {
    parameterStore.getParameters(route.params.module);
});
</script>
