export const getUsuarios = async (nome = 'sem nome', login = 'sem login', tamanho = 0, pagina = 1) => {   
    try{
    const reponse = await fetch(`https://localhost:7171/api/Usuario?nome=${nome}&login=${login}&tamanho=${tamanho}&pagina=${pagina}`, { 
                        method: 'GET', 
                        headers: new Headers({
                        'Authorization': `bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                        }), 
                    }).then(response => {
                        response.json()
                            .then(data => {
                                //console.log(data[0].valor)
                                console.log(data)
                            })
                    });
    return reponse;

    }catch(err){
        console.log(err);
    }
}