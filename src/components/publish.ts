import { useAtomValue } from "jotai";
import { userAtom } from "../atoms/user";

import { buildArticleInsert } from "../utils/editorHelper";
import { insertArticle } from "../services/apiArticle";
import type { BlockNoteEditor } from "@blocknote/core";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function usePublish(editor: BlockNoteEditor) {
    // publish 功能相关
    

    const user = useAtomValue(userAtom)



    const {mutate: publishArticle, isPending: isPublishing} = useMutation({
        mutationKey: ['article-publish'],
        mutationFn: async (_value: any) => {
            if (!user) throw new Error("User not signed in");
            const insertArticleData = buildArticleInsert(editor, user.id)
            await insertArticle(insertArticleData)

        },
        onSuccess: () => {
            toast.success("Article published successfully");
        },

        onError: (error) => {
            toast.error(error.message);
        },
    })

    return {
        publishArticle,
        isPublishing,
    }


}