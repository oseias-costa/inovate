import './Numbers.css'

export const Numbers = ({text, number}) => {
    return(
        <div className="Numbers">
          <span className="Numbers__span">{text}</span>
          <p className="Numbers__value">{number}</p>
        </div>
    )
}