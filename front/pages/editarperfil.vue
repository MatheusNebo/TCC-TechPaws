<template>
    <div>
        <header>
            <h2>Editar Dados do Perfil</h2>
        </header>
        <form class="formcadastro" v-if="pessoa" @submit.prevent="editarDados">

            <label for="nomeInput">Nome</label>
            <input type="text"
                id="nomeInput"
                v-model="pessoa.nome"
                placeholder="Digite seu nome"
                required>

            <label for="dataNascimentoInput">Data de Nascimento</label>
            <input type="date"
                id="dataNascimentoInput"
                v-model="pessoa.dataNascimento"
                placeholder="Digite sua data de nascimento"
                required>

            <label for="emailInput">E-mail</label>
            <input type="email"
                id="emailInput"
                v-model="pessoa.email"
                placeholder="Digite seu e-mail"
                required>

            <label for="senhaInput">Senha</label>
            <input type="password"
                id="senhaInput"
                v-model="pessoa.senha"
                placeholder="Digite sua senha"
                required>

            <label for="cpfInput">CPF</label>
            <input type="text"
                id="cpfInput"
                v-model="pessoa.cpf"
                placeholder="Digite seu CPF"
                required>

                    <div class="button-container">
                        <button type="submit" class="button-enviar">Salvar</button>
                    </div>
            </form>
            <p v-else>Carregando informações do perfil...</p>
</div>
</template>

<script>
import { teste } from '../../src/Api2';
import { get } from '../../src/Api2';
import session from '~/mixin/session';

export default {
    data() {
        return {
            pessoa: null,
        };
    },
    mixins: [session],
    methods: {
        async carregarDados() {
            try {
                const id = this.get_session('id');

                const result = await get(`pessoas/${id}`)
                this.pessoa = result

                const date = new Date(this.pessoa.dataNascimento)
                this.pessoa.dataNascimento = date.toISOString().split('T')[0]

            } catch (error) {
                console.error('Erro ao carregar os dados:', error)
            }
        },
        async editarDados() {
            try {

                await teste("PUT","pessoas/atualizar", this.pessoa, '')
                this.$router.push(`/perfil`)

            } catch (error) {
                console.error('Erro a editar os dados:', error)
            }
        },
    },
    mounted() {
        this.carregarDados();
    },
}
</script>
