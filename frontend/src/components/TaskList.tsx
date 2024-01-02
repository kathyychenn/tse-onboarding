import React, { useEffect, useState } from "react";
import { getAllTasks, type Task } from "src/api/tasks";
import { TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

export interface TaskListProps {
  title: string;
}

export function TaskList({ title }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    // your code here
    getAllTasks().then((result) => {
      if (result.success) {
        // Update the tasks state with the retrieved array of tasks
        setTasks(result.data);
        console.log(tasks);
      } else {
        // Display an alert if the request fails
        alert(result.error);
      }
      //   })
      //   .catch((error) => {
      //     // Display an alert for any unexpected errors
      //     alert(`Error fetching tasks: ${error}`);
    });
  }, []);

  return (
    <div className={styles.list}>
      <span className={styles.title}>{title}</span>
      <div className={styles.itemContainer}>
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one above to get started.</p>
        ) : (
          // your code here
          <ul>
            {tasks.map((task) => (
              // your code here
              <TaskItem
                key={task._id}
                task={{
                  _id: task._id,
                  title: task.title,
                  description: task.description,
                  isChecked: task.isChecked,
                  dateCreated: task.dateCreated,
                }}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
