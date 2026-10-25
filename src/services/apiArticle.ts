import type { InsertArticle } from "../types/Article";
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


export async function getArticleById(articleId: number) {
    const { data, error } = await client
        .from(TABLE_NAME)
        .select('*')
        .eq('id', articleId)

    if (error) {
        throw error;
    }

    return data[0];
}