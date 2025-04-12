<template>
    <div class="fade-in" v-if="!isCliente">
      <section>
        <div class="filtro">
          <label>Filtro de Pesquisa</label>
          <select v-model="selectedAnimal" @change="carregarAnimal">
            <option value=""></option>
            <option v-for="animal in animais" :key="animal.id" :value="animal.id">{{ animal.nome }}</option>
          </select>
          <button @click="carregarDados">Mostrar Todos</button>
        </div>
        <div v-if="animalFiltrado" class="div2">
          <div>
            <ul>
              <li>
                <h2>Nome do Animal: {{ animalFiltrado.nome }}</h2>
                <p>Data de nascimento: {{ animalFiltrado.dataNascimento }}</p>
                <p>Espécie: {{ animalFiltrado.especie }}</p>
                <p>Raça: {{ animalFiltrado.raca }}</p>
                <p>Sexo: {{ animalFiltrado.sexo }}</p>
                <p>Cor: {{ animalFiltrado.cor }}</p>
              </li>
            </ul>
          </div>
          <div>
            <!-- Verifica se há uma imagem específica para o animal -->
            <img :src="animalFiltrado.imagemUrl || '/components/assets/img/TechPaws.png'" class="imgsection" alt="Foto do Animal">
          </div>
        </div>
        <div v-else class="div2" v-for="animal in animais" :key="animal.id">
          <div>
            <ul>
              <li>
                <h2>Nome do Animal: {{ animal.nome }}</h2>
                <p>Data de nascimento: {{ animal.dataNascimento }}</p>
                <p>Espécie: {{ animal.especie }}</p>
                <p>Raça: {{ animal.raca }}</p>
                <p>Sexo: {{ animal.sexo }}</p>
                <p>Cor: {{ animal.cor }}</p>
              </li>
            </ul>
          </div>
          <div>
            <!-- Verifica se há uma imagem específica para o animal -->
            <img :src="animal.imagemUrl || '/components/assets/img/TechPaws.png'" class="imgsection" alt="Foto do Animal">
          </div>
        </div>
      </section>
    </div>
    <p v-else>Não possui acesso</p>
  </template>
  
  <script>
  import { get } from '../src/Api2';
  import { useRoute } from 'vue-router';
  import session from '~/mixin/session';
  
  export default {
    data() {
      return {
        animais: [], // Array para armazenar os dados dos animais
        animalFiltrado: null,
      };
    },
    mixins: [session],
    methods: {
      async carregarDados() {
        try {
          this.animalFiltrado = null;
          const route = useRoute();
          const id = route.params.id; // Obtenha o id da rota, se necessário
          const result = await get('animais', id); // Chamada à API para buscar os animais
          this.animais = result; // Atualiza o array `animais` com os dados recebidos
          this.isCliente = this.get_session('cargo') === 'cliente'; // true se for cliente
        } catch (error) {
          console.error('Erro ao carregar os dados:', error);
        }
      },
      async carregarAnimal(){
        try{
          if(!this.selectedAnimal) return;
          const result = await get(`animais/${this.selectedAnimal}`);
          this.animalFiltrado = result;
        }catch(error){
          console.error('Erro ao carregar o animal',error);
        }
      }
    },
    mounted() {
      // Carrega os dados automaticamente quando o componente é montado
      this.carregarDados();
    },
  };
  </script>
  