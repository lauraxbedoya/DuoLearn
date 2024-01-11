import { Lesson } from "@src/utils/interfaces/lesson";

export const validateLessonForm = (lesson?: Partial<Lesson>) => {
  const newErrors: any = {};

  if (!lesson?.experience) {
    newErrors.experience = "Experience is required";
  }

  if (!lesson?.practiceExperience) {
    newErrors.practiceExperience = "Practice experience is required";
  }

  if (!lesson?.order) {
    newErrors.order = "The order is required";
  }

  return newErrors;
};
