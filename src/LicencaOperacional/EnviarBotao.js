export const EnviarBotao = ({onClick, id, className}) => {
    return(
        <button onClick={onClick} value={id} className={className}>{id}</button>
    )
}