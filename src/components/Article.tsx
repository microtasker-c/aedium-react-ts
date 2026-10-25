import { useCreateBlockNote } from "@blocknote/react";
import { Route as ArticleRoute } from '../routes/_app/articles.$articleId'
import { useQuery } from "@tanstack/react-query";
import { getArticleById } from "../services/apiArticle";
import Loading from "./Loading";
import AppEditor from "./AppEditor";

function Article() {
    const { articleId } = ArticleRoute.useParams()


    const editor = useCreateBlockNote()

    const { data: article, isLoading } = useQuery({
        queryKey: ["article", articleId],
        queryFn: async () => {
            const article = await getArticleById(Number(articleId))

            editor.replaceBlocks(editor.document, JSON.parse(article.content))

            return article
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    return (<>
        <h1 className="text-center text-7xl font-serif mb-8 mt-2">{article?.title}</h1>
        {/* <BlockNoteView className={styles.editor} editor={editor} editable={false}></BlockNoteView> */}
        <AppEditor  editor={editor} editable={false}></AppEditor>
    </>)
}
export default Article;
