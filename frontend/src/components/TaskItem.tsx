import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateTask, type Task } from "src/api/tasks";
import { CheckButton, UserTag } from "src/components";
import styles from "src/components/TaskItem.module.css";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = () => {
    setLoading(true);
    updateTask({ ...task, isChecked: !task.isChecked, assignee: task.assignee?._id }).then(
      (result) => {
        if (result.success) {
          setTask(result.data);
        } else {
          alert(result.error);
        }
        setLoading(false);
      },
    );
  };
  let containerClass = styles.textContainer;
  if (task.isChecked) {
    containerClass += " " + styles.checked;
  }

  console.log("task", task.title, ", assignee", task.assignee);
  return (
    <div className={styles.item}>
      <CheckButton checked={task.isChecked} onPress={handleToggleCheck} disabled={isLoading} />
      <div className={containerClass}>
        <span className={styles.title}>
          <Link to={"/task/" + task._id}>{task.title}</Link>
        </span>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
      {task.assignee ? (
        <UserTag
          user={{
            _id: task.assignee._id,
            name: task.assignee.name,
            profilePictureURL: task.assignee.profilePictureURL,
          }}
          className={styles.userTag}
        />
      ) : (
        <UserTag className={styles.userTag} />
      )}
    </div>
  );
}
