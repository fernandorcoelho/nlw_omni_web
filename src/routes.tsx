import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login/index';
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Register from './pages/Register';
import SuccessRegister from './pages/SuccessRegister';
import RecoverPassword from './pages/RecoverPassword';
import SuccessRecover from './pages/SuccessRecover';
import Profile from './pages/Profile';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/recover" component={RecoverPassword} />
            <Route path="/success-recover" component={SuccessRecover} />
            <Route path="/home" component={Landing} />
            <Route path="/profile" component={Profile} />
            <Route path="/study" component={TeacherList} />
            <Route path="/give-classes" component={TeacherForm} />
            <Route path="/register" component={Register} />
            <Route path="/success-register" component={SuccessRegister} />
        </BrowserRouter>
    );
}

export default Routes;