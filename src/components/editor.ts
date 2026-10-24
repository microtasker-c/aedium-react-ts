import { useCreateBlockNote } from "@blocknote/react";
import { en } from "@blocknote/core/locales";
import type { PartialBlock } from "@blocknote/core";

export function useEditor(draft: PartialBlock[]) {
   


    const editor = useCreateBlockNote({
        autofocus: true,
        initialContent: draft ,
        // 初始样式设置--- 引入i18n（自带）
        dictionary: {
            ...en,
            placeholders: {
                ...en.placeholders,
                heading: "Enter your title of story here",
                default: "Start typing your story...",
            },
            // slash_menu: {
            //     ...en.slash_menu,
            //     paragraph: {
            //         ...en.slash_menu.paragraph,
            //         title: "Text Block",
            //         subtext: "Regular text content",
            //     },
            // },
        },
    });
    return editor;
}