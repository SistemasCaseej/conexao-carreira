## 🧩 Arquitetura Explicada

- **View (`app/`)** – Interfaces e componentes visuais.
- **API (`app/api/`)** – Rotas HTTP do backend.
- **Controllers (`app/api/route.js/`)** – Orquestram as chamadas aos services e retornam respostas.
- **Services (`/services`)** – Contêm a lógica de negócio da aplicação.
- **Repositories (`/repositories`)** – Lidam diretamente com a persistência de dados (Firebase).
- **Models (`/models`)** – Definições de tipos, interfaces e schemas.
- **Lib (`/lib`)** – Configurações e inicializações reutilizáveis (como Firebase).


## 📜 Scripts Disponíveis

- `dev`: Inicia o servidor de desenvolvimento usando Next.js e TurboPack.
- `build`: Compila o projeto para produção.
- `start`: Inicia a versão compilada do projeto.

---

Este boilerplate fornece uma base robusta para projetos Next.js com UI moderna, gerenciamento eficiente de estado, testes e otimizações de performance. Caso precise de mais informações sobre alguma biblioteca, consulte sua documentação oficial.


### Execute o servidor de desenvolvimento:

```bash
  npm run dev
```
Abra http://localhost:3000 no seu navegador para ver o resultado.

Você pode começar a editar a página modificando o arquivo app/page.js. A página será atualizada automaticamente à medida que você edita o arquivo.
