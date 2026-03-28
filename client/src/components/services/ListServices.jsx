import React, { useEffect, useState } from 'react';
import { list } from '../../datasource/api-projects';
import { Link } from "react-router-dom";
import ListProjectItem from './ListProjectItem';

function ListProject() {
    const [projectList, setProjectList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadProjects = () => {
        list()
            .then((res) => {
                if (res.data) {
                    setProjectList(res.data);
                    setIsLoading(false);
                }
                else{
                    alert(res.message);
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            });
    }

    const handleRemove = ()=>{
        loadProjects();
    }

    useEffect(() => {
        loadProjects();
    }, []);

    return (
        <div style={{ paddingTop: 80 }}>
            <h1>Project List</h1>

            <div>
                <Link to="/project/add" className="btn btn-primary align-self-end" role="button">
                    <i className="fas fa-plus-circle"></i>
                    Add a new Item
                </Link>
            </div>
            {isLoading && <div>Loading...</div>}
            {!isLoading && console.log("Project List: ", projectList)}
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
                                onRemove={handleRemove}/>
                        )}
                    </tbody>
                </table>}
        </div>
    );
}

export default ListProject;