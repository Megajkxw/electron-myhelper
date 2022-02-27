<template>
    <v-md-editor v-model="text" height="400px"></v-md-editor>
</template>

<script>
    export default {
        name: "Note",
        data() {
            return {
                text: '',
            };
        },
    }
</script>

<style scoped>

</style>
