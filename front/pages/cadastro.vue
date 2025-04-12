<template>
  <div class="fade-in">
    <header>
      <h2>CADASTRO</h2>
    </header>
    <div class="formcadastro">
      <form @submit.prevent="carregarDados">
        
        <label for="nome">Nome</label>
        <input type="text" id="nome" placeholder="Digite seu nome" required>

        <label for="dataNascimento">Data de nascimento</label>
        <input type="date" id="dataNascimento" required>

        <label for="cpf">CPF</label>
        <input type="text" id="cpf" placeholder="Digite seu CPF" required>

        <label for="email">E-mail</label>
        <input type="email" id="email" placeholder="Digite seu e-mail" required>

        <label for="senha">Senha</label>
        <input type="password" id="senha" placeholder="Digite sua senha" required>

        <label for="rg">RG</label>
        <input type="text" id="rg" placeholder="Digite seu RG" required>

        <fieldset>
          <legend>Sexo</legend>
          <label>
            <input type="radio" name="sexo" value="M" required> Masculino
          </label><br>
          <label>
            <input type="radio" name="sexo" value="F"> Feminino
          </label><br>
        </fieldset><br>

        <div class="button-container">
          <button type="submit" class="button-enviar">Cadastrar</button>
        </div>
      </form>
      <p class="paragrafo">Já possui uma conta?</p>
      <p class="cadastrar">
        <nuxt-link to="/login" class="linkheader">Faça seu Login</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import { teste } from '../src/Api2';
import session from '../mixin/session.js'

export default {
  name: "cadastropage",
  mixins: [session],
  methods: {
    carregarDados: async function () {
      try {
        const nome = document.getElementById('nome').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const cpf = document.getElementById('cpf').value;
        const rg = document.getElementById('rg').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const sexo = document.querySelector('input[name="sexo"]:checked')?.value;

        const data = {
          nome,
          dataNascimento,
          cpf,
          rg,
          email,
          sexo,
          senha
        };

        await teste('POST', 'pessoas/func', data, '');
        console.log("Dados enviados com sucesso:", data);
        
        this.$router.push('/login'); // Redireciona para a página de login após o cadastro
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    }
  }
};
</script>
