import type { ArticleDisplay, ArticleWithAuthorProfile, InsertArticle, UpdateArticle } from "../types/Article";
import { client } from "../utils/neon";

const TABLE_NAME = 'article';

/**
 * 获取所有 文章信息
 * @returns data
 */
export async function getAllArticles() {
    const { data, error } = await client
        .from(TABLE_NAME)
        .select('*')

    if (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
    console.log(data); // Log the fetched data
    return data;
}

/**
 * 插入文章信息
 * @param insertArticle 
 * @returns 
 */
export async function insertArticle(insertArticle: InsertArticle) {
    const { data } = await client
        .from(TABLE_NAME)
        .insert(insertArticle)
        .select();

    // console.log(error); // Log the inserted data
    return data;
}

/**
 * 通过文章ID获取文章信息
 * @param articleId 
 * @returns 
 */
export async function getArticleById(articleId: number) {
    const { data, error } = await client
        .from('article_with_user_profile')
        .select('*')
        .eq('article_id', articleId)
        .single();

    if (error) {
        throw error;
    }

    return mapToArticleDisplay(data);
}

/**
 * 通过文章ID更新文章信息
 * @param articleId 
 * @param updateArticle 
 * @returns 
 */
export async function updateArticleById(articleId: number, updateArticle: UpdateArticle) {
    const { data, error } = await client
        .from(TABLE_NAME)
        .update(updateArticle)
        .eq('id', articleId)
        .select();

    if (error) {
        throw error;
    }
    // console.log(data); // Log the updated data
    return data;
}


export async function deleteArticleById(articleId: number) {
    const { data, error } = await client
        .from(TABLE_NAME)
        .delete()
        .eq('id', articleId)
        .select();

    if (error) {
        throw error;
    }
    console.log(data); // Log the deleted data
    return data;
}


/**
 * 工具函数（type）
 */
function mapToArticleDisplay(row: ArticleWithAuthorProfile): ArticleDisplay {
    if (
        !row.article_id ||
        !row.author_id ||
        !row.title ||
        !row.content ||
        !row.created_at ||
        !row.updated_at ||
        !row.name ||
        !row.image
    ) {
        throw new Error('Invalid article data');
    }

    return {
        id: row.article_id,
        author_id: row.author_id,
        title: row.title,
        content: row.content,
        created_at: row.created_at,
        updated_at: row.updated_at,
        author: {
            name: row.name,
            image: row.image,
        },
    };
}


