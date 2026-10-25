import { useCreateBlockNote } from "@blocknote/react";
import { Route as ArticleRoute } from '@/routes/_app/articles.$articleId'

import Loading from "@/ui/Loading";
import AppEditor from "@/ui/AppEditor";
import { BookmarkIcon, PenIcon, ThumbsUpIcon, TrashIcon } from "@phosphor-icons/react";
import { SignedIn } from "@neondatabase/neon-js/auth/react";
import { useCurrentArticle, useDeleteArticle } from "./article";
import { Link, useNavigate } from "@tanstack/react-router";

function ArticleDisplay() {
    const { articleId } = ArticleRoute.useParams()
    const navigate = useNavigate()

    const editor = useCreateBlockNote()

    const { article, isLoading } = useCurrentArticle(articleId, editor)

    // 删除逻辑

    const { deleteArticleById, isDeleting } = useDeleteArticle()


    if (isLoading) {
        return <Loading></Loading>
    }

    return (<>
        <h1 className="text-center text-7xl font-serif mb-4 mt-2">{article?.title}</h1>

        {/* <div className="divider"></div> */}

        <SignedIn>
            <div className="flex justify-center">
                <ul className="list bg-base-100 w-2xl ">
                    {/* Todo: Add user info here */}
                    <li className="list-row">
                        <div><img className="size-15 rounded-box" alt="Tailwind CSS list item" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
                        <div >
                            <div className="text-2xl">Dio Lupa</div>
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
                                                { onSuccess: () => {
                                                    navigate({to: '/'})
                                                }}
                                            )}
                                        disabled={isDeleting} // 禁用按钮直到删除操作完成
                                    >
                                        <TrashIcon size={24} />
                                    </button>
                                </li>
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
