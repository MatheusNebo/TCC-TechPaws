<template>
    <div class="fade-in">
      <header>
        <h1>Seu Perfil</h1>
      </header>
      <section class="perfil" v-if="pessoa">
        <div>
          <img class="imgsection" src="/components/assets/img/perfil.svg" alt="Imagem de Perfil">
          <br>
          <button>Editar Foto</button>
        </div>
        <div>
          <ul>
            <li>Nome: {{ pessoa.nome }}</li>
            <li>Data de Nascimento: {{ formatarData(pessoa.dataNascimento) }}</li>
            <li>Email: {{ pessoa.email }}</li>
            <li>Senha: {{ pessoa.senha }}</li>
            <li>CPF: {{ pessoa.cpf }}</li>
          </ul>
          <nuxt-link :to="`/editarperfil`"><button>Editar seus Dados</button></nuxt-link>
        </div>
        <div v-if="isCliente" style="display: flex; gap: 10px; margin-top: 20px; align-items: center; margin-left: 30%;">
          <nuxt-link to="/hubadmin"><button>Acesso rápido</button></nuxt-link>
          
        </div>
        <button @click="logout">Logout</button>
      </section>
      <p v-else>Carregando informações do perfil...</p>
      <p v-if="mensagem" class="mensagem">{{ mensagem }}</p>
    </div>
  </template>
  
  <script>
  import { get } from '../../src/Api2';
  import session from '~/mixin/session';
  
  export default {
    data() {
      return {
        pessoa: null,
        mensagem: '',
        isCliente: null,
      };
    },
    mixins: [session],
    methods: {
      formatarData(dataString) {
        const partes = dataString.split('-');
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
      },
      async carregarDados() {
        try {
          const id = this.get_session('id');
          const result = await get(`pessoas/${id}`);

          this.isCliente = this.get_session('cargo') === 'cliente' ? false : true;
         
          if (result) {
            this.pessoa = result;
            this.pessoa.dataNascimento = new Date(this.pessoa.dataNascimento)
              .toISOString()
              .split('T')[0];
            
          } else {
            console.log("Nenhuma pessoa encontrada com o ID fornecido.");
          }
        } catch (error) {
          console.error('Erro ao carregar os dados:', error);
        }
      },
      logout() {
        this.clear_storage();
        this.$router.push('/');
      },
    },
    mounted() {
      this.carregarDados();
    },
  };
  </script>
  
  <style>
  .mensagem {
    color: orange;
    margin-top: 20px;
    font-weight: bold;
  }
  </style>
  