# TechPaws

Este repositório apresenta minha participação no projeto de TCC desenvolvido em grupo.

🔗 Repositório original: [https://github.com/Raf4Janni/TCC](https://github.com/Raf4Janni/TCC)

## Descrição

O TechPaws é um software gratuito desenvolvido para auxiliar abrigos de animais na gestão de suas operações. O projeto visa otimizar processos administrativos, permitindo que os abrigos foquem mais no cuidado dos animais. Ele facilita o acesso da comunidade a informações sobre animais disponíveis para adoção e atividades do abrigo. As principais funcionalidades incluem o registro de animais, acompanhamento médico-veterinário e gestão de voluntários, promovendo assim o bem-estar animal e fortalecendo o trabalho das organizações.

## Integrantes do Grupo

- **Livia Emidio** - Project Owner
- **João Vitor Vasconcelos Jacob** - Líder Técnico
- **Matheus Naoki Nebo** - Líder UX/UI
- **Rafael Said Jannini** - Desenvolvedor
- **Davi Francisco de Faria** - Desenvolvedor
- **Pedro Nunes Bighetti** - Desenvolvedor
- **Vitor Hugo Silva Guilhoto** - Desenvolvedor

## Instalação

### Antes de começar

1. **Lembre-se**: Todas as dependências do projeto devem ser instaladas no mesmo disco que o projeto está. Instalar as dependências em outro disco pode resultar em falhas durante a execução do software.

2. **Fazer o download do backup do projeto no GitHub**:
   - [https://github.com/Raf4Janni/TCC](https://github.com/Raf4Janni/TCC)

3. **Instalar o editor de código Visual Studio Code**:
   - Disponível no link: [https://code.visualstudio.com/Download](https://code.visualstudio.com/Download)

4. **Instalar o interpretador de JavaScript Node.js**:
   - Disponível no link: [https://nodejs.org/pt](https://nodejs.org/pt)

5. **Instalar o banco de dados PostgreSQL**:
   - Disponível no link: [https://www.pgadmin.org/download/pgadmin-4-windows/](https://www.pgadmin.org/download/pgadmin-4-windows/)

6. **Instalar as dependências do `package.json`**:
   - No prompt de comandos do Visual Studio Code, dentro do diretório onde está localizado o projeto, execute:

   ```bash
   npm install

7. **Criar o arquivo .env na pasta API e copiar o seguinte código**:

    ```bash
    TZ=UTC
    PORT=3333
    HOST=localhost
    LOG_LEVEL=info
    APP_KEY=U1YG521iMqmKmFzTno29H6plVlRLjBJf
    NODE_ENV=development
    DB_HOST=pgsql.projetoscti.com.br
    DB_PORT=5432
    DB_USER=projetoscti20
    DB_PASSWORD=eq33A321
    DB_DATABASE=projetoscti20

8.**Criar as tabelas no seu local de hospedagem do banco de dados.**

9.**Executar em dois terminais distintos do VS Code os seguintes comandos para rodar o software com êxito**:

    cd api
    node ace serve

    cd front
    npm run dev

## Licença

Licença de uso - 2024 - TechPaws

## Contato

Para perguntas ou feedback, entre em contato:

**Email**: tech.paws.cti@gmail.com
