export const EnviarBotao = ({onClick, id}) => {
    return(
        <button onClick={onClick} value={id} className='btn-grey'>{id}</button>
    )
}