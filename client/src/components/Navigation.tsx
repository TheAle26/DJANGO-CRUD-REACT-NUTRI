import type { ReactElement } from "react";
import { Link } from "react-router-dom";

export function Navigation(): ReactElement {
  return (
    <nav>
      <ul>
        <li><Link to="/tasks">Tasks</Link> </li>
         <li> <Link to="/tasks-create">Create Task</Link></li>
         <li> <Link to="/">LogIn</Link></li>
      </ul>
    </nav>
  );
}
