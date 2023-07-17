import Button from '@/app/components/Button'
import Image from 'next/image'
import Link from 'next/link'

const PaymentSuccess = () => {
  return (
    <div className="container mx-auto mb-[160px] flex w-full max-w-[1280px] flex-1 flex-col flex-wrap items-center justify-center gap-5 px-5 pt-10">
      <div className="flex max-w-max flex-col items-center gap-6 px-5 py-3">
        <h1 className="container text-center text-[30px] font-semibold text-primaryDarker">
          Reserva Realizada com Sucesso!
        </h1>
        <Image
          src="/check-success.svg"
          alt="Reserva realizada com sucesso"
          width="95"
          height="95"
        />
        <Link className="w-full" href={'/'}>
          <Button
            className="mx-auto max-w-[200px] md:max-w-[290px] md:text-lg"
            variant="primary"
          >
            Voltar
          </Button>
        </Link>
      </div>
    </div>
  )
}
export default PaymentSuccess
