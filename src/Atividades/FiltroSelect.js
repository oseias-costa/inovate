
export const FiltroSelect = ({id, data, value, onChange}) => {

return(
    <select value={value} onChange={onChange}>
        <option 
            value=''
            >{id}
            </option>
            {data.map(item => (
                <option key={item}>{item}</option>
            ))}
 
    </select>)
}