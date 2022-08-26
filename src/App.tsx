import React from 'react';
import { useForm } from 'react-hook-form';
import  axios  from 'axios';
import './App.css';

function App() {

  const {register, handleSubmit, setValue, setFocus} = useForm();

  const onSubmit = (e: any) => {
    console.log(e);
    fetch('http://localhost:8000/customers/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "name": "erison",
        "birth": "1996-03-06",
        "email": "erison.pimentao@gmail.com",
        "cep": "69038289",
        "DDD": "92",
        "cellphone": "994924319",
        "street": "Rua Vanderley",
        "adressNumber": "95",
        "neighborhood": "Lírio do Vale",
        "city": "Manaus",
        "uf": "AM"
      }
    )
});
  }

  const checkCEP = (e: any) => {
    const cep = e.target.value.replace(/\D/g, '');
    try {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`).then( (res): any => {
        setValue('DDD', res.data.ddd)
        setValue('street', res.data.logradouro);
        setValue('district', res.data.bairro);
        setValue('city', res.data.localidade);
        setValue('state', res.data.uf);
        setFocus('cellphone');
      });
    } catch (err) {
      console.log(err)
    }
  }

  const setFocusOnAdressNumber = () => {
    setFocus('adress_number')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
       <label>
        Nome:
        <input type="text" {...register("name")} />
      </label>
      <label>
        Nascimento:
        <input type="date" {...register("birth")} />
      </label>
      <label>
        Email:
        <input type="email" {...register("email")} />
      </label>
      <label>
        CEP:
        <input type="text" {...register("cep")} onBlur={checkCEP} />
      </label>
      <label>
        DDD:
        <input type="text" {...register("DDD")} />
      </label>
      <label>
        Celular:
        <input type="text" {...register("cellphone")} onBlur={setFocusOnAdressNumber} />
      </label>
      <label>
        Rua:
        <input type="text" {...register("street" )} />
      </label>
      <label>
        Número:
        <input type="text" {...register("adress_number" )} />
      </label>
      <label>
        Complemento:
        <input type="text" {...register("adress_complement" )} />
      </label>
      <label>
        Bairro:
        <input type="text" {...register("district" )} />
      </label>
      <label>
        Cidade:
        <input type="text" {...register("city" )} />
      </label>
      <label>
        Estado:
        <input type="text" {...register("state" )} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default App;
