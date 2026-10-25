import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { getUserProfile } from "@/utils/userHelper"
import { authClient } from "@/utils/neon"
import { toast } from "sonner"
import type { User } from "@/types/User"
import { useUploadAvatar } from "./userAvatar"



const VITE_SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL

export function useUserProfile() {


    const { data: user, isLoading } = useQuery({
        queryKey: ['user-profile'],
        queryFn: async () => {
            const user = await getUserProfile()
            if (!user) throw new Error('user is undefined')
            return user

        },

    })



    return {
        user,
        isLoading
    }
}


export function useUserUpdate(user: User, currentAvatarFile: File | null,) {
    const [name, setName] = useState(user?.name || '')

    const queryClient = useQueryClient()

    const { uploadAvatar, isUploading } = useUploadAvatar(currentAvatarFile)

    const { isPending: isUpdating, mutate: handlerUpdate } = useMutation({
        mutationFn: async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()


            let newName = name.trim()
            let newAvatarURL = ''

            if (!name.trim().length) {
                throw new Error('content is not allowed')
            }

            if (name.trim() !== user.name) {
                newName = name.trim()
            }

            if (!newName && currentAvatarFile) {
                throw new Error('nothing to update')
            }

            if (currentAvatarFile) {
                const uploadedAvatar = await uploadAvatar();
                // console.log(uploadedAvatar);
                newAvatarURL = `${VITE_SUPABASE_PROJECT_URL}/storage/v1/object/public/${uploadedAvatar.fullPath}`

            }

            const { data, error } = await authClient.updateUser({
                ...(newName && { name: newName }),
                ...(newAvatarURL && { image: newAvatarURL }),
            });
            if (error) throw error;

            return data
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user-profile']
            })

            toast.success('updated successfully!')
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })

    return {
        name,
        setName,
        isUpdating,
        handlerUpdate,
        isUploading
    }
}