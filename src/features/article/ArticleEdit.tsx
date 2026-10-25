import { useCreateBlockNote } from "@blocknote/react";
import AppEditor from "@/ui/AppEditor";
import { Route } from "@/routes/_app/_protected/articles.edit.$articleId";
import { useCurrentArticle } from "./article";
import Loading from "@/ui/Loading";
import { useAtom } from "jotai";
import { editorUpdateSignalAtom } from "@/atoms/editor";
import { useEffect } from "react";
import { buildArticleInsert, isEditorEmpty } from "@/utils/editorHelper";
import { updateArticleById } from "@/services/apiArticle";
import { useNavigate } from "@tanstack/react-router";

function ArticleEdit() {
    const editor = useCreateBlockNote();
    const { articleId } = Route.useParams()

    const navigate = useNavigate();


    const { article, isLoading } = useCurrentArticle(articleId, editor)

    // jotai
    const [editorUpdateSignal, setEditorUpdateSignal] = useAtom(editorUpdateSignalAtom)




    async function handleUpdate() {
        if (!article?.author_id) throw new Error("user not found")
        const insertData = buildArticleInsert(editor, article.author_id)
        await updateArticleById(Number(articleId), {
            title: insertData.title,
            content: insertData.content,
            updated_at: new Date().toISOString()
        })
        setEditorUpdateSignal(0)

        navigate({to:'/articles/$articleId', params:{articleId:articleId.toString()}})
    }

    useEffect(() => {
        if (!isLoading && editorUpdateSignal && !isEditorEmpty(editor.document)) {
            handleUpdate()
        }

    }, [editorUpdateSignal])

    if (isLoading) return <Loading></Loading>




    return (<>
        <AppEditor editor={editor} ></AppEditor>
    </>);
}
export default ArticleEdit;
