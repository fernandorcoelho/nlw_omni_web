import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaughBeam } from '@fortawesome/free-solid-svg-icons';

import api from '../../components/services/api';

import './styles.css';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setTeachers(response.data);
    }

    const headerIconSmile = <FontAwesomeIcon
        className="headerIcon"
        icon={faLaughBeam}
        color="#FFCC4D"
        size="3x"
    />;

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader
                headerTitle="Estudar"
                title="Estes são os proffys disponíveis."
                icon={headerIconSmile}
                description="Nós temos 32 professores."
            >
                <form id="search-teachers" onSubmit={searchTeachers} >
                    <div className="teachers-select">
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
                        <Select
                            name="week_day"
                            label="Dia da semana"
                            value={week_day}
                            onChange={(e) => { setWeekDay(e.target.value) }}
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
                        <div className="teachers-input">
                            <Input
                                type="time"
                                name="time"
                                label="Hora"
                                value={time}
                                onChange={(e) => { setTime(e.target.value) }}
                            />
                        </div>
                        <button className="teachers-button" type="submit">
                            Buscar
                        </button>
                    </div>

                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />;
                })}
            </main>
        </div>
    );
}

export default TeacherList;