Vue.component('search', {
    data() {
        return {
            searchStr: ''
        }
    },

    template: `
        <form action="#" class="search-form" @submit.prevent="$emit('search', searchStr)">
            <input type="text" class="search-field" v-model="searchStr">
            <button type="submit" class="btn-search">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `
});
