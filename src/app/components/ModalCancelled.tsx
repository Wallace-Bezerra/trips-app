import Button from './Button'
import { motion } from 'framer-motion'
import { fadeIn } from '@/animation/variants'
interface ModalCancelledProps {
  setIsOpenModalCancelled: (boolean: boolean) => void
  handleDeleteReservation: (id: string) => void
  reservationId: string
}
export const ModalCancelled = ({
  setIsOpenModalCancelled,
  handleDeleteReservation,
  reservationId,
}: ModalCancelledProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(event) => {
        if (event.currentTarget === event.target) {
          setIsOpenModalCancelled(false)
        }
      }}
      className="fixed left-0 top-0 z-20 flex min-h-screen w-full flex-col items-center  justify-center bg-gray-500 bg-opacity-30 px-5 backdrop-blur-sm"
    >
      <motion.div
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="flex flex-col rounded-xl border border-primary bg-white p-12  shadow-sm md:p-20"
      >
        <p className="text-center text-xl font-semibold">
          Deseja cancelar essa reserva?
        </p>
        <div className="flex gap-3">
          <Button
            className="mt-7"
            onClick={() => setIsOpenModalCancelled(false)}
            variant="primary"
          >
            Não
          </Button>
          <Button
            variant="canceled"
            onClick={() => handleDeleteReservation(reservationId)}
          >
            Sim
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
