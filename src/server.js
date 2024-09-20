const express = require ('express');
const app = express();
const PORT = 3333;
app.listen(PORT, ()=>{
    console.log(`Rodando na porta ${PORT}`);
});

app.get('/message/:id',(request, response)=>{
    response.send(`Request na ${request.params.id}`);
})
