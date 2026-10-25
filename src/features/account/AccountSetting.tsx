import { useUserProfile } from "../../hooks/useProfile";
import AccountSettingForm from "./AccountSettingForm";



function AccountSetting() {
    const { user, isLoading, } = useUserProfile()


    return (<>

        <form className="flex items-center justify-center min-h-screen">
            {
                !user || isLoading ?
                    (<div className="skeleton h-32 w-xs"></div>)
                    :
                    (<AccountSettingForm user={user}></AccountSettingForm>)
            }
        </form>

    </>);
}
export default AccountSetting;
