import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/about'
import Contact from './components/contact'
import Project from './components/project'
import NavBar from './components/NavBar'
import Services from './components/services'
import NotFound from './components/NotFound'
import User from './components/users'
import References from './components/references'
import ListProject from './components/projects/ListProject';
import AddProject from './components/projects/AddProject';
import EditProject from './components/projects/EditProject';
import ListService from './components/services/ListService';
import AddService from './components/services/AddService'
import EditService from './components/services/EditService';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import PrivateRoute from './components/auth/PrivateRoute';

const MainRouter = () => {
    return (
        <div>
            <NavBar />
            <Routes>

                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route path="/projects" element={<Project />} />
                <Route path="/projects/list" element={<ListProject />} />
                <Route
                    path="/projects/add"
                    element={
                        <PrivateRoute adminOnly>
                            <AddProject />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/projects/edit/:id"
                    element={
                        <PrivateRoute adminOnly>
                            <EditProject />
                        </PrivateRoute>
                    }
                />
                <Route exact path="/services" element={<Services />} />
                <Route path="/services/list" element={<ListService />} />
                <Route
                    path="/services/add"
                    element={
                        <PrivateRoute adminOnly>
                            <AddService />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/services/edit/:id"
                    element={
                        <PrivateRoute adminOnly>
                            <EditService />
                        </PrivateRoute>
                    }
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route exact path="/users" element={<User />} />
                <Route exact path="/references" element={<References />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </div>
    )
}
export default MainRouter;
