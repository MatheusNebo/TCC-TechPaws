<template>
  <header>    
      <h2>HISTÓRICO DE ADOÇÕES</h2>
  </header>
  <table class="tabelaadocoes">
      <thead>
          <tr class="tabela-historico">
              <th>Nome do animal</th>
              <th>Nome do adotante</th>
              <th>Data de criação</th>
          </tr>
      </thead>
      
      <!-- dados da tabela -->
      <tbody>
          <tr v-for="adocao in adocoes" :key="adocao.id" class="tabela-historico">
              <td>{{ adocao.nomeAnimal }}</td>
              <td>{{ adocao.nomePessoa }}</td>
              <td>{{ adocao.dataCriacao }}</td>
          </tr>
      </tbody>
  </table>
</template>

<script>
import { get } from '../src/Api2';

export default {
  data() {
    return {
      adocoes: [], // Array para armazenar os dados das adoções
      datasAdocoes: [], // Array para armazenar as datas das adoções
    };
  },
  methods: {
    formatarData(dataString) {
      const data = new Date(dataString);
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam do zero
      const ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
    },
    
    async carregarDados() {
      try {
        const result = await get('adocoes'); 
        
        // Desestruturar o resultado
        const { adocoes, data } = result;

        // Para cada adoção, buscamos os dados da pessoa e do animal
        this.adocoes = await Promise.all(adocoes.map(async (adocao) => {
          const pessoa = await get(`pessoas/${adocao.pessoa_id}`);
          const animal = await get(`animais/${adocao.animal_id}`);
          
          // Retorna um novo objeto com os dados necessários, incluindo a data formatada
          return {
            ...adocao,
            nomePessoa: pessoa.nome,
            nomeAnimal: animal.nome,
            dataCriacao: this.formatarData(adocao.criado_em), // Formata a data de criação
          };
        }));

        console.log(this.adocoes); // Para verificar os dados das adoções
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    },
  },

  mounted() {
    this.carregarDados();
  },
};

</script>

<style>
.tabelaadocoes {
width: 100%;
border-collapse: collapse;
}
.tabela-historico {
border: 1px solid #ddd;
}
</style>
