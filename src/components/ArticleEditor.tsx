import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import styles from './ArticleEditor.module.css'
// import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
import RequireVerfiedEmail from "./RequireVerfiedEmail";
import { useDraft } from "./draft";
import { useEffect } from "react";
import {  isEditorEmpty as isEditorEmptyHelper } from "../utils/editorHelper";
import {  useAtomValue, useSetAtom } from "jotai";
import { editorEmptySignalAtom, isEditorEmptyAtom, editorPublishSignalAtom } from "../atoms/editor";
import { EDITOR_DEFAULT } from "../constants/editor";
import { useEditor } from "./editor";
import { userAtom } from "../atoms/user";
// import { insertArticle } from "../services/apiArticle";
import { usePublish } from "./publish";



function ArticleEditor() {
    const { draft, setDraft, saveDraft } = useDraft()
    const editor = useEditor(draft ?? EDITOR_DEFAULT)
    let isRestoring = false;
    const user = useAtomValue(userAtom)

    const editorPublishSignal = useAtomValue(editorPublishSignalAtom)
    const setEditorPublishSignal = useSetAtom(editorPublishSignalAtom)

    const {
        publishArticle,
        // isPublishing,
    } = usePublish(editor)


    useEffect(() => {
        if (user && !isEditorEmptyHelper(editor.document) && editorPublishSignal) {
            publishArticle({}, {
                onSuccess: () => {
                    setIsEditorEmpty(true)
                    setDraft(EDITOR_DEFAULT)
                    saveDraft.cancel()
                    editor.replaceBlocks(editor.document, EDITOR_DEFAULT)

                    setEditorPublishSignal(0)
                },
            })



        }
    }, [editorPublishSignal])









    const setIsEditorEmpty = useSetAtom(isEditorEmptyAtom)
    const editorEmptySignal = useAtomValue(editorEmptySignalAtom)

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
        if (editorEmptySignal) {
            // setIsEditorEmpty(true)
            setDraft(EDITOR_DEFAULT)
            editor.replaceBlocks(editor.document, EDITOR_DEFAULT)
            setEditorPublishSignal(0)
        }
    }, [editorEmptySignal])


    function handleEditorChange(changedEditor: typeof editor) {
        if (isRestoring) {
            isRestoring = false
            return
        }


        if (isEditorEmptyHelper(changedEditor.document)) {
            isRestoring = true
            setIsEditorEmpty(true)
            setDraft(EDITOR_DEFAULT)
            saveDraft.cancel()

            editor.replaceBlocks(editor.document, EDITOR_DEFAULT)
            return
        }

        setIsEditorEmpty(false)
        saveDraft(changedEditor.document)
    }


    return (

        <RequireVerfiedEmail>

            <BlockNoteView
                className={styles.editor}
                editor={editor}
                onChange={(editor) => handleEditorChange(editor)}
            />

        </RequireVerfiedEmail>
    )
}

export default ArticleEditor