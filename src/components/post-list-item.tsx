import React from "react";
import { Link } from "gatsby";

const PostListItem: React.FC<IndexPageEdge> = ({ node }: IndexPageEdge) => {
    const title = node.frontmatter.title;

    return (
        <li key={node.id} aria-label={title}>
            <div className="max-w-4xl mx-auto">
                <Link to={`/${node.fields.path}`} aria-label={title}>
                    <div className="p-6 pb-3 text-gray-700 hover:bg-gray-50 hover:shadow-lg">
                        <div className="flex">
                            <h3 className="flex-grow font-title text-lg pr-6">
                                <strong className="uppercase">{title}</strong>
                            </h3>

                            <div className="flex-none">
                                <div>{node.frontmatter.date}</div>
                            </div>
                        </div>

                        <p>{node.excerpt}</p>
                    </div>
                </Link>
            </div>
        </li>
    );
};

export { PostListItem };
