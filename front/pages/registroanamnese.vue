<template>
    <div class="fade-in">
        <header>
            <h1>Registro Ficha de Anamnese</h1>
        </header>
        <section class="sectionficha" v-if="pessoa">
            <div class="filtro">
                <label for="animal">Animal a registrar</label>
                <select id="animal" v-model="animalSelecionado" required @change="preencherDadosAnimais">
                    <option v-for="animal in animais" :key="animal.id" :value="animal.id">
                        {{ animal.nome }}
                    </option>
                </select>
            </div>

            <div class="div2">
                <div class="divficha">
                    <h2>Informações Animais</h2>
                    <ul>
                        <li>
                            <p>Nome: {{ animal.nome }}</p>
                            <p>Raça: {{ animal.raca }}</p>
                            <p>Espécie: {{ animal.especie }}</p>
                        </li>
                    </ul>
                </div>
                <div class="divficha">
                    <h2>Informações Animais</h2>
                    <ul>
                        <li>
                            <p>Sexo: {{ animal.sexo }}</p>
                            <p>Local do Resgate: {{ animal.localResgate }}</p>
                            <p>Data de Resgate: {{ animal.dataResgate }}</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="divficha">
                <div class="registro">
                    <form @submit.prevent="salvarDados">
                        <div class="input-group">
                            <div>
                                <label for="autor">Autor</label>
                                <input type="text" name="autor" id="autor" readonly v-model="pessoa.nome">
                            </div>

                            <div>
                                <label for="tipo">Tipo de registro</label>
                                <input type="text" name="tipo" id="tipo" v-model="registro.tipoRegistro">
                            </div>
                        </div>

                        <label for="estadoSaude">Estado de saúde</label>
                        <textarea id="registroSaude" placeholder="Digite o estado de saúde" required v-model="registro.registroSaude"></textarea>

                        <button type="submit" class="button-enviar">Cadastrar</button>
                    </form>
                </div>
            </div>
        </section>
        <p v-else>Carregando informações do perfil...</p>
    </div>
</template>

<style scoped>
.input-group {
    display: flex;
    gap: 20px;
}

textarea {
    width: 100%;
    height: 100px;
    resize: vertical;
}
</style>

<script>
import { get,teste } from '../../src/Api2';
import session from '~/mixin/session';

export default {
    data() {
        return {
            pessoa: null,
            isCliente: null,
            animais: [],
            animalSelecionado: null,
            animal: {
                nome: '',
                raca: '',
                especie: '',
                sexo: '',
                localResgate: '',
                dataResgate: '',
            },
            registro: {
                tipoRegistro: '',
                registroSaude: ''
            },
        };
    },
    mixins: [session],
    methods: {
        async carregarDados() {
            try {
                const id = this.get_session('id');
                const pessoaResult = await get(`pessoas/${id}`);
                this.pessoa = pessoaResult;

                this.isCliente = this.get_session('cargo') === 'cliente' ? false : true;

                const animaisResult = await get('animais');
                this.animais = animaisResult;
            } catch (error) {
                console.error('Erro ao carregar os dados:', error);
            }
        },
        preencherDadosAnimais() {
            const animalBuscado = this.animais.find(p => p.id === this.animalSelecionado);
            if (animalBuscado) {
                this.animal.nome = animalBuscado.nome;
                this.animal.raca = animalBuscado.raca;
                this.animal.especie = animalBuscado.especie;
                this.animal.sexo = animalBuscado.sexo;
                this.animal.localResgate = animalBuscado.localResgate;
                this.animal.dataResgate = new Date(animalBuscado.dataResgate)
              .toISOString()
              .split('T')[0];
                
            }
        },
        async salvarDados() {
            const funcionario = await get(`funcionarios/BuscaFuncionarioPelaPessoa/${this.get_session('id')}`);
            console.log(funcionario)
            
            const dadosRegistro = {
                autor: this.pessoa.nome,
                informacoes: this.registro.registroSaude,
                tipo_registro: this.registro.tipoRegistro,
                data_registro: new Date().toLocaleDateString('pt-BR'),
                funcionario_id: funcionario.id,
                animal_id: this.animalSelecionado,
                criado_em: new Date().toISOString(),
            };
            
            try {
                await teste('POST','funcionarios/AdicionaRegistro', dadosRegistro, '');

                alert('Dados registrados com sucesso!');
                this.$router.push('/hubadmin');
            } catch (error) {
                console.error('Erro ao salvar os dados:', error);
            }
        },
        formatarData(dataString) {
            const partes = dataString.split('-');
            return `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
    },
    mounted() {
        this.carregarDados();
    }
};
</script>
