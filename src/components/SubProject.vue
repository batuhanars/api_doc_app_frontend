<template>
  <tr>
    <td>
      <RouterLink
        :to="{ name: 'Panel', params: { app: 'kurumsal' } }"
        style="display: block"
      >
        <i class="fas fa-folder text-muted" style="margin-right: 5px"></i>
        Kurumsal
      </RouterLink>
    </td>
    <td>2023-04-26</td>
    <td style="text-align: end">
      <div style="display: flex; justify-content: end">
        <a
          href=""
          class="btn btn-sm btn-primary"
          style="margin-right: 10px"
          data-toggle="modal"
          data-target="#editApp"
        >
          Güncelle
        </a>
        <a href="" class="btn btn-sm btn-danger"> Sil </a>
      </div>
    </td>
  </tr>
</template>

<script setup></script>
