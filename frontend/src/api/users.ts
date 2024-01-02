import { type APIResult, get, handleAPIError } from "src/api/requests";

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

export async function getUser(id: string): Promise<APIResult<User>> {
  try {
    const response = await get(`/api/user/${id}`);
    const json = (await response.json()) as User;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
