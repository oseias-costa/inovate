import { useState, useEffect, useContext } from "react";
import { Head } from "./Components/Head";
import { useNavigate } from "react-router";
import { AuthContext } from "./context/UserAuthContext";
import { onValue, ref } from "firebase/database";
import { db } from "./firebase";
import { Numbers } from "./Dashboard/Numbers";
import './Home.css'

export const Home = () => {
  const { currentUser, userLogged } = useContext(AuthContext);
  const [ user, setUser] = useState({})
  const [ list, setList ] = useState([])

  const total = list.length
  const pendentes = list.filter(item => item.realizado.includes('Pendente')).length
  const parcial = list.filter(item => item.realizado.includes('Parcial')).length
  const lo = list.filter(item => item.realizado.includes('LO')).length

  const somaMonthTask = list.filter(item => console.log('esse item', item.ano.toString().includes('2022')))

  useEffect(() => {
    onValue(ref(db, "atividades"), (snapshot) => {
      setList([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((lista) => {
          setList((oldArray) => [...oldArray, lista]);
        });
      }
    });
  }, [userLogged]);

 

  console.log('list dash: ', list )
  console.log('sumMonth: ', somaMonthTask )

  useEffect(() => {
    if(userLogged[0] !== undefined){
    setUser(
      {
        image : <img src={userLogged[0].image} />,
        nome: userLogged[0].nome,
        email: userLogged[0].email
      }
    )
  }
  }, [userLogged])

  return (
    <div>
      <Head title="Home" />
      <span className="Numbers__span">Dashboard</span>
      <h1>Bem vindo {user.nome}!</h1>
      <div className="Home">
        <Numbers text='Atividades' number={total} />
        <Numbers text='Pendentes' number={pendentes} />
        <Numbers text='Parcial' number={parcial} />
        <Numbers text='LO' number={lo} />
      </div>
    </div>
  );
};
