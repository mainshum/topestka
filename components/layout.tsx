import Footer from './Footer'
import Nav from './Nav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      {/* <main className='mx-auto max-w-full md:max-w-6xl min-h-screen px-5'>
      </main> */}
      {/* <Footer /> */}
    </>
  )
}
