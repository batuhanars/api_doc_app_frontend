<template>
    <tr>
        <td>{{ parameter.title }}</td>
        <td>{{ parameter.type }}</td>
        <td>{{ parameter.status }}</td>
        <td>{{ parameter.description }}</td>
        <td style="text-align: end">
            <a href="#" class="btn btn-sm btn-primary" @click.prevent="$emit('emitParameter', parameter)"
                data-toggle="modal" data-target="#editParameter" style="margin-right: 7px">
                <i class="fas fa-pen"></i>
            </a>
            <a href="#" class="btn btn-sm btn-danger" @click.prevent="$emit('deleteParameter', parameter)">
                <i class="fas fa-trash"></i>
            </a>
        </td>
    </tr>
</template>

<script setup>
defineProps({
    parameter: Object,
});
</script>
