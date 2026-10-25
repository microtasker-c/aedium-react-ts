import { deleteArticleById as deleteArticleByIdApi, getArticleById } from "@/services/apiArticle";
import type { BlockNoteEditor } from "@blocknote/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCurrentArticle(articleId: string, editor: BlockNoteEditor) {
    const { data: article, isLoading } = useQuery({
        queryKey: ["article", articleId],
        queryFn: async () => {
            const article = await getArticleById(Number(articleId))

            editor.replaceBlocks(editor.document, [
                { type: 'heading', content: article.title, level: 1 },
                ...JSON.parse(article.content)])

            // console.log(article);

            return article
        }
    })

    return { article, isLoading }
}


export function useDeleteArticle() {
    const { mutate: deleteArticleById, isPending: isDeleting } = useMutation({
        mutationKey: ["deleteArticle"],
        mutationFn: async ({ articleId }: { articleId: number }) => {
            await deleteArticleByIdApi(articleId)
        },

        onSuccess: () => {
            toast.success("Article deleted successfully")
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })

    return { deleteArticleById, isDeleting }
}