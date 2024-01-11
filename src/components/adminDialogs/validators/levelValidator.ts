import { Level } from "@src/utils/interfaces/level";

export const validateLevelForm = (level?: Partial<Level>) => {
  const newErrors: any = {};

  if (!level?.description) {
    newErrors.description = "Description is required";
  }

  if (!level?.title) {
    newErrors.title = "Title is required";
  }

  if (!level?.type) {
    newErrors.type = "Type is required";
  }

  if (!level?.order) {
    newErrors.order = "The order is required";
  }

  return newErrors;
};
