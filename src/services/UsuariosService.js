export const getUsuarios = async (nome = 'sem nome', login = 'sem login', tamanho = 0, pagina = 1) => {   
    try{
    const reponse = await fetch(`https://localhost:7171/api/Usuario?nome=${nome}&login=${login}&tamanho=${tamanho}&pagina=${pagina}`, { 
                        method: 'GET', 
                        headers: new Headers({
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc19hZG1pbiI6IlRydWUiLCJuYmYiOjE2NTk3MTc4NDEsImV4cCI6MTY1OTcyNTA0MSwiaWF0IjoxNjU5NzE3ODQxfQ.Gcsec8YSdg8_xQeJ0apMlCVtV3MJCMirCJ4AsdSZzoo', 
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