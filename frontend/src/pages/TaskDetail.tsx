import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Page, Button, UserTag, TaskForm } from "src/components";
import { getTask, type Task } from "src/api/tasks";
import styles from "src/pages/TaskDetail.module.css";

export function TaskDetail() {
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setEditing] = useState<boolean>(false);
  const { id } = useParams();

  const setEditTrue = () => {
    setEditing(true);
  };

  const handleFormSubmit = (updatedTask: Task) => {
    // Update the task in the state with the data from the submitted form
    setTask(updatedTask);
    // Set isEditing back to false
    setEditing(false);
  };

  useEffect(() => {
    getTask(id as string).then((result) => {
      if (result.success) {
        console.log("if");
        setTask(result.data);
      } else {
        console.log("else");
        alert(result.error);
      }
    });
  }, [id]);

  if (task === null) {
    return (
      <Page>
        <Helmet>
          <title>No Task | TSE Todos</title>
        </Helmet>
        <p>
          <Link to="/">Back to home</Link>
        </p>
        <p className={styles.title}>This task does not exist!</p>
      </Page>
    );
  }

  return (
    <Page>
      <Helmet>
        <title>{task.title + " | TSE Todos"}</title>
      </Helmet>
      <p>
        <Link to="/">Back to home</Link>
      </p>
      {isEditing ? (
        <TaskForm mode="edit" task={task} onSubmit={handleFormSubmit} />
      ) : (
        <div className={styles.details}>
          <div className={styles.titleContainer}>
            <span className={styles.title}>{task.title}</span>
            <Button
              kind="primary"
              type="button"
              data-testid="task-edit-button"
              label="Edit Task"
              onClick={setEditTrue}
            />
          </div>
          <p>{task.description ? task.description : "(No Description)"}</p>
          <div className={styles.infoContainer}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Assignee</span>
              {task.assignee !== undefined ? (
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
            <div className={styles.infoRow}>
              <span className={styles.label}>Status</span>
              {task.isChecked ? (
                <p className={styles.userName}>Done</p>
              ) : (
                <p className={styles.userName}>Not Done</p>
              )}
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Date Created</span>
              <p className={styles.userName}>
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "full",
                  timeStyle: "short",
                }).format(task.dateCreated)}
              </p>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}
