// import { userAtom } from "@/atoms/user";
import { useUserProfile } from "@/hooks/useProfile";
import type { ArticleDisplay } from "@/types/Article";
// import { useAtom } from "jotai";

function CurrentUser({ article, children }: { article: ArticleDisplay, children: React.ReactNode }) {
    // const user = useAtomValue(userAtom)
    // const [user] = useAtom(userAtom)
    const {user} = useUserProfile()
    console.log(user)

    if (!user || user.id !== article.author_id) {
        return null
    }

    return children;
}



export default CurrentUser;
