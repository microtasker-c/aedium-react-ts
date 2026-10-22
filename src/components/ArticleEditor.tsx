import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import RootLayout from "./RootLayout";
import styles from './ArticleEditor.module.css'
// import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
import RequireLogin from "./RequireLogin";
import RequireVerfiedEmail from "./RequireVerfiedEmail";
import { useDraft } from "./draft";
import { debounce } from 'es-toolkit'
import { useEffect } from "react";
import { isEditorEmpty as isEditorEmptyHelper } from "../utils/editorHelper";
import { useAtom } from "jotai";
import { isEditorEmptyAtom } from "../atoms/editor";



function ArticleEditor() {
    const { draft, setDraft } = useDraft()

    const editor = useCreateBlockNote({
        autofocus: true,
        initialContent: draft ?? undefined
    });

    const [isEditorEmpty, setIsEditorEmpty] = useAtom(isEditorEmptyAtom)

    const saveDraft = debounce((document) => {
        if (isEditorEmptyHelper(document)) {
            setIsEditorEmpty(true);
            setDraft([
                {
                    type: 'paragraph',
                    content: ''
                }
            ])
            return
        }

        setIsEditorEmpty(false) // 保存草稿后，设置为非空
        setDraft(document)

    }, 500)

    useEffect(() => {
        if (!isEditorEmptyHelper(editor.document)) {
            setIsEditorEmpty(false)
            return
        }

        return () => {
            saveDraft.flush()
            saveDraft.cancel()
        }
    }, [])

    useEffect(() => {
        if (isEditorEmpty) {
            // setIsEditorEmpty(true)
            setDraft([
                {
                    type: 'paragraph',
                    content: ''
                }
            ])
            editor.replaceBlocks(editor.document, [
                {
                    type: 'paragraph',
                    content: ''
                }
            ])
        }
    }, [isEditorEmpty])

    return (
        // 路由守卫 --- 路由触及到此界面就会触发
        <RequireLogin>
            <RequireVerfiedEmail>
                <RootLayout>
                    <BlockNoteView onChange={(editor) => saveDraft(editor.document)} className={styles.editor} editor={editor} />
                </RootLayout>
            </RequireVerfiedEmail>
        </RequireLogin>
    )
}

export default ArticleEditor