import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export const TaskChart = ({list, yearChart}) => {


    const Janeiro = list.filter(item => {
        return item.ano.toString().includes(yearChart) && item.mes.includes('Janeiro')
       })
    const Fevereiro = list.filter(item => {
        return item.ano.toString().includes(yearChart) && item.mes.includes('Fevereiro')
       })
    const Março = list.filter(item => {
        return item.ano.toString().includes(yearChart) && item.mes.includes('Março')
       })
    const Abril = list.filter(item => {
        return item.ano.toString().includes(yearChart) && item.mes.includes('Abril')
       })
    const Maio = list.filter(item => {
        return item.ano.toString().includes(yearChart) && item.mes.includes('Maio')
       })
    const Junho = list.filter(item => {
        return item.ano.toString().includes(yearChart) && item.mes.includes('Junho')
       })
    const Julho = list.filter(item => {
        return item.ano.toString().includes(yearChart) && item.mes.includes('Julho')
       })
    const Agosto = list.filter(item => {
        return item.ano.toString().includes(yearChart) && item.mes.includes('Agosto')
       })
    const Setembro = list.filter(item => {
        return item.ano.toString().includes(yearChart) && item.mes.includes('Setembro')
       })
    const Outubro = list.filter(item => {
        return item.ano.toString().includes(yearChart) && item.mes.includes('Outubro')
       })
    const Novembro = list.filter(item => {
        return item.ano.toString().includes(yearChart) && item.mes.includes('Novembro')
       })
    const Dezembro = list.filter(item => {
        return item.ano.toString().includes(yearChart) && item.mes.includes('Dezembro')
       })

    const data = [
        {
        month: 'Janeiro',
        tasks: Janeiro.length,
        },
        {
        month: 'Fevereiro',
        tasks: Fevereiro.length,
        },
        {
        month: 'Março',
        tasks: Março.length,
        },
        {
        month: 'Abril',
        tasks: Abril.length,
        },
        {
        month: 'Maio',
        tasks: Maio.length,
        },
        {
        month: 'Junho',
        tasks: Junho.length,
        },
        {
        month: 'Julho',
        tasks: Julho.length,
        },
        {
        month: 'Agosto',
        tasks: Agosto.length,
        },
        {
        month: 'Setembro',
        tasks: Setembro.length,
        },
        {
        month: 'Outubro',
        tasks: Outubro.length,
        },
        {
        month: 'Novembro',
        tasks: Novembro.length,
        },
        {
        month: 'Dezembro',
        tasks: Dezembro.length,
        }
    ]

    

       console.log(Janeiro)

    return(
        <div className='TaskChart'>
            <div className='TaskChart-container'>
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="tasks" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
      </div>
      </div>
    )
}