import { qrPrecisions } from '@/config/qrStyles'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'

interface Props {
  precision: (typeof qrPrecisions)[number]
  setPrecision: React.Dispatch<
    React.SetStateAction<(typeof qrPrecisions)[number]>
  >
}

const PrecisionPicker = ({ precision, setPrecision }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'w-full capitalize',
          buttonVariants({ variant: 'outline' })
        )}
      >
        {precision}
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        {qrPrecisions.map((item) => (
          <DropdownMenuItem
            onClick={() => setPrecision(item)}
            key={item}
            className='font-medium'
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PrecisionPicker
