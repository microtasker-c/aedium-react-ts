import { createFileRoute } from '@tanstack/react-router'
// import RootLayout from '../../components/RootLayout'
import ArticleList from '@/features/home/ArticleList'


export const Route = createFileRoute('/_app/')({
  component: ArticleList,
})

