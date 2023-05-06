<template>
  <tr>
    <td>
      <RouterLink :to="{ name: 'Panel', params: { app: subProject.slug } }" style="display: block">
        <i class="fas fa-folder text-muted" style="margin-right: 5px"></i>
        {{ subProject.title }}
      </RouterLink>
    </td>
    <td>{{ subProject.created_at }}</td>
    <td style="text-align: end">
      <div style="display: flex; justify-content: end">
        <a href="#" class="btn btn-sm btn-primary" style="margin-right: 10px" data-toggle="modal" data-target="#editApp"
          @click.prevent="$emit('emitSubproject', subProject)">
          Güncelle
        </a>
        <a href="#" class="btn btn-sm btn-danger" @click.prevent="$emit('deleteSubproject', subProject)">
          Sil
        </a>
      </div>
    </td>
  </tr>
</template>

<script setup>
defineProps({
  subProject: Object,
});
</script>
