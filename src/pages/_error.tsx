import type { ErrorProps } from 'next/error'

function Error({ statusCode, title }: ErrorProps) {
  return (
    <div>
      <h1>{statusCode}</h1>
      <p>{title}</p>
    </div>
  )
}

Error.getInitialProps = ({ err }: { err: Error }): ErrorProps => {
  if (err) {
    switch (err.message) {
      case '400':
        return { statusCode: 400, title: 'Invalid Params' }
      case '404':
        return { statusCode: 404, title: 'Not Found' }
    }
  }
  return { statusCode: 500, title: 'Internal Server Error' }
}

export default Error
