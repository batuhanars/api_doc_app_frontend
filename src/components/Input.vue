<template>
  <div class="form-group" v-if="type == 'file'">
    <label :for="forLabel" class="form-label">{{ label }}</label>
    <small class="text-danger" style="margin-left: 5px">{{ error }}</small>
    <input type="file" @change="$emit('update:modelValue', $event.target.files[0])" class="form-control" />
  </div>
  <div class="form-group" v-else>
    <label :for="forLabel" class="form-label">{{ label }}</label>
    <small class="text-danger" style="margin-left: 5px">{{ error }}</small>
    <input :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="label"
      class="form-control" />
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  modelValue: [String, Object],
  forLabel: String,
  type: String,
  error: String,
});
</script>
