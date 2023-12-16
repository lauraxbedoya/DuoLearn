// import DuoInput from "@src/components/input/DuoInput";
// import { QuestionMetadata } from "@src/utils/interfaces/question";
// import { FC, useState } from "react";

// interface TranslateTypingProps {
//   errors: any;
//   visible: boolean;
//   onClose: () => void;
//   onSubmit: (questionMetadata?: Partial<QuestionMetadata>) => void;
//   questionMetadata?: QuestionMetadata;
// }

// const TranslateTyping: FC<TranslateTypingProps> = ({ errors }) => {
//   const [questionMetadata, setQuestionMetadata] = useState<
//     Partial<QuestionMetadata> | undefined
//   >(lessonToEdit);

//   const handleChange = (key: any, value: any) => {
//     setQuestionMetadata({
//       ...questionMetadata,
//       [key]: value,
//     });
//   };

//   return (
//     <div>
//       <DuoInput
//         placeholder="Answer"
//         name="answer"
//         value={questionMetadata?.answer}
//         error={errors}
//         onChange={handleChange}
//       />
//     </div>
//   );
// };

// export default TranslateTyping;
