import { NextSeo } from 'next-seo'
import React, { useMemo } from 'react'
import Comment from 'src/components/ui/Comment'
import {
  CommentFragment,
  CommentsDocument,
  CommentsQuery,
  CommentsQueryVariables,
} from 'src/modules/gql/generated'
import { Page, PageProps } from 'src/pages/_App/interfaces'

type CommentPageProps = PageProps & {
  comment: CommentFragment | undefined
}

const CommentPage: Page<CommentPageProps> = ({ comment }) => {
  return useMemo(() => {
    if (!comment) {
      return null
    }

    return (
      <>
        <NextSeo
          title={
            (comment.raw_text && comment.raw_text.substr(0, 100)) ||
            'Комментарий'
          }
        />

        <Comment comment={comment} />
      </>
    )
  }, [comment])
}

CommentPage.getInitialProps = async ({ query, apolloClient }) => {
  let comment: CommentPageProps['comment']

  const url = query.url && typeof query.url === 'string' ? query.url : null

  const match = url && url.match(/comment-(\d+).html/)

  if (match) {
    const commentId = parseInt(match[1])

    if (commentId) {
      comment = (
        await apolloClient.query<CommentsQuery, CommentsQueryVariables>({
          query: CommentsDocument,
          variables: {
            take: 1,
            where: {
              id: {
                equals: commentId,
              },
            },
          },
        })
      ).data.comments[0]
    }
  }

  return {
    comment,
    statusCode: !comment ? 404 : undefined,
  }
}

export default CommentPage
