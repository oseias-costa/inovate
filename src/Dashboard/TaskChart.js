import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './TaskChart.css'

export const TaskChart = ({list, yearChart}) => {

    const monthCount = (mes) => list.filter(item => {
        return item.ano.toString().includes(yearChart) && item.mes.includes(mes)
    })  

    const data = [
        {
        month: 'Janeiro',
        Atividades: monthCount('Janeiro').length,
        },
        {
        month: 'Fevereiro',
        Atividades: monthCount('Fevereiro').length,
        },
        {
        month: 'Março',
        Atividades: monthCount('Março').length,
        },
        {
        month: 'Abril',
        Atividades: monthCount('Abril').length,
        },
        {
        month: 'Maio',
        Atividades: monthCount('Maio').length,
        },
        {
        month: 'Junho',
        Atividades: monthCount('Junho').length,
        },
        {
        month: 'Julho',
        Atividades: monthCount('Julho').length,
        },
        {
        month: 'Agosto',
        Atividades: monthCount('Agosto').length,
        },
        {
        month: 'Setembro',
        Atividades: monthCount('Setembro').length,
        },
        {
        month: 'Outubro',
        Atividades: monthCount('Outubro').length,
        },
        {
        month: 'Novembro',
        Atividades: monthCount('Novembro').length,
        },
        {
        month: 'Dezembro',
        Atividades: monthCount('Dezembro').length,
        }
    ]

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