import style from './style.module.scss';

export default function Main() {
    return (
        <div className={style.wrapper}>
            <h1>TODO LIST</h1>
            <div className={style.header}>
                <input type="text" placeholder='enter note...'/>
                <input type="text" placeholder='enter description note...'/>
                <div><button>CREATE</button></div>
            </div>
        </div>
    )
}
