import { useCreateBlockNote } from "@blocknote/react";
import AppEditor from "@/ui/AppEditor";
import { Route } from "@/routes/_app/_protected/articles.edit.$articleId";
import { useCurrentArticle } from "./article";
import Loading from "@/ui/Loading";
import { useAtom } from "jotai";
import { editorUpdateSignalAtom } from "@/atoms/editor";
// import { useEffect, useRef, useState } from "react";
import { useEffect} from "react";
import { buildArticleInsert, isEditorEmpty } from "@/utils/editorHelper";
import { updateArticleById } from "@/services/apiArticle";
// import { useBlocker, useNavigate } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

function ArticleEdit() {
    const editor = useCreateBlockNote();
    const { articleId } = Route.useParams()

    const navigate = useNavigate();

    // const initialArticle = useRef<string | null>(null)
    // const [isDirty, setIsDirty] = useState(false)


    const { article, isLoading, isError } = useCurrentArticle(articleId, editor)
    if (isError) {
        navigate({to:'/auth/$pathname', params:{pathname: 'sign-in'}})
    }

    // jotai
    const [editorUpdateSignal, setEditorUpdateSignal] = useAtom(editorUpdateSignalAtom)


    // function handleEditorChange() {
    //     if (!article || !initialArticle.current) {
    //         return;
    //     }

    //     const currentArticleData = buildArticleInsert(editor, article.author_id)

    //     const currentArticle = JSON.stringify({
    //         title: currentArticleData.title,
    //         content: currentArticleData.content,
    //     })

    //     // 比较
    //     if (currentArticle !== initialArticle.current) {
    //         setIsDirty(true)
    //     }

    // }


    async function handleUpdate() {
        if (!article?.author_id) throw new Error("user not found")
        const insertData = buildArticleInsert(editor, article.author_id)
        await updateArticleById(Number(articleId), {
            title: insertData.title,
            content: insertData.content,
            updated_at: new Date().toISOString()
        })
        setEditorUpdateSignal(0)

        navigate({ to: '/articles/$articleId', params: { articleId: articleId.toString() } })
    }

    useEffect(() => {
        if (!isLoading && editorUpdateSignal && !isEditorEmpty(editor.document)) {
            handleUpdate()
        }

    }, [editorUpdateSignal])

// TODO: 有bug - 1.点击update也会跳转路由，因此触发  2.切换浏览器页面，

    // useEffect(() => {
    //     if (!isLoading && article) {
    //         initialArticle.current = JSON.stringify({
    //             title: article.title,
    //             content: article.content,
    //         })

    //         setIsDirty(false)
    //     }
    // }, [isLoading, article])

    // // 路由跳转拦截
    
    // useBlocker({
    //     shouldBlockFn: () => {

    //         if (!isDirty) return false; // 如果没有修改，不拦截


    //         const shouldBlock = !window.confirm("You have unsaved changes, Are you sure you want to leave?")

    //         return shouldBlock;
    //     }
    // })


    if (isLoading) return <Loading></Loading>




    return (<>
        {/* <AppEditor editor={editor} onChange={handleEditorChange}></AppEditor> */}
        <AppEditor editor={editor}></AppEditor>
    </>);
}
export default ArticleEdit;
