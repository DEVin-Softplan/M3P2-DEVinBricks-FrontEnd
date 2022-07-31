export const getAllProducts = async () =>{
  try{
    const data = await fetch('URL DA REQUISICAO',{
      "method": "GET",
    });
    
    if(data){
      const listaProdutos = await data.json();
      return listaProdutos;
    }
  }catch(error){
    console.log(error)
  }
};