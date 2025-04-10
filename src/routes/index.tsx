import { createFileRoute } from '@tanstack/react-router'
import '../styles/App.css'
import App from '../components/home/App'

export const Route = createFileRoute('/')({
  component: App,
})
