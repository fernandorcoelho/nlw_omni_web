import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg'

import api from '../../components/services/api';

import './styles.css';

function Profile() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [avatar, setAvatar] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    }

    // setScheduleItemValue (0, 'week_day', '2')

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem;
        })

        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            email,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');

            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro!');
        })
    }

    return (
        <div id="page-teacher-profile" className="container">
            <PageHeader>
                
            </PageHeader>

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <div className="name-block">
                            <Input
                                name="name"
                                className="name-input"
                                label="Nome"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                            />
                            <Input
                                name="surname"
                                label="Sobrenome"
                                value={surname}
                                onChange={(e) => { setSurname(e.target.value) }}
                            />
                        </div>

                        <div className="contact-block">
                            <Input
                                name="email"
                                // style={{'width': '38.4rem'}}
                                className="email-input"
                                label="E-mail"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            <Input
                                name="whatsapp"
                                className="whatsapp-input"
                                label="WhatsApp"
                                value={whatsapp}
                                onChange={(e) => { setWhatsapp(e.target.value) }}
                            />
                        </div>

                        <div className="bio-textarea">
                            <p>(Máximo de 300 caracteres)</p>
                            <Textarea
                                name="bio"
                                maxlength="300"
                                label="Biografia"
                                value={bio}
                                onChange={(e) => { setBio(e.target.value) }}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'História', label: 'História' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'Filosofia', label: 'Filosofia' },
                                { value: 'Inglês', label: 'Inglês' },
                                { value: 'Química', label: 'Química' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Informática', label: 'Informática' },
                            ]}
                        />
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                        </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => { setScheduleItemValue(index, 'week_day', e.target.value) }}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' },
                                        ]}
                                    />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => { setScheduleItemValue(index, 'from', e.target.value) }}
                                    />

                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => { setScheduleItemValue(index, 'to', e.target.value) }}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">
                            Salvar
                    </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default Profile;