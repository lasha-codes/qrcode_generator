import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'

interface Props {
  setLogo: React.Dispatch<React.SetStateAction<string>>
}

const LogoUploader = ({ setLogo }: Props) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setLogo(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className='flex flex-col items-start gap-2 my-2.5'>
      <label
        htmlFor='logo'
        className={cn(buttonVariants({ variant: 'outline' }))}
      >
        Upload Logo
      </label>
      <input
        id='logo'
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        className='text-sm invisible opacity-0 absolute -z-10 pointer-events-none'
      />
    </div>
  )
}

export default LogoUploader
