import { qrStyles } from '@/config/qrStyles'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'

interface Props {
  style: (typeof qrStyles)[number]
  setStyle: React.Dispatch<React.SetStateAction<(typeof qrStyles)[number]>>
}

const StylePicker = ({ style, setStyle }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'w-full capitalize',
          buttonVariants({ variant: 'outline' })
        )}
      >
        {style}
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        {qrStyles.map((text) => (
          <DropdownMenuItem
            onClick={() => setStyle(text)}
            key={text}
            className='capitalize font-medium'
          >
            {text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default StylePicker
