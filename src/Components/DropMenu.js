import style from './DropMenu.module.css'

export const DropMenu = () => {
    return(
        <div className={style.drop}>
            <button className={style.btn}>Drop</button>
            <div className={style.dropMenu}>
                <a href="#">Link</a>
                <a href="#">Link</a>
                <a href="#">Link</a>
            </div>
        </div>
    )
}