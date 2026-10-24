function Avatar({ avatarFile = '', username }: { avatarFile?: string, username: string }) {
    return (<>
        <div className={`avatar ${avatarFile ? '' : 'avatar-placeholder'}`}>
            <div className="ring-primary ring-offset-base-100 w-20 rounded-full ring-2 ring-offset-2">
                {avatarFile && <img alt="Tailwind-CSS-Avatar-component" src={avatarFile} />}
                {!avatarFile && <span className="text-xl">{username}</span>}
            </div>
        </div>

    </>);
}
export default Avatar;
