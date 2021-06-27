import React from "react";

interface PostDateProps {
    children: React.ReactNode;
}

const PostDate: React.FC<PostDateProps> = ({ children }: PostDateProps) => (
    <strong>{children}</strong>
);

export { PostDate };
