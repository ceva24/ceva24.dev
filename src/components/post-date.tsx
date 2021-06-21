interface PostDateProps {
    children: React.ReactNode;
}

const PostDate: React.FC<PostDateProps> = ({ children }: PostDateProps) => (
    <strong className="secondary-description">{children}</strong>
);

export { PostDate };
