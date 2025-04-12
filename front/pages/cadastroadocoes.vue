<template>
    <div class="fade-in" v-if="isCliente">
        <header>
            <h2>CADASTRO DE ADOÇÃO</h2>
        </header>
        <div class="formcadastro">
            <form @submit.prevent="salvaAnimalOuPessoa" class="formcadastro">

                <label for="">Cliente que adotou</label>
                <select id="pessoa" v-model="pessoaSelecionada"   required>
                    <option v-for="pessoa in pessoas" :key="pessoa.id" :value="pessoa.id">
                        {{ pessoa.nome }}
                    </option>
                </select>
        
                <label for="">Animal Adotado</label>
                <select id="animal" v-model="animalSelecionado"  required>
                    <option v-for="animal in animais" :key="animal.id" :value="animal.id">
                        {{ animal.nome }}
                    </option>
                </select>
                      
                <div class="button-container">
                <button type="submit" class="button-enviar">Cadastrar</button>
                </div>
            </form>
        </div>
    </div>
    <p v-else>Não possui acesso</p>
  </template>
<script>
import { get, teste } from '../src/Api2'; 
import session from '~/mixin/session';// Funções que fazem chamadas à API

export default {
  data() {
    return {
      pessoas: [], // Armazena o array de pessoas que será populado pela API
      animais:[],
      pessoaSelecionada: '',
      animalSelecionado: '',
      isCliente: null
    };
  },
  mixins: [session],
  methods: {
    async carregarPessoas() {
      try {
        let response = await get('pessoas/todasPessoas');
        this.pessoas = response.filter(p => p.cargo === 'cliente');
        response = await get('animais')

        this.isCliente = this.get_session('cargo') === 'cliente' ? false : true;

        this.animais = response.filter(animal => !animal.adotado);
      } catch (error) {
        console.error('Erro ao carregar as pessoas:', error);
      }
    },
    async salvaAnimalOuPessoa() {
      try {   
        const animal = this.animais.find(a => a.id === this.animalSelecionado)
        const pessoa = this.pessoas.find(p => p.id === this.pessoaSelecionada)
        
        const animal_id = animal.id
        const pessoa_id = pessoa.id
        const data = {
          animal_id,
          pessoa_id
        };
        console.log(data)
        
        await teste('POST', 'voluntarios/CriaAdocao', data, "");
        this.$router.push('/hubadmin');
      } catch (error) {
        console.error('Erro ao cadastrar o funcionário:', error);
      }
    },
  },
  mounted() {
    this.carregarPessoas(); 
  },
};
</script>
  