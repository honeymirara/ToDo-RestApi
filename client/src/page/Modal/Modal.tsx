import style from './style.module.scss';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { iTask } from '../../interfaces';


interface ModalProps {
    isOpen: boolean,
    onClose: () => void;
    children?: React.ReactNode;
    active: iTask;
   
}

export default function Modal({ isOpen, onClose, active, children }: ModalProps) {
    const [inp, setInp] = useState({ title: '', description: '' });

    
    useEffect(() => {
        setInp({ title: active.title, description: active.description });
    }, [active]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setInp({ ...inp, [event.target.name]: event.target.value });

    if (!isOpen) {
        return null;
    }

    return (
        <div className={style.modal}>
            <div className={style.modalWrapper}>
                <div className={style.modalContent}>
                    <div className={style.wrapper}>
                        <h1>UPDATE NOTE</h1>
                        <div className={style.inputs}>
                            <input
                                onChange={handleInputChange}
                                name='title'
                                type="text"
                                placeholder='input your note...'
                                value={inp.title} 
                            />
                            <input
                                onChange={handleInputChange}
                                name='description'
                                type="text"
                                placeholder='input your description note...'
                                value={inp.description} 
                            />
                        </div>

                        <div className={style.buttonTag}>
                            <div className={style.cancelButton} onClick={() => onClose()}>
                                CANCEL
                            </div>
                            <div
                                className={style.applyButton}
                                onClick={async () => {
                                    const result = await axios.put(`http://localhost:3000/task/${active._id}`, inp);
                                    console.log(result);
                                    location.reload();
                                }}
                            >
                                APPLY
                            </div>
                        </div>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}



