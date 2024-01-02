// import { type APIResult, get, handleAPIError, post, put } from "src/api/requests";

/**
 * Defines the "shape" of a Task object (what fields are present and their types) for
 * frontend components to use. This will be the return type of most functions in this
 * file.
 */
export interface User {
  _id: string;
  name: string;
  profilePictureURL?: string;
}
