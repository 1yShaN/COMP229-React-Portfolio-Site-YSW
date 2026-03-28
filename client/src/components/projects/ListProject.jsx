import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { list } from '../../datasource/api-projects';
import ListProjectItem from './ListProjectItem';


function ListProject() {
    let [projectList, setProjectList] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    const loadProjects = () => {
        list()
            .then((res) => {
                if (res.success) {
                    setProjectList(res.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            })
    };

    const handleRemove = (id) => {
        loadProjects();
    };

    useEffect(() => {
        loadProjects();
    }, []);

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <h1>Project List</h1>
            <div>
                <Link to="/projects/add" className="btn btn-primary align-self-end" role="button">
                    <i className="fas fa-plus-circle"></i>
                    Add a new Item
                </Link>
            </div>
            <br />
            <br />
            <div className="table-responsive" >
                {isLoading && <div>Loading...</div>}
                {!isLoading && console.log("Project List: ", projectList)}
                {!isLoading && projectList.length === 0 && <div>No projects found.</div>}
                {!isLoading && projectList.length > 0 &&
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            {/* -- Header Row-- */}
                            <tr>
                                <th className="text-center">Title</th>
                                <th className="text-center">Completion</th>
                                <th className="text-center">Description</th>
                                <th className="text-center" colSpan="3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* -- Repeatable Template Row -- */}
                            {projectList.map(project =>
                                <ListProjectItem
                                    project={project}
                                    onRemove={handleRemove}
                                />
                            )}
                        </tbody>
                    </table>}
            </div>
        </div>
    )
}

export default ListProject;