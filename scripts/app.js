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
            this._resetarStatusPersonagens();
        },
        desistir() {
            this.jogando = false;
            this._resetarStatusPersonagens();
        },
        atacar() {
            let atkJogador = this._geraAtaque(this.jogador.ataque);
            let atkMonstro = this._geraAtaque(this.monstro.ataque);

            this.monstro.vida -= atkJogador;            
            this._adicionarLog(`Monstro atacou jogador com ${atkMonstro}.`, 'monstro');

            this.jogador.vida -= atkMonstro;            
            this._adicionarLog(`Jogador atacou monstro com ${atkJogador}.`, 'jogador');

            if(this._determinarFimDeJogo()){
                this.jogando = false;
                this.mensagemFimJogo = this._retornaGanhador();
            }
                        
        },
        ataqueEspecial() {
            
        },
        curar() {
            this.jogador.vida += (Math.random * 100);
        },
        _resetarStatusPersonagens() {
            this.monstro.vida = 100;
            this.jogador.vida = 100;
            this.logs = [];
        },
        _adicionarLog(mensagem, tipo){
            this.logs.push({descricao: mensagem, tipo: tipo});
        },

        _geraAtaque(ataque){
            return Math.round(Math.random()) + ataque;
        },
        _determinarFimDeJogo(){
            return this.jogador.vida <= 0 || this.monstro.vida <= 0;  
        },
        _retornaGanhador(){
            return this.jogador.vida <= 0 ? 'Voce perdeu o jogo!' : 'Voce venceu!!'
        }
    },
    
});