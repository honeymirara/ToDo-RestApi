import style from './style.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { iTask } from '../../interfaces';
import Icons from './Icons/Icons'
import Modal from '../Modal/Modal';

export default function Main() {
    const [task, setTask] = useState({ title: '', description: '' });
    const [array, setArray] = useState<iTask[]>([]);
    const [modalInfoIsOpen, setModalInfoOpen] = useState(false)

    const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, [event.target.name]: event.target.value });
    }

    async function makeTask() {
        try {
            if (!task.title.trim() || !task.description.trim()) {
                throw new Error("Title and description can't be empty");
            }
            const response = await axios.post(`http://localhost:3000/task`, task);
            console.log(response);
            setTask({ title: '', description: '' });
            getAllTasks();
        } catch (error: any) {
            console.error('Error creating task:', error.message);
        }
    }

    async function getAllTasks() {
        try {
            const response = await axios.get(`http://localhost:3000/task`);
            console.log(response.data);
            const listTaskCheck = response.data.map((el: iTask) => {
                return { ...el, isCheck: false };
            });
            setArray(listTaskCheck);
            console.log(listTaskCheck)
        } catch (error: any) {
            console.error('Error fetching tasks:', error.message);
        }
    }

    useEffect(() => {
        getAllTasks();
    }, []);

    const deleteTask = async (task_id: string) => {
        try {
            await axios.delete(`http://localhost:3000/task/${task_id}`);
            getAllTasks();
        } catch (error: any) {
            console.error('Error fetching tasks:', error.message);
        }
    };

    return (
        <div className={style.wrapper}>
            <h1>TODO LIST</h1>
            <div className={style.header}>
                <input type="text" name='title' value={task.title} onChange={changeInput} placeholder='enter note...' />
                <input type="text" name='description' value={task.description} onChange={changeInput} placeholder='enter description note...' />
                <button onClick={makeTask}>CREATE</button>
            </div>

            {array.length === 0 ? (
                <div className={style.emptyImage}>

                </div>
            ) : (
                array.map((el: iTask) =>
                    <div className={style.tasks} key={el._id}>
                        <label className={style.checkSpec}><input type="checkbox" className={style.realCheckbox}></input>
                            <span className={style.customCheckbox}></span>
                            <div className={style.note}>{el.title}</div>
                            <div className={style.description}>{el.description}</div></label>
                        <div>
                            <div onClick={() => setModalInfoOpen(true)} className={style.edit}>
                                <Icons id='pen' />
                            </div>
                            <Modal isOpen={modalInfoIsOpen} onClose={() => setModalInfoOpen(false)} />
                        </div>
                        <div className={style.delete} onClick={() => deleteTask(el._id)}>
                            <Icons id='trash' />
                        </div>
                        <div className={style.line}></div>
                    </div>
                ))}
        </div>
    )
}
