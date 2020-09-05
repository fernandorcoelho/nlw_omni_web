import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import Cleave from 'cleave.js/react';
import "cleave.js/dist/addons/cleave-phone.br";

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg'

import api from '../../components/services/api';

import './styles.css';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TeacherForm() {
    const history = useHistory();

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

    const headerIconRocket = <FontAwesomeIcon
        className="headerIcon"
        icon={faRocket}
        color="#FFCC4D"
        size="4x"
    />;



    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                headerTitle="Dar aulas"
                title="Que incrível que você quer dar aulas."
                subtitle="O primeiro passo é preencher esse formulário de inscrição."
                icon={headerIconRocket}
                description="Prepare-se! Vai ser o máximo."
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <div className="teacher-id">
                            <div className="teacher-info">
                                <img src="https://avatars2.githubusercontent.com/u/63662083?s=460&u=13c4f318194a9c353656bb2967fca1dedd2ebd01&v=4" alt="Foto de Perfil" />
                                <strong>Fernando Coelho</strong>
                            </div>
                            <p id="whatsapp-label">WhatsApp</p>
                            <Input
                                name="whatsapp"
                                hidden
                                label="WhatsApp"
                                placeholder="( )  _  _ _ _ _ _ _ _ _"
                                value={whatsapp}
                                onChange={(e) => { setWhatsapp(e.target.value) }}
                            />
                            <Cleave
                                name="whatsapp"
                                className="cleave-phone-input"
                                value={whatsapp}
                                options={{ phone: true, phoneRegionCode: 'BR' }}
                                placeholder="( )  _  _ _ _ _ _ _ _ _ _"
                                onChange={(e) => { setWhatsapp(e.target.value) }}
                            />
                        </div>

                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <div className="about-classes">
                            <div className="classes-select">
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
                            </div>

                            <div className="classes-input">
                                <Input
                                    name="cost"
                                    label="Custo da sua hora por aula"
                                    placeholder="R$"
                                    value={cost}
                                    onChange={(e) => { setCost(e.target.value) }}
                                />
                            </div>
                        </div>

                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                                + Novo
                        </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <div className="schedule-item-box">
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
                                        <div className="schedule-time">
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
                                    </div>

                                    <span className="delete-schedule-button">
                                        <button type="button">
                                            Excluir Horário
                                        </button>
                                    </span>
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <button type="submit">
                            Salvar cadastro
                        </button>

                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                            <p className="footer-warn">
                                Importante! <br />
                                <p className="footer-warn-message">
                                    Preencha todos os dados
                                </p>

                            </p>
                        </p>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;