import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { getUserProfile } from "../utils/userHelper"
import { authClient } from "../auth"
import { toast } from "sonner"

export function useUserProfile() {
    const [name, setName] = useState('')

    const queryClient = useQueryClient()

    const { data: user, isLoading } = useQuery({
        queryKey: ['user-profile'],
        queryFn: async () => {
            const user = await getUserProfile()
            if (!user) throw new Error('user is undefined')
            setName(user.name)
            return user

        },

    })

    const { isPending: isUpdating, mutate: handlerUpdate } = useMutation({
        mutationFn: async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()

            if (!name.trim().length) {
                throw new Error('content is not allowed')
            }
            const { data, error } = await authClient.updateUser({
                name
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
        user,
        name,
        setName,
        isLoading,
        isUpdating,
        handlerUpdate
    }
}