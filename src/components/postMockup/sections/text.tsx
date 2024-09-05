import React from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { componentsStyle } from "@/utils/linkedInPostStyling";

interface TextAreaSectionProps {
  linkedInPost?: string;
}

const formatPost = (post: string) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkBreaks, remarkGfm]}
      components={componentsStyle}
    >
      {post}
    </ReactMarkdown>
  );
};

const TextAreaSection: React.FC<TextAreaSectionProps> = ({ linkedInPost }) => {
  return (
    <div className="flex h-[400px] w-full justify-center">
      {linkedInPost ? (
        <div className="textarea h-full w-[97%] resize-none overflow-auto">
          {formatPost(linkedInPost)}
        </div>
      ) : (
        <textarea
          placeholder="Generating your personalized post ..."
          className="textarea h-full w-[97%] resize-none overflow-auto"
        />
      )}
    </div>
  );
};

export default TextAreaSection;
