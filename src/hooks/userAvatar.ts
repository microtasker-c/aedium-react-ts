import { useState } from "react"
import type { User } from "@/types/User"
import { useMutation } from "@tanstack/react-query"
import { supabase } from "@/utils/supabase"
import { toast } from "sonner"

export function useUploadAvatar(currentAvatarFile: File | null) {
    const {mutateAsync: uploadAvatar, isPending: isUploading} = useMutation({
        mutationFn: async () => {
            if (!currentAvatarFile) {
                throw new Error('No avatar file selected')
            }

            const { data, error } = await supabase.storage
                .from('aedium-images')
                .upload(`${Date.now()}-${currentAvatarFile.name}`, currentAvatarFile)


            if (error) {
                // Handle error
                throw new Error('Failed to upload avatar')
            }


            return data
        },


        onSuccess: () => {
            // Handle success
            toast.success('Avatar uploaded successfully')

        },
        onError: (error) => {
            // Handle error
            toast.error(error.message)
        },
    })

    return {
        uploadAvatar,
        isUploading,
    }
}


export function useChangeAvatar(user: User) {


    const [avatarFile, setAvatarFile] = useState(user?.image || '')

    const [currentAvatarFile, setCurrentAvatar] = useState<File | null>(null)

    function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
        const avatarFile = event.target.files![0];

        const fileUrl = URL.createObjectURL(avatarFile);
        setAvatarFile(fileUrl);
        setCurrentAvatar(avatarFile);
    }

    return {
        avatarFile,
        setAvatarFile,
        currentAvatarFile,
        setCurrentAvatar,
        handleAvatarChange,
    }
}