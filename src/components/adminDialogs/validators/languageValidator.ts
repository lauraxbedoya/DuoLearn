import { Language } from "@src/utils/interfaces/language";

export const validateLanguageForm = (language?: Partial<Language>) => {
  const newErrors: any = {};

  if (!language?.name) {
    newErrors.name = "Name is required";
  }

  return newErrors;
};
