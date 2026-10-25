
import ArticleListItem from "./ArticleListItem";
import { getAllArticles } from "@/services/apiArticle";
import Loading from "@/ui/Loading";
import { useQuery } from "@tanstack/react-query";




function ArticleList() {
    const { data, isLoading , isError, error} = useQuery({
        queryKey: ["articles-list"],
        queryFn: getAllArticles,

    })

    // const [user, setUser] = useAtom(userAtom)
    // console.log(user);
    

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <main className="flex items-center justify-center content-layout-h">
            <div className="text-error">{error.message || 'Failed to load articles'}</div>
        </main>
    }

    // useEffect(() => {
    //     getAllArticles(); 
    // }, []); 




    return (<div className="flex justify-center mt-4">
        <ul className="list bg-base-100 rounded-box shadow-md w-7xl">
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

    </div>);
}
export default ArticleList;
