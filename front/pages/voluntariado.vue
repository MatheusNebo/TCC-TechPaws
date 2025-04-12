<template>
  <div class="fade-in">
    <header>
    <h1> Seja Um Voluntário</h1>
    </header>
    <section>
    <div class="div2">
        <ul>
          <h2>O que é o Voluntariado</h2>
           
            Já pensou em transformar a vida de um animalzinho? Ao se tornar voluntário,
            você ajudará a cuidar e tratar de animais necessitados, oferecendo a eles uma chance de uma vida melhor. 
            Além de contribuir diretamente para o bem-estar dos pets, você ganhará experiências valiosas e fará novas amizades. 
            Sua ajuda é essencial para a nossa causa e pode fazer uma grande diferença. Junte-se a nós e ajude a criar um mundo 
            mais gentil para nossos amigos de quatro patas!    
        </ul>
            <form action="" class="infoperfil" @submit.prevent="carregarDados">
                <ul>
                  <h2>Formulário</h2>
                <li>
                  <label for="">Nome</label>
                <input type="text" name="" id="nome" placeholder="Digite seu nome"  disabled required>

                <label for="">Data de nascimento</label>
                <input type="date" name="" id="dataNascimento" placeholder="Digite sua data de nascimento" disabled required>

                <label for="">CPF</label>
                <input type="text" name="" id="cpf" placeholder="Digite seu CPF" disabled required>

                <label for="">E-mail</label>
                <input type="email" name="" id="email" placeholder="Digite seu e-mail" disabled required>

                <label for="">RG</label>
                <input type="text" name="" id="" placeholder="Digite seu RG"
                required>

                <fieldset>
            <legend>Sexo</legend>
            <label>
                <input type="radio" name="sexo" value="M" > Masculino
            </label><br>
            <label>
                <input type="radio" name="sexo" value="F"> Feminino
            </label><br>
                </fieldset><br>
                    <div class="button-container">
                    <button type="submit" class="btnlink">Cadastrar</button>
                    </div>
                </li>
                
            </ul>

                

            </form>       
          </div>
      </section>
    </div>
</template>
<script>
  import { teste } from '../src/Api2';
  
  export default {
    name: "cadastropage",
    methods: {
      carregarDados: async function () {
        try {
          const nome = document.getElementById('nome').value;
          const dataNascimento = document.getElementById('dataNascimento').value;
          const cpf = document.getElementById('cpf').value;
          const rg = document.getElementById('rg').value;
          const email = document.getElementById('email').value;
          const senha = document.getElementById('senha').value;
          const sexo = document.getElementById('sexo').value; 
  
          const data = {
            nome: nome,
            dataNascimento: dataNascimento,
            cpf: cpf,
            rg: rg,
            email: email,
            sexo: sexo,
            senha: senha
          };
  
          await teste('teste', 'pessoas/func', data, '1312');
          console.log("Dados enviados com sucesso:", data);
        } catch (error) {
          console.error('Erro ao carregar os dados:', error);
        }
      }
    }
  };
  </script>
  