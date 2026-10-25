import { HeartIcon } from "@phosphor-icons/react";
import type { Article } from "@/types/Article";
import { Link } from "@tanstack/react-router";


function ArticleListItem({ article }: { article: Article }) {

    // 获取文章简短描述
    // 递归解析内容块，提取文本内容
    function getArticleBrief(content: string, maxLength = 50) {
        const blocks = JSON.parse(content);

        let brief = '';

        brief = blocks
            .map((block: any) => {
                let ownText = '';
                let childrenText = '';

                if (Array.isArray(block.content)) {
                    ownText = block.content
                        .map((item: any) => {
                            if (item.type === 'text') {
                                return item.text;
                            }

                            if (item.type === 'link') {
                                if (Array.isArray(item.content)) {
                                    item.content.map((child: any) => child.text ?? '').join(' ');
                                }
                            }

                            return '';
                        })
                        .join(' ');
                }

                if (Array.isArray(block.children)) {
                    childrenText = block.children
                        .map((childBlock: any) => {
                            getArticleBrief(JSON.stringify([childBlock]), maxLength);
                        })
                        .join(' ');
                }

                return `${ownText} ${childrenText}`.trim();
            })
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();

        if (!brief) {
            brief = 'No brief';
        }

        return brief.length > maxLength
            ? brief.slice(0, maxLength).trim() + '...'
            : brief;
    }


    return (<>
        <Link to='/articles/$articleId' params={{ articleId: `${article.id}` }}>
            <li className="list-row h-33">
                <div><img className="size-26     rounded-box" alt="Tailwind CSS list item" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
                <div>
                    {/* 标题 */}
                    <div className="text-2xl sm:text-4xl font-bold font-serif">{article.title}</div>
                    {/* 描述 */}
                    <div className="text-sm sm:text-lg font-semibold opacity-60">
                        {getArticleBrief(article.content)}
                    </div>
                </div>
                <div className="lg:tooltip" data-tip='like'>
                    <button className="btn btn-square btn-secondary btn-sm btn-ghost">
                        <HeartIcon size={24} />
                    </button>
                </div>
                {/* <button className="btn btn-square btn-ghost">
                <svg aria-label="Favorite" className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
            </button> */}
            </li>
        </Link>
    </>);
}
export default ArticleListItem;
