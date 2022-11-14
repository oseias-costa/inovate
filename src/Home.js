import { useState, useEffect, useContext } from "react";
import { Head } from "./Components/Head";
import { AuthContext } from "./context/UserAuthContext";
import { onValue, ref } from "firebase/database";
import { db } from "./firebase";
import { Numbers } from "./Dashboard/Numbers";
import './Home.css'
import { TaskChart } from "./Dashboard/TaskChart";
import { CalendarTasks } from "./Dashboard/CalendarTasks";
import { Spinner } from "./Components/Spinner";

export const Home = () => {
  const { currentUser, userLogged } = useContext(AuthContext);
  const [ user, setUser] = useState({})
  const [ list, setList ] = useState([])
  const [ yearChart, setYearChart ] = useState(2022)
  const [ showLoading, setShowLoading ] = useState(false)

  const convertYearChartOnString = yearChart.toString()
  const yearChartList = (item) => item.ano.toString().includes(convertYearChartOnString)

  const total = list.filter(item => yearChartList(item)).length 
  const pendentes = list.filter(item => yearChartList(item) &&  item.realizado.includes('Pendente')).length
  const parcial = list.filter(item => yearChartList(item) && item.realizado.includes('Parcial')).length
  const lo = list.filter(item => yearChartList(item) && item.realizado.includes('LO')).length
  console.log('conta ano',  )
  console.log('string', )
  let newYear = []
      const resultado = newYear.map( item => {
      list.map((itens) => itens.ano) == item || console.log(true)
      })

  list.sort((a, b) => a.ano - b.ano)
  
  const yearTasks = list.filter(i => {
    return i.ano == 2022 
   })
  
  const contemYear = list.map(itens => {
      newYear.some(numero => numero === itens.ano) || newYear.push(itens.ano)    
    })

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
    
      <TaskChart list={list} yearChart={yearChart} />
      <CalendarTasks list={list} yearChart={yearChart} />
      { newYear.map( item => {
          return(
            <button 
              key={item} 
              onClick={e => setYearChart(item)}
              className={ yearChart === item 
              ? 'YearChart__Button-active' 
              : 'YearChart__Button-disable'}>
              {item}
            </button>
          )
        })
      }
      { showLoading && <Spinner /> }
    </div>
  );
};