import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import RootLayout from "./RootLayout";
import styles from './ArticleEditor.module.css'

function ArticleEditor() {
    const editor = useCreateBlockNote({
        autofocus: true,
        initialContent: [
            {
                type: 'heading',
                props:{
                    level: 1
                },
                content: 'Tell your story'
            }
        ]
    });

    return (
        <RootLayout>

            <BlockNoteView className={styles.editor} editor={editor} />;
        </RootLayout>
    )
}

export default ArticleEditor