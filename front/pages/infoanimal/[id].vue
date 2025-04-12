<template>
  <div class="fade-in">
    <header>
      <h1>Informações do Animal</h1>
    </header>
    <section class="sectionficha">
      <div class="divficha" v-if="animal">
        <h2>Dados do Animal</h2>
        <ul>
          <li>
            <p>Nome: {{ animal.nome }}</p>
            <p>Raça: {{ animal.raca }}</p>
            <p>Espécie: {{ animal.especie }}</p>
            <p>Sexo: {{ animal.sexo }}</p>
          </li>
        </ul>
      </div>
      <p v-else>Carregando informações do animal...</p>

      <div class="divficha" v-if="registros.length > 0">
        <h2>Ficha de Anamnese - Histórico Clínico</h2>
        <div class="divficha" v-for="registro in registros" :key="registro.id">
        
        <ul>
          <li>
            <p>Autor: {{ registro.autor }}</p>
            <p>Tipo Registro: {{ registro.tipo_registro }}</p>
            <p>Informações: {{ registro.informacoes }}</p>
          </li>
        </ul>
        </div>
      </div>
      <p v-else></p>
      
    </section>
  </div>
</template>

<script>
import { get, teste } from '../../src/Api2';

export default {
  data() {
    return {
      animal: null,
      especie: null,
      raca: null,
      registros: [], // Objeto para armazenar os dados do animal
    };
  },
  methods: {
    async carregarDados() {
      try {
        const route = useRoute();
        const id = route.params.id;

        const result = await get(`animais/${id}`); 
        this.animal = result;  
        const especies = await get(`especies`);
        this.especie = especies.find((especie) => especie.id === this.animal.especie_id);

        const result2 = await get(`registros/animal/${id}`);
        this.registros = result2;
        console.log(this.registros)
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    },
    async adocaAnimal() {
      try {
        this.animal.adotado = true;

        const data = {
          nome: this.animal.nome,
          sexo: this.animal.sexo,
          data_nascimento: this.animal.data_nascimento,
          especie_id: this.animal.especie_id,
          raca_id: this.animal.raca_id,
          adotado: this.animal.adotado,
        };

        await teste('POST', `funcionarios/AlteraAnimal/`, this.animal, this.animal.id);

        this.$router.push('/');
        }
        
        catch (error) {
        console.error('Erro ao adotar o animal:', error);
      }
    },
  },
  mounted() {
    this.carregarDados(); 
  },
};
</script>
