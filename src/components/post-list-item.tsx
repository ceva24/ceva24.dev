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
                    <div className="flex">
                        <h3 className="flex-grow text-xl mr-6 uppercase font-normal">
                            {title}
                        </h3>

                        <div className="flex-none">{node.frontmatter.date}</div>
                    </div>

                    <p>{node.excerpt}</p>
                </div>
            </Link>
        </li>
    );
};

export { PostListItem };
