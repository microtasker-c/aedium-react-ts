import { HeartIcon } from "@phosphor-icons/react";


function ArticleListItem() {
    return (<>
        <li className="list-row h-40">
            <div><img className="size-30 rounded-box" alt="Tailwind CSS list item" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
            <div>
                {/* 标题 */}
                <div className="text-2xl sm:text-5xl font-bold font-serif">Dio Lupa</div>
                {/* 描述 */}
                <div className="text-sm sm:text-2xl font-semibold opacity-60">Remaining Reason</div>
            </div>
            <div className="lg:tooltip"  data-tip='like'>
                <button className="btn btn-square btn-secondary btn-sm btn-ghost">
                    <HeartIcon size={24} />
                </button>
            </div>
            {/* <button className="btn btn-square btn-ghost">
                <svg aria-label="Favorite" className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
            </button> */}
        </li>
    </>);
}
export default ArticleListItem;
