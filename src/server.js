const express = require ('express');
const app = express();
const PORT = 3333;
app.listen(PORT, ()=>{
    console.log(`Rodando na porta ${PORT}`);
});

app.use(express.json())

app.post('/users',(request, response)=>{
    const { name, email, password } = request.body;
    response.json(`Chamou o Post. Request na ${ name, email, password }`);
})
