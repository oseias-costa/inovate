

export const RecebeDadosInput = ({id, value}) => {
    return(
        <input 
        type='text'
        value={value}
        defaultValue={id}
        disabled={+true}
        />
    )
}