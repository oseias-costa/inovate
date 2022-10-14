export const EnviarBotao = ({onClick, id}) => {
    return(
        <button onClick={onClick} value={id}>{id}</button>
    )
}