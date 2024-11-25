import React from "react";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
} from "@portabletext/react";

// Define the type for annotations
interface LinkTextMark {
  _type: "link";
  href: string;
  targetBlank: boolean;
}

// Custom PortableText components
const components: PortableTextComponents = {
  marks: {
    // Define a custom renderer for popupText annotations
    link: ({
      children,
      value,
    }: PortableTextMarkComponentProps<LinkTextMark>) => (
      <a
        href={value?.href}
        target={value?.targetBlank ? "_blank" : "_self"}
        className="text-blue-500 hover:underline"
      >
        {children}
      </a>
    ),
  },
};

// Props type for the PortableText renderer
interface BlockContentProps {
  blocks: any[]; // Replace with your Sanity block content type if available
}

// PortableText Renderer Component
const BlockContentRenderer: React.FC<BlockContentProps> = ({ blocks }) => {
  return <PortableText value={blocks} components={components} />;
};

export default BlockContentRenderer;
