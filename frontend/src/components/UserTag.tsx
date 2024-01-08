import React from "react";
import { type User } from "src/api/users";
import styles from "src/components/UserTag.module.css";

export interface UserTagProps {
  user?: User;
  className: string;
}

export function UserTag({ user, className }: UserTagProps) {
  console.log(className);
  return (
    <div className={className}>
      {user !== undefined ? (
        <div className={styles.assignedTrue}>
          {user.profilePictureURL ? (
            <img
              src={user.profilePictureURL}
              alt={`Profile of ${user.name}`}
              className={styles.profilePicture}
            />
          ) : (
            <img
              src="/userDefault.svg" // Provide the correct file name if it's different
              alt="Default Profile"
              className={styles.profilePicture}
            />
          )}
          <span className={styles.userName}>{user.name}</span>
        </div>
      ) : (
        <span className={styles.userName}>Not Assigned</span>
      )}
    </div>
  );
}
