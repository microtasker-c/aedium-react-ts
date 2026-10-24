import { toast } from "sonner";
import { authClient } from "../utils/neon";
import { getUserProfile } from "./userHelper";
import type {UseNavigateResult} from '@tanstack/react-router'

export async function sendVerifycationEmail() {

    try {
        const user = await getUserProfile()
        if (!user) throw new Error('User not found')
        const { error } = await authClient.sendVerificationEmail({
            email: user?.email,
            callbackURL: window.location.origin + '/',
        });

        if (error) throw error;

        toast.success('Verification Email Sent')

    } catch (error) {
        toast.error('Error sending')
    }

}

export async function verifyEmailCode(code: string, navigate: UseNavigateResult<string>) {
    try {
        const user = await getUserProfile()
        if (!user) throw new Error('User not found')
        const { data, error } = await authClient.emailOtp.verifyEmail({
            email: user?.email,
            otp: code,
        });
        if (error) throw error;
        // Check if auto-sign-in is enabled (default behavior)
        toast.success('Email verified successfully!')
        if (data?.user) {
            navigate({
                to: '/'
            })
        } else {
            navigate({
                to: '/auth/$pathname',
                params:{
                    pathname: 'sign-in'
                }
            })
        }
    } catch (error) {
        console.log(error);
        toast.error('Error')
        
    }
}