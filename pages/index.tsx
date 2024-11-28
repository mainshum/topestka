import type { NextPage, GetStaticProps, GetServerSideProps } from 'next'
import type { Course, Lesson, Video } from "@prisma/client"
import { prisma } from 'utils/prisma'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import Heading from 'components/Heading'
import CourseGrid from 'components/CourseGrid'

const Home: NextPage = () => {
  return (
    <main className='flex justify-center items-center flex-col w-full h-[calc(100vh-80px)]'>
      <h3>2 akademickie godziny o komunikacji medycznej</h3>
      <h1>MRKH to pestka!</h1>
      <h2>dowiedz się w jaki sposób przekazywać <br/> informacje o zespole MRKH</h2>
      <section className='flex space-x-3 pt-8'>
        <button className='btn btn-primary'>Kup kurs</button>
        <button className='btn btn-secondary'>Poznaj program</button>
      </section>
    </main>
  )
}

export default Home
