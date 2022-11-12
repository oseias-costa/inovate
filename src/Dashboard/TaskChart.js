import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './TaskChart.css'

export const TaskChart = ({list, yearChart}) => {

    const monthCount = (mes) => list.filter(item => {
        return item.ano.toString().includes(yearChart) && item.mes.includes(mes)
    })  

    const monthsOfYear = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    const data = monthsOfYear.map(item => {
      return {
        month : item,
        Atividades: monthCount(item).length
      }
    })
 
    return(
        <div className='TaskChart'>
            <div className='TaskChart-container'>
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="Atividades" stroke="#1e5fb4" fill="rgb(30,95,180)" />
        </AreaChart>
      </ResponsiveContainer>
      </div>
      </div>
    )
}