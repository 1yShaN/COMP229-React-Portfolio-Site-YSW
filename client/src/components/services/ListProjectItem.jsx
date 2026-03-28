// import { Link } from "react-router-dom";
// import { remove } from "../../datasource/api-projects";
// import { isAuthenticated } from "../auth/auth-helper";

// const ListProjectItem = ({ project, onRemove }) => {

//     const handleRemove = (id) => {

//     return (
//         <tr >
//             <td className="text-center"> {project.title || ''} </td>
//             <td className="text-center"> {project.completion ? new Date(project.completion).toLocaleDateString() : ''} </td>
//             <td className="text-center"> {project.description || ''} </td>
//             <td className="text-center">
//                 <Link className="btn bg-primary btn-primary btn-sm" to={'/project/edit/' + project.id}>
//                     <i className="fas fa-pencil-alt"></i>
//                 </Link>
//             </td>
//             <td className="text-center">
//                 <button
//                     className="btn bg-danger btn-danger btn-sm"
//                     onClick={() => handleRemove(project.id)}>
//                     <i className="fas fa-trash-alt"></i>
//                 </button>
//             </td>
//         </tr>
//     );
// }

// export default ListProjectItem;