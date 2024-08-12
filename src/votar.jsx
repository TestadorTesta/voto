
import axios from 'axios'


async function votar(identificador,nome) {
    
    try {
    const response = await axios.get(`http://35.199.79.58:3000/inserir/${identificador}/${nome}`) //(`/inserir/${identificador}/${nome}`)
    .then(response => {
        return response.data
      })
      .catch(e => {
        console.log(e)
      })
    } catch (err){
        console.log(err)
    }
}

export default votar