<template>
  <tr>
    <td>
      <RouterLink :to="{ name: 'Apps', params: { project: project.slug } }" style="display: block">
        <i class="fas fa-folder text-muted" style="margin-right: 5px"></i>
        {{ project.title }}
      </RouterLink>
    </td>
    <td>{{ project.created_at }}</td>
    <td style="text-align: end">
      <div style="display: flex; justify-content: end">
        <a href="#" class="btn btn-sm btn-primary" style="margin-right: 10px" data-toggle="modal"
          data-target="#editProject" @click.prevent="$emit('emitProject', project)">
          Güncelle
        </a>
        <a href="#" class="btn btn-sm btn-danger" @click.prevent="$emit('deleteProject', project)">
          Sil
        </a>
      </div>
    </td>
  </tr>
</template>

<script setup>
defineProps({
  project: Object,
});
</script>
