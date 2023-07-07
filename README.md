## instalando eslint e prettoer

npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-react eslint-plugin-simple-import-sort pre-commit prettier

npm install --save-dev pre-commit

Configuração para configurar quando salvar o arquivo:

{
"editor.codeActionsOnSave": {
"source.fixAll.eslint": true
},
"eslint.validate": [
"javascript"
]
}

Proxima Aula:https://www.youtube.com/watch?v=QISzxPDn5l4&list=PLedVhPP7RyiKOiiGMTMYil3yTEoOxO7CK&index=4
