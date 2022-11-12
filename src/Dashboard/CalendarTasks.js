import { ResponsiveCalendar } from "@nivo/calendar"
import './CalendarTasks.css'

export const CalendarTasks = ({list, yearChart}) => {
    
    const countTaskDay = (day) => {
        return list.filter(item => item.prazo.includes(day)).length
    }
        let countTaskPerDay = []
        
        const listTaskDay = list.map(item => {
            countTaskPerDay.map(itens => itens.prazo) == item || countTaskPerDay.push({['day']:item.prazo, ['value']: countTaskDay(item.prazo)})
        })
       
        const yearCurrent = new Intl.DateTimeFormat('en-US').format(new Date(yearChart + 'T10:00:00-03:00'))
        const lastDay = `12/31/${yearCurrent.slice(-4)}`
        
    return(
        <div className="CalendarTasks">
            <div className="CalendarTasks-container">
        <ResponsiveCalendar
        data={countTaskPerDay}
        from={new Intl.DateTimeFormat('en-US').format(new Date(yearChart + 'T10:00:00-03:00'))}
        to={lastDay}
        emptyColor="#eeeeee"
        colors={[ '#d3d1c4', '#BFBFBF', '#2573d994', '#1e5fb4' ]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
    />
    </div>
    </div>
    )
}