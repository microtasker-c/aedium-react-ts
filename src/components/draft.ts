import type { PartialBlock } from '@blocknote/core'
import { useLocalStorage } from '@reactuses/core'
import { EDITOR_DEFAULT } from '../constants/editor';
import { debounce } from 'es-toolkit'
import { isEditorEmpty as isEditorEmptyHelper } from "../utils/editorHelper";
import { useSetAtom } from 'jotai';
import { isEditorEmptyAtom } from '../atoms/editor';


const DRAFT_KEY = 'draft'


export function useDraft() {
    const [draft, setDraft] = useLocalStorage<PartialBlock[]>(DRAFT_KEY, EDITOR_DEFAULT)
    const setIsEditorEmpty = useSetAtom(isEditorEmptyAtom)

    const saveDraft = debounce((document) => {
        if (isEditorEmptyHelper(document)) {
            setIsEditorEmpty(true);
            setDraft(EDITOR_DEFAULT)
            return
        }

        setIsEditorEmpty(false) // 保存草稿后，设置为非空
        setDraft(document)

    }, 500)


    return {
        draft,
        setDraft,
        saveDraft, // 草稿保存函数
    }
}