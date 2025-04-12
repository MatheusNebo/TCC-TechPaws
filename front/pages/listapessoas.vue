<template>
    <div class="fade-in" v-if="!isCliente">
    <section>
        <div class="filtro">
          <label>Filtro de Pesquisa</label>
          <select v-model="selectedPessoa" @change="carregarPessoa">
            <option value=""></option>
            <option v-for="pessoa in pessoas" :key="pessoa.id" :value="pessoa.id">{{ pessoa.nome }}</option>
          </select>
          <button @click="carregarDados">Mostrar Todos</button>
        </div>
        <div v-if="pessoaFiltrada" class="div2">
            <div>
                    <ul>
                        <li>
                <h2>Nome: {{ pessoaFiltrada.nome }}</h2>
                <p>Data de nascimento: {{ pessoaFiltrada.dataNascimento }}</p>
                <p>Cargo: {{ pessoaFiltrada.cargo }}</p>
                <p>Email: {{ pessoaFiltrada.email }}</p>
                <p>Sexo: {{ pessoaFiltrada.sexo }}</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <img src="/components/assets/img/TechPaws.png" class="imgsection"alt="Foto do Usuário">
                </div>
        </div>
        
        <div v-else v-for="pessoa in pessoas" :key="pessoa.id" class="div2">
                <div>
                    <ul>
                        <li>
                <h2>Nome: {{ pessoa.nome }}</h2>
                <p>Data de nascimento: {{ pessoa.dataNascimento }}</p>
                <p>Cargo: {{ pessoa.cargo }}</p>
                <p>Email: {{ pessoa.email }}</p>
                <p>Sexo: {{ pessoa.sexo }}</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <img src="/components/assets/img/TechPaws.png" class="imgsection"alt="Foto do Usuário">
                </div>
            </div>
        </section>
    </div>
    <p v-else>Não tem acesso</p>
</template>

<script>
import { get } from '../src/Api2';
import session from '~/mixin/session';

export default {
    data() {
        return {
            pessoas: [],
            pessoaFiltrada: null,
        };
    },
    mixins: [session],
    methods: {
        async carregarDados() {
            try {
                this.pessoaFiltrada = null;
                const result = await get('pessoas/todasPessoas')
                this.pessoas = result
                this.isCliente = this.get_session("cargo") === "cliente";
            } catch (error) {
                console.error('Erro ao carregar os dados:', error)
            }
        },
        async carregarPessoa(){
            try {
                if (!this.selectedPessoa) return;
                const result = await get(`pessoas/${this.selectedPessoa}`);
                this.pessoaFiltrada = result; 
            } catch (error) {
                console.error('Erro ao carregar a pessoa:', error);
            }
        },
    },
    mounted() {
        this.carregarDados();
    },
} 
</script>

