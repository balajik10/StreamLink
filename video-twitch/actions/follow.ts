"use server";

export const onFollow = async (id: string) => {
  try {
    console.log("I am the same as an API Call", id);
    // Implement your follow logic here, such as calling `followUser(id)` or similar.
  } catch (error) {
    throw new Error("Internal Error");
  }
};
