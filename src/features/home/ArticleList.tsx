
import ArticleListItem from "./ArticleListItem";
import { getAllArticles } from "@/services/apiArticle";
import Loading from "@/ui/Loading";
import { useQuery } from "@tanstack/react-query";



function ArticleList() {
    const { data, isLoading } = useQuery({
        queryKey: ["articles-list"],
        queryFn: getAllArticles,

    })

    if (isLoading) {
        return <Loading></Loading>
    }

    // useEffect(() => {
    //     getAllArticles(); 
    // }, []); 




    return (<>
        <ul className="list bg-base-100 rounded-box shadow-md">
           {data && data.map((article) => (
                <ArticleListItem key={article.id} article={article}></ArticleListItem>
            ))}
            {/* <ArticleListItem></ArticleListItem>
            <ArticleListItem></ArticleListItem>
            <ArticleListItem></ArticleListItem>
            <ArticleListItem></ArticleListItem>
            <ArticleListItem></ArticleListItem>
            <ArticleListItem></ArticleListItem> */}

        </ul>

    </>);
}
export default ArticleList;
