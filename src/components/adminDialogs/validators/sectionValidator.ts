import { Section } from "@src/utils/interfaces/section";

export const validateSectionForm = (section?: Partial<Section>) => {
  const newErrors: any = {};

  if (!section?.description) {
    newErrors.description = "Description is required";
  }

  if (!section?.color) {
    newErrors.color = "Color is required";
  }
  if (!section?.order) {
    newErrors.order = "The order is required";
  }

  return newErrors;
};
