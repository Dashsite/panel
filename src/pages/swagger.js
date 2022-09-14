import dynamic from 'next/dynamic'
import 'swagger-ui-react/swagger-ui.css'

const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false })

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
function ApiDoc() {
    return <SwaggerUI url='/api/swagger' />
}

ApiDoc.getLayout = page => page
ApiDoc.blank = true

export default ApiDoc
