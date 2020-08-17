var app = new Vue({
    el: '#app',
    data: {
        jogando: false,
    },
    methods: {
        iniciarJogo() {
            this.jogando = true;
        },
        desistir() {
            this.jogando = false;
        }
    },
    
});