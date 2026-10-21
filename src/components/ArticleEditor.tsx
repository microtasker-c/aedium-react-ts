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
import {debounce} from 'es-toolkit'
import { useEffect } from "react";

function ArticleEditor() {
    const { draft, setDraft} = useDraft()

    const editor = useCreateBlockNote({
        autofocus: true,
        initialContent: draft ?? undefined
    });

    const saveDraft = debounce((document) => {
        setDraft(document)
    }, 500)

    useEffect(() => {
        return () => {
            saveDraft.flush()
            saveDraft.cancel()
        }
    }, [])


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