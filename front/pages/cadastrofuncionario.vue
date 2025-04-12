<template>
  <div class="fade-in" v-if="!isCliente">
    <header>
      <h2>Cadastro de Funcionário</h2>
    </header>
    <form @submit.prevent="cadastrarFuncionario" class="formcadastro">
      <!-- Select para escolher uma pessoa -->
      <label for="pessoa">Selecione uma pessoa</label>
      <select id="pessoa" v-model="pessoaSelecionada" @change="preencherDadosPessoa" required>
        <option v-for="pessoa in pessoas" :key="pessoa.id" :value="pessoa.id">
          {{ pessoa.nome }}
        </option>
      </select>

      <label for="">Nome</label>
      <input type="text" v-model="form.nome" placeholder="Digite o nome" required disabled>

      <label for="">Data de nascimento</label>
      <input type="date" v-model="form.dataNascimento" required disabled>

      <label for="">CPF</label>
      <input type="text" v-model="form.cpf" placeholder="Digite o CPF" required disabled>

      <label for="">E-mail</label>
      <input type="email" v-model="form.email" placeholder="Digite o e-mail" required disabled>

      <label for="">Salário</label>
      <input type="number" v-model="form.salario" placeholder="Digite o salário" required> 

      <div class="button-container">
        <button type="submit" class="button-enviar">Cadastrar</button>
      </div>
    </form>
  </div>
  <p v-else>Não possui acesso</p>
</template>

<script>
import { get, teste } from '../src/Api2'; // Funções que fazem chamadas à API
import session from '~/mixin/session'; // Importando o mixin

export default {
  data() {
    return {
      pessoaSelecionada: '', // Armazena o ID da pessoa selecionada
      pessoas: [], // Armazena o array de pessoas que será populado pela API
      form: {
        nome: '',
        dataNascimento: '',
        cpf: '',
        email: '',
        senha: '',
        salario: '',
        isCliente: null
      },
    };
  },
  mixins: [session],
  methods: {
    async carregarPessoas() {
      try {
        const response = await get('pessoas/todasPessoas'); // Chama a API para buscar a lista de pessoas
        this.pessoas = response.filter(p => p.cargo === 'cliente'); // Supondo que a resposta seja um array de objetos com { id, nome, cpf, etc. }
        this.isCliente = this.get_session('cargo') === 'cliente'; // true se for cliente

      } catch (error) {
        console.error('Erro ao carregar as pessoas:', error);
      }
    },
    preencherDadosPessoa() {
      const pessoa = this.pessoas.find(p => p.id === this.pessoaSelecionada); // Busca os dados da pessoa selecionada
      if (pessoa) {
        this.form.nome = pessoa.nome;
        this.form.dataNascimento = pessoa.dataNascimento;
        this.form.cpf = pessoa.cpf;
        this.form.email = pessoa.email;

        const date = new Date(this.form.dataNascimento);
        this.form.dataNascimento = date.toISOString().split('T')[0];
      }
    },
    async cadastrarFuncionario() {
      try {
        const dadosFuncionario = {
          pessoa_id: this.pessoaSelecionada,
          salario: this.form.salario,
          administrador_id: 1, // Supondo que o administrador logado tenha ID 2
          clinica_id: 1
        };

        // Chama a API para cadastrar o funcionário
        await teste('POST', 'funcionarios/', dadosFuncionario, "");
        
        alert('Funcionário cadastrado com sucesso!');
        this.$router.push('/hubadmin');
      } catch (error) {
        console.error('Erro ao cadastrar o funcionário:', error);
      }
    },
  },
  mounted() {
    this.carregarPessoas(); // Carrega a lista de pessoas quando o componente é montado
  },
};
</script>
