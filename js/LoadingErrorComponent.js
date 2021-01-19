Vue.component('load-error', {
    props: ['showError'],
    template: `
        <p class="error" v-show="showError">Произошла ошибка при загрузке каталога</p>
    `
});
