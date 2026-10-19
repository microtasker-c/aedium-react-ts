function EmailVerifyForm() {
    return (<>
        <form className="flex items-center justify-center min-h-screen">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <h2 className="text-center text-4xl mb-4">Email Verification</h2>


                <label className="label">Verification Code</label>
                <input type="text" inputMode="numeric" className="input" placeholder="Your Code" maxLength={6}/>

                <button className="btn btn-secondary mt-4">Login</button>
                <button className="btn btn-soft btn-secondary mt-4">Resend Verify Email</button>
            </fieldset>
        </form>
    </>);
}
export default EmailVerifyForm;
