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
    getAllTasks().then((result) => {
      if (result.success) {
        setTasks(result.data);
      } else {
        alert(result.error);
      }
    });
  }, []);

  return (
    <div className={styles.list}>
      <span className={styles.title}>{title}</span>
      <div className={styles.itemContainer}>
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one above to get started.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
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
