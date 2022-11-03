
export const ButtonStatus = ({atividade, onClick, text}) => {
    return(
        <button className={ atividade === text ? 'Filter__Active' : 'Filter__Disable'} onClick={onClick}>
            {text}
        </button>
    )
}