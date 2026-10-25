import type { BlockNoteEditor } from '@blocknote/core'
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import styles from './ArticleEditor.module.css'

function AppEditor({
    className,
    editor,
    editable = true,
    onChange
}:
    {
        className?: string;
        editor: BlockNoteEditor;
        editable?: boolean;
        onChange?: (editor: BlockNoteEditor) => void;
    }
) {
    return (<>
        <BlockNoteView
            className={`${styles.editor} ${className}`}
            editor={editor}
            editable={editable}
            onChange={onChange}
        ></BlockNoteView>
    </>);
}
export default AppEditor;
