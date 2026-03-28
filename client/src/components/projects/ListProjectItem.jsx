import { Link } from "react-router-dom";
import { remove } from "../../datasource/api-projects";

function ListProjectItem({project, onRemove}) {

    const handleRemove = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            remove(id)
                .then(res => {
                    if (res && res.success) {
                        onRemove();
                    }
                    else {
                        alert(res.message);
                    }
                }).catch(err => {
                    alert(err.message);
                    console.log(err)
                });
        };
    };

    return (
        <>
            <tr >
                <td className="text-center"> {project.title || ''} </td>
                <td className="text-center"> {project.completion ? new Date(project.completion).toLocaleDateString() : ''} </td>
                <td className="text-center"> {project.description || ''} </td>
                <td className="text-center">
                    <Link className="btn bg-primary btn-primary btn-sm" to={'/projects/edit/' + project.id}>
                        <i className="fas fa-pencil-alt"></i>
                    </Link>
                </td>
                <td className="text-center">
                    <button
                        className="btn bg-danger btn-danger btn-sm"
                        onClick={() => handleRemove(project.id)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        </>
    )
}

export default ListProjectItem;