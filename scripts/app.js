var app = new Vue({
    el: '#app',
    data: {
        jogando: false,
        monstro: {
            vida: 100,
            ataque: 11       
        },
        jogador: {
            vida: 100,
            ataque: 10
        },
        logs: [],

        mensagemFimJogo: ''
    },
    methods: {        
        iniciarJogo() {
            this.jogando = true;            
            this._resetarJogo();
        },
        desistir() {
            this.jogando = false;
            this._resetarJogo();
        },
        atacar() {
             this._realizarAtaquejogador(this._geraAtaque(this.jogador.ataque));
            this._realizarAtaqueMonstro();            

            if(this._verificarFimDeJogo()){
                this.jogando = false;
                this.mensagemFimJogo = this._retornaGanhador();
            }
                        
        },
        ataqueEspecial() {
            this._realizarAtaquejogador(this._geraAtaque(this.jogador.ataque + 3));
            this._realizarAtaqueMonstro();
            this._verificarFimDeJogo();

        },

        curar() {
            const quantidadeCura = this._geraCura();

            if(this.jogador.vida != 100)
                this.jogador.vida += quantidadeCura;

            this._adicionarLog(`Jogador se curou em ${quantidadeCura}.`, 'cura');
            
            this._realizarAtaqueMonstro();                       
            this._verificarFimDeJogo();
        },


        _resetarJogo() {
            this.monstro.vida = 100;
            this.jogador.vida = 100;
            this.mensagemFimJogo = '';
            this.logs = [];
        },

        _adicionarLog(mensagem, tipo){
            this.logs.push({descricao: mensagem, tipo: tipo});
        },

        _geraAtaque(ataque){
            return Math.round(Math.random()) + ataque;
        },

        _geraCura(){
           return Math.round(Math.random()) + (this.jogador.ataque + 3);
        },

        _verificarFimDeJogo(){
            if(this.jogador.vida <= 0 || this.monstro.vida <= 0){
                this.jogando = false;
                this.mensagemFimJogo = this._retornaGanhador();
                return;
            }
            return;  
        },
        _retornaGanhador(){
            return this.jogador.vida <= 0 ? 'Monstro venceu!!' : 'Jogador venceu!!'
        },

        _realizarAtaquejogador(ataque){
            this.monstro.vida -= ataque;            
            this._adicionarLog(`Jogador atacou monstro com ${ataque}.`, 'jogador');
        },

        _realizarAtaqueMonstro(){
            const ataque = this._geraAtaque(this.monstro.ataque);
            this.jogador.vida -= ataque;
            this._adicionarLog(`Monstro atacou jogador com ${ataque}.`, 'monstro');
        }
    },
    
});