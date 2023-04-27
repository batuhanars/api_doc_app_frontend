<template>
    <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div style="display: flex; justify-content:space-between">
                        <h5 class="modal-title" :id="labelId">{{ title }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    labelId: String,
})
</script>