'use client'
import { fadeIn } from '@/animation/variants'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export const QuickSearch = () => {
  return (
    <>
      <motion.div
        className="container mx-auto mt-5 w-full px-5"
        variants={fadeIn('left', 0.5)}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <h2
          className="flex w-full items-center justify-center gap-3 whitespace-nowrap text-[#717171] 
        before:block before:h-[1px] before:w-full before:max-w-[455px] before:bg-[#BBBFBF] before:content-['']
        after:block after:h-[1px] after:w-full after:max-w-[455px] after:bg-[#BBBFBF] after:content-['']
      "
        >
          Tente pesquisar por
        </h2>
        <ul className="mx-auto mb-2 mt-5 flex max-w-lg justify-between md:mt-7 ">
          <li className="flex cursor-pointer flex-col items-center gap-[5px]">
            <Link
              className="flex flex-col items-center gap-[5px] "
              href={`/trips/search?destination=Hotel&startDate=&budget=`}
            >
              <Image
                className="sm:w-8"
                src="/hotel-icon.png"
                width={25}
                height={25}
                alt="Hotel"
              />
              <p className="text-sm text-[#717171] md:text-base">Hotéis</p>
            </Link>
          </li>
          <li className="flex cursor-pointer flex-col items-center gap-[5px]">
            <Link
              className="flex flex-col items-center gap-[5px]"
              href={`/trips/search?destination=Fazenda&startDate=&budget=`}
            >
              <Image
                className="sm:w-8"
                src="/farm-icon.png"
                width={25}
                height={25}
                alt="Fazenda"
              />
              <p className="text-sm text-[#717171] md:text-base">Fazenda</p>
            </Link>
          </li>
          <li className="flex cursor-pointer flex-col items-center gap-[5px]">
            <Link
              className="flex flex-col items-center gap-[5px]"
              href={`/trips/search?destination=Chalé&startDate=&budget=`}
            >
              <Image
                className="sm:w-8"
                src="/cottage-icon.png"
                width={25}
                height={25}
                alt="Chalé"
              />
              <p className="text-sm text-[#717171] md:text-base">Chalés</p>
            </Link>
          </li>
          <li className="flex cursor-pointer flex-col items-center gap-[5px]">
            <Link
              className="flex flex-col items-center gap-[5px]"
              href={`/trips/search?destination=Pousada&startDate=&budget=`}
            >
              <Image
                className="sm:w-8"
                src="/inn-icon.png"
                width={25}
                height={25}
                alt="Pousada"
              />
              <p className="text-sm text-[#717171] md:text-base">Pousada</p>
            </Link>
          </li>
        </ul>
      </motion.div>
    </>
  )
}
