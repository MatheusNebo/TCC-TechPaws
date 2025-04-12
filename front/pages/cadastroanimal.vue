<template>
  <div class="fade-in" v-if="isCliente">
    <header>
      <h2>Cadastro de Animal</h2>
    </header>
    <form @submit.prevent="carregarDados" class="formcadastro">
      <label for="nome">Nome</label>
      <input type="text" id="nome" placeholder="Digite o nome" required><br>

      <fieldset>
        <legend>Sexo</legend>
        <label>
          <input type="radio" name="sexo" value="M" id="sexo-masculino"> Masculino
        </label><br>
        <label>
          <input type="radio" name="sexo" value="F" id="sexo-feminino"> Feminino
        </label><br>
      </fieldset><br>

      <label for="dataResgate">Data de resgate</label>
      <input type="date" id="dataResgate" required>

      <label for="especies">Espécie</label>
      <select v-model="selectedEspecie" @change="carregarRacas">
        <option value="">Selecione uma espécie</option>
        <option v-for="especie in especies" :key="especie.id" :value="especie.id">{{ especie.nome }}</option>
      </select>

      <label for="racas">Raça</label>
      <select v-model="selectedRaca" :disabled="!selectedEspecie">
        <option value="">Selecione uma raça</option>
        <option v-for="raca in racas" :key="raca.id" :value="raca.id">{{ raca.nome }}</option>
      </select>

      <label for="dataNascimento">Data de nascimento</label>
      <input type="date" id="dataNascimento" required>

      <label for="cor">Cor</label>
      <input type="text" id="cor" placeholder="Digite a cor" required>

      <label for="localResgate">Local de resgate</label>
      <input type="text" id="localResgate" placeholder="Digite o local de resgate" required>

      <label for="estadoSaude">Estado de saúde</label>
      <input type="text" id="estadoSaude" placeholder="Digite o estado de saúde" required>

      <div class="button-container">
        <button type="submit" class="button-enviar">Cadastrar</button>
      </div>
    </form>
  </div>
  <p v-else>Não possui acesso</p>
</template>


<script>
import { get, teste } from '../src/Api2';
//import {uploadImage} from '../src/Imagem';
import sessions from '~/mixin/session';
  export default {
    data(){
      return{
        selectedEspecie: null,
        selectedRaca: null,
        especies: [],
        racas: [],
        isCliente: null,
        CLIENT_ID: 'd340f9835359bb8',
      };
    },
    mixins: [sessions],
    name: "cadastroanimalpage",
    methods: {
      async carregarEspecies () {
        try {
          const result = await get('especies');
          this.especies = result;
          this.isCliente = this.get_session('cargo') === 'cliente' ? false : true;

        } catch (error) {
          console.error('Erro ao carregar as espécies:', error);
        }
      },

      async carregarDados() {
        try {
        const nome = document.getElementById('nome').value;
        const sexo = document.querySelector('input[name="sexo"]:checked')?.value;
        const dataResgate = document.getElementById('dataResgate').value;
        const especie_id = this.selectedEspecie;
        const raca_id = this.selectedRaca;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const cor = document.getElementById('cor').value;
        const localResgate = document.getElementById('localResgate').value;
        const estadoSaude = document.getElementById('estadoSaude').value;
        const file = document.getElementById('file')

        const especies = this.especies.find(e => e.id === this.selectedEspecie);
        const especie = especies.nome;
        const racas = this.racas.find(r => r.id === this.selectedRaca);
        const raca = racas.nome;

        
        const data = {
          nome,
          sexo,
          dataResgate,
          especie,
          raca,
          dataNascimento,
          cor,
          localResgate,
          estadoSaude
        };

          console.log(data)
          await teste('POST', 'voluntarios/AdicionaAnimail', data, '');
          this.$router.push("/hubadmin");
        } catch (error) {
          console.error('Erro ao carregar os dados:', error);
        }
      },
      async carregarRacas() {
      try {
        if (!this.selectedEspecie) return;
        const result = await get(`racas/${this.selectedEspecie}`)
        this.racas = result; 
      } catch (error) {
        console.error('Erro ao carregar as raças:', error);
      }
      },
    },
    mounted() {
        this.carregarEspecies();
        
    },
  };
</script>