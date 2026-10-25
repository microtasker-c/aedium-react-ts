import { useCreateBlockNote } from "@blocknote/react";
import { Route as ArticleRoute } from '@/routes/_app/articles.$articleId'

import Loading from "@/ui/Loading";
import AppEditor from "@/ui/AppEditor";
import { BookmarkIcon, PenIcon, ThumbsUpIcon, TrashIcon } from "@phosphor-icons/react";
import { SignedIn } from "@neondatabase/neon-js/auth/react";
import { useDeleteArticle } from "./article";
import { Link, useNavigate } from "@tanstack/react-router";
import CurrentUser from "@/ui/CurrentUser";
import { useQuery } from "@tanstack/react-query";
import { getArticleById } from "@/services/apiArticle";

function ArticleDisplay() {
    const { articleId } = ArticleRoute.useParams()
    const navigate = useNavigate()

    const editor = useCreateBlockNote()

    // const { articleDisplay, isLoading } = useCurrentArticle(articleId, editor)


    const { data: articleDisplay, isLoading } = useQuery({
        queryKey: ['article', articleId],
        queryFn: async () => {
            const articleDisplay = await getArticleById(Number(articleId));

            editor.replaceBlocks(editor.document, JSON.parse(articleDisplay.content));

            return articleDisplay;
        },
    });

    // 删除逻辑

    const { deleteArticleById, isDeleting } = useDeleteArticle()

    // 时间显示
    const articleUpdatedTime = new Intl.DateTimeFormat(undefined, {
        hour: '2-digit',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })


    if (isLoading || !articleDisplay) {
        return <Loading></Loading>
    }

    return (<>
        <h1 className="text-center text-7xl font-serif mb-4 mt-2">{articleDisplay.title}</h1>

        {/* <div className="divider"></div> */}

        <SignedIn>
            <div className="flex justify-center">
                <ul className="list bg-base-100 w-2xl ">
                    <li className="list-row">
                        {/* <Avatar
                            avatarFile={articleDisplay.author.image ?? ''}
                            username={articleDisplay.author.name}
                        ></Avatar> */}
                        <div><img className="size-14 rounded-box" src={articleDisplay.author.image!} /></div>
                        <div >
                            <div className="text-2xl">{articleDisplay.author.name}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{articleUpdatedTime.format(new Date(articleDisplay.updated_at))}</div>
                        </div>

                        {/* 右侧 */}
                        <div >
                            <ul className="menu menu-horizontal  rounded-box">
                                <li>
                                    <a className="tooltip" data-tip="Like">
                                        <ThumbsUpIcon size={24} />
                                    </a>
                                </li>
                                <li>
                                    <a className="tooltip" data-tip="Bookmark">
                                        <BookmarkIcon size={24} />
                                    </a>
                                </li>

                                <CurrentUser article={articleDisplay}>
                                    {/* 编辑按钮 */}
                                    <li>
                                        <Link to='/articles/edit/$articleId' params={{ articleId: articleId }} className="tooltip bg-blue-600 mx-1" data-tip="Edit">
                                            <PenIcon size={24} />
                                        </Link>
                                    </li>
                                    {/* 删除 */}
                                    <li>
                                        <button
                                            className="tooltip bg-red-600 mx-1"
                                            data-tip="Delete"
                                            onClick={() =>
                                                deleteArticleById(
                                                    { articleId: Number(articleId) },
                                                    {
                                                        onSuccess: () => {
                                                            navigate({ to: '/' })
                                                        }
                                                    }
                                                )}
                                            disabled={isDeleting} // 禁用按钮直到删除操作完成
                                        >
                                            <TrashIcon size={24} />
                                        </button>
                                    </li>
                                </CurrentUser>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>

        </SignedIn>

        <div className="divider mt-0"></div>

        <AppEditor editor={editor} editable={false}></AppEditor>
    </>)
}
export default ArticleDisplay;
