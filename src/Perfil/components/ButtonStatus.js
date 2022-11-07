
export const ButtonStatus = ({atividade, onClick, text}) => {
    return(
        <a className={ atividade === text ? 'Filter__Active' : 'Filter__Disable'} onClick={onClick}>
            {text}
        </a>
    )
}