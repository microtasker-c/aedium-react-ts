import type { Block, BlockNoteEditor } from '@blocknote/core';
import type { InsertArticle } from '../types/Article';

type BlockContent = Block['content'];

const CONTENTLESS_BLOCK_TYPES = new Set([
    'audio',
    'divider',
    'image',
    'video',
    'file',
]);

function isContentEmpty(content: BlockContent | undefined) {
    if (!content) {
        return true;
    }

    // The content is TableContent
    if (!Array.isArray(content)) {
        return false;
    }

    return content.every((item) => {
        // StyledText
        if (item.type === 'text') {
            return item.text.trim().length === 0;
        }

        // Link | CustomInlineContent
        if ('content' in item && Array.isArray(item.content)) {
            return item.content.every((child) => child.text.trim().length === 0);
        }

        return false;
    });
}

export function isEditorEmpty(blocks: Block[]): boolean {
    return blocks.every((block) => {
        if (CONTENTLESS_BLOCK_TYPES.has(block.type)) {
            return false;
        }
        return isContentEmpty(block.content) && isEditorEmpty(block.children);
    });
}


// 构建文章
export function buildArticleInsert(editor: BlockNoteEditor, userId: string): InsertArticle {
    const [headingBlock, ...bodyBlocks] = editor.document

    const headingMD = editor.blocksToMarkdownLossy([headingBlock])
    const title = headingMD.replace(/# /g, '').trim(); // 去掉标题前的 # 符号

    if (!title) {
        throw new Error('文章标题不能为空');
    }




    return {
        title,
        content: JSON.stringify(bodyBlocks),
        author_id: userId,
    }
}