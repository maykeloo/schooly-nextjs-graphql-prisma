import { Context } from '../index'

interface CanUserMutatePostParams {
    userId: number,
    postId: string
    prisma: Context['prisma']
}

export const canUserMutatePost = async({ userId, postId, prisma }: CanUserMutatePostParams) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(!user) {
        return {
            userErrors: [
                {
                    message: "User not found."
                }
            ],
            post: null
        }
    }

    const post = await prisma.post.findUnique({
        where: {
            id: Number(postId)
        }
    })

    if(post?.authorId !== user.id) {
        return {
            userErrors: [
                {
                    message: "You cannot update not your own post."
                }
            ],
            post: null
        }
    }
} 