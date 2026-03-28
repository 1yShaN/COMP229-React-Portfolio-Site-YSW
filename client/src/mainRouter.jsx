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

const MainRouter = () => {
    return (
        <div>
            <NavBar />
            <Routes>

                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/projects" element={<Project />} />
                <Route exact path="/services" element={<Services />} />
                <Route exact path="/users" element={<User />} />
                <Route exact path="/references" element={<References />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </div>
    )
}
export default MainRouter;
