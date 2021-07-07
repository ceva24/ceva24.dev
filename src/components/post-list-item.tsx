import React from "react";
import { Link } from "gatsby";

const PostListItem: React.FC<IndexPageEdge> = ({ node }: IndexPageEdge) => {
    const title = node.frontmatter.title;

    return (
        <li key={node.id} className="mb-0" aria-label={title}>
            <Link
                to={`/${node.fields.path}`}
                aria-label={title}
                className="text-black"
            >
                <div className="p-6 pb-3 hover:bg-gray-50 hover:shadow-lg">
                    <h2 className="text-2xl mb-1">{title}</h2>

                    <div className="mb-3">{node.frontmatter.date}</div>

                    <p>{node.excerpt}</p>
                </div>
            </Link>
        </li>
    );
};

export { PostListItem };
