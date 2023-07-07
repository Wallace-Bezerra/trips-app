import Image from 'next/image'

export const QuickSearch = () => {
  return (
    <div className="container mx-auto mt-5 w-full px-5">
      <h2
        className="flex w-full items-center gap-3 whitespace-nowrap text-[#717171] 
        before:block before:h-[1px] before:w-full before:max-w-[455px] before:bg-[#BBBFBF] before:content-['']
        after:block after:h-[1px] after:w-full after:max-w-[455px] after:bg-[#BBBFBF] after:content-['']
      "
      >
        Tente pesquisar por
      </h2>
      <ul className="mt-5 flex justify-between ">
        <li className="flex cursor-pointer flex-col items-center gap-[5px]">
          <Image src="/hotel-icon.png" width={25} height={25} alt="" />
          <p className="text-sm text-[#717171]">Hotéis</p>
        </li>
        <li className="flex cursor-pointer flex-col items-center gap-[5px]">
          <Image src="/farm-icon.png" width={25} height={25} alt="" />
          <p className="text-sm text-[#717171]">Fazenda</p>
        </li>
        <li className="flex cursor-pointer flex-col items-center gap-[5px]">
          <Image src="/cottage-icon.png" width={25} height={25} alt="" />
          <p className="text-sm text-[#717171]">Chalés</p>
        </li>
        <li className="flex cursor-pointer flex-col items-center gap-[5px]">
          <Image src="/inn-icon.png" width={25} height={25} alt="" />
          <p className="text-sm text-[#717171]">Pousada</p>
        </li>
      </ul>
    </div>
  )
}
