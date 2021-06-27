import React from "react";
import { Link } from "gatsby";
import { PostDate } from "./post-date";

const PostListItem: React.FC<IndexPageEdge> = ({ node }: IndexPageEdge) => (
    <li key={node.id}>
        <div>
            <h3>
                <Link to={`/${node.fields.path}`}>
                    {node.frontmatter.title}
                </Link>
            </h3>
            <div>
                <PostDate>{node.frontmatter.date}</PostDate>
            </div>
        </div>
        <p>{node.excerpt}</p>
    </li>
);

export { PostListItem };
