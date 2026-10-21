import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import RootLayout from "./RootLayout";
import styles from './ArticleEditor.module.css'
// import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
import RequireLogin from "./RequireLogin";
import RequireVerfiedEmail from "./RequireVerfiedEmail";

function ArticleEditor() {
    const editor = useCreateBlockNote({
        autofocus: true,
        initialContent: [
            {
                type: 'heading',
                props: {
                    level: 1
                },
                content: 'Tell your story'
            }
        ]
    });

    return (
        // 路由守卫 --- 路由触及到此界面就会触发
        <RequireLogin>
            <RequireVerfiedEmail>
                <RootLayout>
                    <BlockNoteView className={styles.editor} editor={editor} />
                </RootLayout>
            </RequireVerfiedEmail>
        </RequireLogin>
    )
}

export default ArticleEditor